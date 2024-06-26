import { useCallback, useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import { RootState } from "../../../redux/store";
import { useSocket } from "../../../context/SocketProvider";
import VideoSession from "./VideoSession";
import { useGetUserByIdQuery } from "../../../redux/features/user/user/profileApiSlice";
import useLiveChat from "./LiveChat/useLiveChat";
import { setSession } from "../../../redux/features/user/session/sessionSlice";
import getPeerConnection, { resetPeerConnection } from "../../../webRTC/peer";
import endPeerConnectionHandler from "../../../webRTC/endPeerConnectionHandler";
import { setWallet } from "../../../redux/features/user/user/userSlice";




function VideoSessionLogic() {

    const socket = useSocket()
    const { userData, wallet } = useSelector((state: RootState) => state.user)

    const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null)
    const [negoneeded, setNegoneeded] = useState(false)
    const [clientReady, setClientReady] = useState(false)

    const location = useLocation();
    const { remoteUserId, type, startTime, isMonetized } = location.state;
    const sendedPendingAns = useRef(false)


    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { sessionId = '' } = useParams()

    const { data } = useGetUserByIdQuery({ userId: remoteUserId })


    //HANDLE VOLATILE CHAT DURING VIDEO SESSION
    const { handleSendMessage, messages } = useLiveChat(data?.data);

   


    const handleCallUser = useCallback(async ({ remoteUserId }: { remoteUserId: string }) => {
        const peerConnection = getPeerConnection()

        if (!peerConnection) return

        const offer = await peerConnection.getOffer()

        socket?.emit('session:call-user', { from: userData?.id, to: remoteUserId, offer })

    }, [socket, userData?.id])


    const handleNegoNeeded = useCallback(async () => {

        setNegoneeded(true)
    }, [])

   
    useEffect(() => {
        if (type == 'learner' && clientReady && !sendedPendingAns.current) {
            const ans = getPeerConnection().getPeerConnection()?.localDescription
            socket?.emit('call:accepted', { ans, to: remoteUserId, from: userData?.id })
            sendedPendingAns.current = true
        }
    }, [clientReady, remoteUserId, socket, type, userData?.id])

    useEffect(() => {
        if (negoneeded && clientReady) {
            handleCallUser({ remoteUserId })
            setNegoneeded(false)
        }
    }, [clientReady, dispatch, handleCallUser, negoneeded, remoteUserId])

    useEffect(() => {

        socket?.emit('session:client-ready', { sessionCode: sessionId, role: type, to: remoteUserId })

    }, [dispatch, remoteUserId, sessionId, socket, type])

    const handleClientReady = useCallback(() => {

        setClientReady(true)
    }, [])

    //SETTING REMOTE STREAM
    const handleAddTrack = useCallback((ev: RTCTrackEvent) => {
        const remoteStream = ev.streams;

        setRemoteStream(remoteStream[0]);
    }, [])

    const handleWindowUnload = useCallback(() => {
        socket?.emit('session:terminate', { sessionCode: sessionId, endingTime: new Date() })
    }, [sessionId, socket])

    const handlePeerDisconnect = useCallback(() => {
        const pc = getPeerConnection().getPeerConnection();
        if (!pc) return
        const connectionState = pc.iceConnectionState;
        if (connectionState === 'disconnected' || connectionState === 'failed') {
            socket?.emit('session:terminate', { sessionCode: sessionId, endingTime: new Date() })

        }
    }, [sessionId, socket])



    const handleTermination = useCallback(({ coinExchange }: { coinExchange: number }) => {
        const pc = getPeerConnection()
        endPeerConnectionHandler({ localStream: pc.getLocalStream(), peerService: pc, remoteStream })
        resetPeerConnection()
        if (type == 'helper') {

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
    }, [dispatch, isMonetized, navigate, remoteStream, sessionId, type, wallet])



    const handleIncommingCall = useCallback(async ({ from, offer }: { from: string, offer: RTCSessionDescriptionInit }) => {

        const peerConnection = getPeerConnection()

        if (!peerConnection) return
        const ans = await peerConnection.getAnswer(offer)

        dispatch(setSession({ remoteUserId: from }))
        socket?.emit('call:accepted', { ans, to: remoteUserId, from: userData?.id })

    }, [dispatch, remoteUserId, socket, userData?.id])

    const handleCallAccepted = useCallback(async ({ ans }: { ans: RTCSessionDescriptionInit }) => {
        console.log('handleCallAccepted');

        const peerConnection = getPeerConnection()

        if (!peerConnection) return


        peerConnection.setRemoteDescription(ans)

    }, [])



    const handleIceCandidate = useCallback((event: RTCPeerConnectionIceEvent) => {
        if (event.candidate && remoteUserId) {

            socket?.emit('peer:ice-candidate', { candidate: event.candidate, to: remoteUserId, from: userData?.id });

        }
    }, [remoteUserId, socket, userData?.id])

    const handleIncommingIceC = useCallback(async ({ candidate }: { candidate: RTCIceCandidate }) => {
        const peerConnection = getPeerConnection()

        if (!peerConnection) return
        const pc = peerConnection.getPeerConnection();
        if (pc) {
            await pc.addIceCandidate(new RTCIceCandidate(candidate))
        }

    }, [])


    useEffect(() => {
        const peerConnection = getPeerConnection()
        const pc = peerConnection.getPeerConnection()
        if (!pc) return
        pc.addEventListener('negotiationneeded', handleNegoNeeded)
        pc.addEventListener('track', handleAddTrack)
        pc.addEventListener('icecandidate', handleIceCandidate)
        pc.addEventListener('iceconnectionstatechange', handlePeerDisconnect);
        window.addEventListener('unload', handleWindowUnload)

        return () => {
            pc.removeEventListener('negotiationneeded', handleNegoNeeded)
            pc.removeEventListener('track', handleAddTrack)
            pc.removeEventListener('icecandidate', handleIceCandidate)
            pc.removeEventListener('iceconnectionstatechange', handlePeerDisconnect);
            window.removeEventListener('unload', handleWindowUnload)

        }
    }, [handleAddTrack, handleIceCandidate, handleNegoNeeded, handlePeerDisconnect, handleWindowUnload])


    useEffect(() => {

        socket?.on('incomming:call', handleIncommingCall)
        socket?.on('call:accepted', handleCallAccepted)
        socket?.on('session:client-ready', handleClientReady)
        socket?.on('session:terminate', handleTermination)
        socket?.on('peer:ice-candidate', handleIncommingIceC)
        return () => {

            socket?.off('incomming:call', handleIncommingCall)
            socket?.off('call:accepted', handleCallAccepted)
            socket?.off('session:client-ready', handleClientReady)
            socket?.off('session:terminate', handleTermination)
            socket?.off('peer:ice-candidate', handleIncommingIceC)
        }
    }, [handleCallAccepted, handleClientReady, handleIncommingCall, handleIncommingIceC, handleTermination, socket])


    return (
        <VideoSession {...{ remoteStream, remoteUser: data?.data, messages, handleSendMessage, startTime: new Date(startTime).getTime() }} />
    )
}
export default VideoSessionLogic
