import { useCallback, useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

import VideoCallChat from "./VideoCallChat"
import VideoChatArea from "./VideoChatArea"
import { useSocket } from "../../../context/SocketProvider";
import { RootState } from "../../../redux/store";
import peer from '../../../services/peer.ts'




export default function VideoSession() {
  const socket = useSocket()
  const { userData } = useSelector((state: RootState) => state.user)
  const [isMobile, setIsMobile] = useState(true);
  const chating = false;

  const [localStream, setLocalStream] = useState<MediaStream | null>(null)
  const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null)
  const location = useLocation();
  const { remoteUserId: remoteUserIdFromLink, audioEnabled: audio, videoEnabled: video, type } = location.state;

  const [remoteUserId, setRemoteUserId] = useState(remoteUserIdFromLink)
  
  const role  = useRef(type)


  useEffect(()=>{
    const getLocalStream = async()=>{
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: audio,
        video: video
      })
      setLocalStream(stream)
      return stream
    }
    
    const stream = getLocalStream()

    return ()=>{
      stream.then(s=>{
        s.getTracks().forEach(track=>{
          track.stop()
        })
      })

     
    }
  },[audio, video])

  

  

  const handleCallUser = useCallback(async ({ remoteUserId }: { remoteUserId: string }) => {

  
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: audio,
      video: video
    })
    setLocalStream(stream)

    const offer = await peer.getOffer()

    socket?.emit('session:call-user', { from: userData?.id, to: remoteUserId, offer })


  }, [audio, socket, userData?.id, video])


  const handleUserJoin = useCallback(({ userId }: { userId: string }) => {


    handleCallUser({ remoteUserId: userId })

  }, [handleCallUser])

  useEffect(() => {
    if (type == 'host') {
      
      handleUserJoin({ userId: remoteUserId })
    }
  }, [handleUserJoin, remoteUserId, type])



  const handleNegoNeeded = useCallback(async () => {
    if(role.current=='host'){
      role.current= 'client'
      return
    } 
   
    const offer = await peer.getOffer();
    socket?.emit('peer:nego-needed', { offer, to: remoteUserId, from: userData?.id })
  }, [remoteUserId, socket, userData?.id])


  //SETTING REMOTE STREAM
  const handleAddTrack = useCallback((ev: RTCTrackEvent) => {
    const remoteStream = ev.streams;
    setRemoteStream(remoteStream[0]);
  }, [])

  const handlePeerNegoNeeded = useCallback(async ({ from, offer }: { from: string, offer: RTCSessionDescriptionInit }) => {
 
    const ans = await peer.getAnswer(offer)
    socket?.emit('peer:nego-done', { to: from, ans })
  }, [socket])

  const handlePeerNegoFinal = useCallback(async ({ ans }: { ans: RTCSessionDescriptionInit }) => {

    await peer.setRemoteDescription(ans)
  }, [])



  const sendStreams = useCallback(async () => {
    let stream = null
    if (localStream) {
      stream = localStream
    } else {
      stream = await navigator.mediaDevices.getUserMedia({ video, audio })
      setLocalStream(stream)
    }

    for (const track of stream.getTracks()) {
      peer.addTrack(track, stream);
    }

    setLocalStream(stream)

  }, [audio, localStream, video]);



  const handleIncommingCall = useCallback(async ({ from, offer }: { from: string, offer: RTCSessionDescriptionInit }) => {

    const ans = await peer.getAnswer(offer)

    setRemoteUserId(from)
    socket?.emit('call:accepted', { ans, to: remoteUserId, from: userData?.id })
    sendStreams();

  }, [remoteUserId, sendStreams, socket, userData?.id])

  const handleCallAccepted = useCallback(async ({ ans }: { ans: RTCSessionDescriptionInit }) => {

    peer.setRemoteDescription(ans)
    sendStreams()
  }, [sendStreams])

 

  useEffect(() => {
    peer.getPeerConnection()?.addEventListener('negotiationneeded', handleNegoNeeded)
    peer.getPeerConnection()?.addEventListener('track', handleAddTrack)
    return () => {
      peer.getPeerConnection()?.removeEventListener('negotiationneeded', handleNegoNeeded)
      peer.getPeerConnection()?.removeEventListener('track', handleAddTrack)
    }
  }, [handleAddTrack, handleNegoNeeded])




  useEffect(() => {

    socket?.on('incomming:call', handleIncommingCall)
    socket?.on('call:accepted', handleCallAccepted)
    socket?.on('peer:nego-needed', handlePeerNegoNeeded)
    socket?.on('peer:nego-final', handlePeerNegoFinal)

    return () => {

      socket?.off('incomming:call', handleIncommingCall)
      socket?.off('call:accepted', handleCallAccepted)
      socket?.off('peer:nego-needed', handlePeerNegoNeeded)
      socket?.off('peer:nego-final', handlePeerNegoFinal)

    }
  }, [handleCallAccepted, handleIncommingCall, handlePeerNegoFinal, handlePeerNegoNeeded, socket])




  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setIsMobile(width <= 768); // Adjust breakpoint as needed
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);



  return (

    <div className="flex">

      {
        isMobile ? (
          chating ? (
            <div className="w-96 border-l dark:border-l-[#091220]">
              <VideoCallChat />
            </div>
          )
            : (
              <div className="flex-1">
                <VideoChatArea {...{ localStream, remoteStream }} />
              </div>
            )
        )
          : (
            <>
              <div className="flex-1">
                <VideoChatArea {...{ localStream, remoteStream }} />
              </div>

              <div className="w-96 border-l dark:border-l-[#091220]">
                <VideoCallChat />
              </div>
            </>
          )
      }



    </div>

  )

}

