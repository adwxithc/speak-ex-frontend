import { useCallback, useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import { RootState } from "../../../redux/store";
import { useSocket } from "../../../context/SocketProvider";
import peerService from '../../../webRTC/peer'
import VideoSession from "./VideoSession";
import { useGetUserByIdQuery } from "../../../redux/features/user/user/profileApiSlice";
import useLiveChat from "./LiveChat/useLiveChat";
import endPeerConnectionHandler from "../../../webRTC/endPeerConnectionHandler";
import { setWallet } from "../../../redux/features/user/user/userSlice";





function VideoSessionLogic() {

    const socket = useSocket()
    const { userData, wallet } = useSelector((state: RootState) => state.user)
    const [localStream, setLocalStream] = useState<MediaStream | null>(null)
    const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null)


    const location = useLocation();
    const { remoteUserId: remoteUserIdFromLink, audioEnabled: audio, videoEnabled: video, type, startTime, isMonetized } = location.state;
    const [remoteUserId, setRemoteUserId] = useState(remoteUserIdFromLink)


    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { sessionId = '' } = useParams()


    const role = useRef(type)
    const { data } = useGetUserByIdQuery({ userId: remoteUserId })


    //HANDLE VOLATILE CHAT DURING VIDEO SESSION
    const { handleSendMessage, messages } = useLiveChat(data?.data);

    useEffect(() => {
        const getLocalStream = async () => {
            const stream = await navigator.mediaDevices.getUserMedia({
                audio: audio,
                video: video
            })
            
            setLocalStream(stream)
            const remoteStream = new MediaStream()
            setRemoteStream(remoteStream)
            for (const track of stream.getTracks()) {
                peerService.addTrack(track, stream);
            }
        }
        getLocalStream()
    }, [audio, video])
    const handleCallUser = useCallback(async ({ remoteUserId }: { remoteUserId: string }) => {
    
        const offer = await peerService.getOffer()

        socket?.emit('session:call-user', { from: userData?.id, to: remoteUserId, offer })

    }, [socket, userData?.id])

    const handleUserJoin = useCallback(({ userId }: { userId: string }) => {
        handleCallUser({ remoteUserId: userId })
    }, [handleCallUser])

    const handleNegoNeeded = useCallback(async () => {
        if (role.current == 'host') {
            handleCallUser({remoteUserId})
        }

    }, [handleCallUser, remoteUserId])

    //SETTING REMOTE STREAM
    const handleAddTrack = useCallback((ev: RTCTrackEvent) => {
        const remoteStream = ev.streams;

        setRemoteStream(remoteStream[0]);
    }, [])

    const handleWindowUnload = useCallback(() => {
        socket?.emit('session:terminate', { sessionCode: sessionId, endingTime: new Date() })
    }, [sessionId, socket])

    const handlePeerDisconnect = useCallback(() => {
        const pc = peerService.getPeerConnection();
        if (!pc) return
        const connectionState = pc.iceConnectionState;
        if (connectionState === 'disconnected' || connectionState === 'failed') {
            socket?.emit('session:terminate', { sessionCode: sessionId, endingTime: new Date() })

        }
    }, [sessionId, socket])




    const handleTermination = useCallback(({ coinExchange }: { coinExchange: number }) => {

        endPeerConnectionHandler({ localStream, peerService: peerService, remoteStream })
        if (type == 'host') {

            if (isMonetized) {
                dispatch(setWallet({ money: (wallet?.money || 0) + coinExchange }))
                navigate('/session-over', { state: { coinExchange } })
            } else {
                dispatch(setWallet({ silverCoins: (wallet?.silverCoins || 0) + coinExchange }))
                navigate('/session-over', { state: { coinExchange } })
            }

        } else {
            if (isMonetized) {
                navigate(`/session-feedback/${sessionId}`, { state: { coinExchange } })
                dispatch(setWallet({ goldCoins: (wallet?.goldCoins || 0) - coinExchange }))
            } else {
                navigate(`/session-feedback/${sessionId}`, { state: { coinExchange } })
                dispatch(setWallet({ silverCoins: (wallet?.silverCoins || 0) - coinExchange }))
            }

        }
    }, [dispatch, isMonetized, localStream, navigate, remoteStream, sessionId, type, wallet])


    // const sendStreams = useCallback(async () => {
    //     let stream = null
    //     if (localStream) {
    //         stream = localStream
    //     } else {
    //         stream = await navigator.mediaDevices.getUserMedia({ video, audio })
    //         setLocalStream(stream)
    //     }


    //     for (const track of stream.getTracks()) {
    //         peerService.addTrack(track, stream);
    //     }

    //     setLocalStream(stream)

    // }, [audio, localStream, video]);


    const handleIncommingCall = useCallback(async ({ from, offer }: { from: string, offer: RTCSessionDescriptionInit }) => {



        const ans = await peerService.getAnswer(offer)

        setRemoteUserId(from)
        socket?.emit('call:accepted', { ans, to: from, from: userData?.id })
        // sendStreams();


    }, [ socket, userData?.id])

    const handleCallAccepted = useCallback(async ({ ans }: { ans: RTCSessionDescriptionInit }) => {


        peerService.setRemoteDescription(ans)
        // sendStreams()

    }, [])


    useEffect(() => {
        if (type == 'host') {

            handleUserJoin({ userId: remoteUserId })
        }
    }, [handleUserJoin, remoteUserId, type])



    useEffect(() => {
        const pc = peerService.getPeerConnection();
        if (pc) {
            pc.addEventListener('iceconnectionstatechange', handlePeerDisconnect);
        }

        return () => {
            if (pc) {
                pc.removeEventListener('iceconnectionstatechange', handlePeerDisconnect);
            }
        };
    }, [handlePeerDisconnect]);

    const handleIceCandidate = useCallback((event: RTCPeerConnectionIceEvent) => {
        if (event.candidate && remoteUserId) {
         
            socket?.emit('peer:ice-candidate', { candidate: event.candidate, to: remoteUserId, from: userData?.id });

        }
    }, [remoteUserId, socket, userData?.id])

    const handleIncommingIceC = useCallback(({ candidate, from }: { candidate: RTCIceCandidate, from: string }) => {
      


        const pc = peerService.getPeerConnection();
        if (pc) {
            pc.addIceCandidate(new RTCIceCandidate(candidate))
                .then(() => {
                  
                    setRemoteUserId(from)
                })
                .catch(error => {
                    console.error("Error adding received ICE candidate", error);
                });
        }


    }, [])
    useEffect(() => {
        peerService.getPeerConnection()?.addEventListener('negotiationneeded', handleNegoNeeded)
        peerService.getPeerConnection()?.addEventListener('track', handleAddTrack)
        peerService.getPeerConnection()?.addEventListener('icecandidate', handleIceCandidate)

        window.addEventListener('unload', handleWindowUnload)


        return () => {
            peerService.getPeerConnection()?.removeEventListener('negotiationneeded', handleNegoNeeded)
            peerService.getPeerConnection()?.removeEventListener('track', handleAddTrack)
            peerService.getPeerConnection()?.removeEventListener('icecandidate', handleIceCandidate)

            window.removeEventListener('unload', handleWindowUnload)

        }
    }, [handleAddTrack, handleIceCandidate, handleNegoNeeded, handleWindowUnload])


    useEffect(() => {

        socket?.on('incomming:call', handleIncommingCall)
        socket?.on('call:accepted', handleCallAccepted)
        // socket?.on('peer:nego-needed', handlePeerNegoNeeded)
        // socket?.on('peer:nego-final', handlePeerNegoFinal)
        socket?.on('session:terminate', handleTermination)
        socket?.on('peer:ice-candidate', handleIncommingIceC)


        return () => {

            socket?.off('incomming:call', handleIncommingCall)
            socket?.off('call:accepted', handleCallAccepted)
            // socket?.off('peer:nego-needed', handlePeerNegoNeeded)
            // socket?.off('peer:nego-final', handlePeerNegoFinal)
            socket?.off('session:terminate', handleTermination)
            socket?.off('peer:ice-candidate', handleIncommingIceC)


        }
    }, [handleCallAccepted, handleIceCandidate, handleIncommingCall, handleIncommingIceC, handleTermination, socket])


    return (
        <VideoSession {...{ localStream, remoteStream, remoteUser: data?.data, messages, handleSendMessage, startTime: new Date(startTime).getTime() }} />
    )
}
export default VideoSessionLogic
