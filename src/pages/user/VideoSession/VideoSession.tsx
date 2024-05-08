import { useCallback, useEffect, useState } from "react";

import VideoCallChat from "./VideoCallChat"
import VideoChatArea from "./VideoChatArea"
import { useSocket } from "../../../context/SocketProvider";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import peer from '../../../services/peer.ts'
import Button from "../../../components/ui/Button/Button.tsx";



export default function VideoSession() {
  const socket = useSocket()
  const {userData} =useSelector((state:RootState)=>state.user)
  const [isMobile, setIsMobile] = useState(true);
  const [chating, setChating] = useState(false);
  const [remoteUserId, setRemoteUserId] = useState<string|null>(null)
  const [localStream, setLocalStream] = useState<MediaStream|null>(null)
  const [remoteStream, setRemoteStream] = useState<MediaStream|null>(null)

  const handleCallUser = useCallback(async({remoteUserId}:{remoteUserId:string})=>{
    const stream = await navigator.mediaDevices.getUserMedia({
      audio:true,
      video:true
    })
    setLocalStream(stream)
    const offer = await peer.getOffer()
  
    socket?.emit('session:call-user',{from:userData?.id ,to:remoteUserId, offer})
  
  },[socket, userData?.id])

  const handleIncommingCall=useCallback(async({from,offer}:{from:string,offer:RTCSessionDescriptionInit})=>{
    console.log('incomming:call');
    
    setRemoteUserId(from)
    const stream = await navigator.mediaDevices.getUserMedia({
      audio:true,
      video:true
    })
    setLocalStream(stream)
    const ans = await peer.getAnswer(offer)
    
    socket?.emit('call:accepted',{ans,to:from, from:userData?.id})
  },[socket, userData?.id])


  const handleUserJoin= useCallback(({userId}:{userId:string})=>{
    setRemoteUserId(userId)
    handleCallUser({remoteUserId:userId})
    
  },[handleCallUser])


  // const sendStreams = useCallback(()=>{
  //   for(const track of localStream?.getTracks() || []){
  //     peer.addTrack(track)
  //   }
  // },[localStream])

  const sendStreams = useCallback(() => {
    if(!localStream){
      alert('localStream is null')
      return 
    }
    for (const track of localStream.getTracks()) {
      peer.peer.addTrack(track, localStream);
    }
  }, [localStream]);


  const handleCallAccepted= useCallback(({from,ans}:{from:string,ans:RTCSessionDescriptionInit})=>{
    peer.setRemoteDescription(ans)
    console.log('call accepted',ans);
    sendStreams()
    
  },[sendStreams])

  const handleNegoNeeded =  useCallback(async()=>{
    const offer = await peer.getOffer();
    socket?.emit('peer:nego-needed',{offer, to:remoteUserId, from:userData?.id})
  },[remoteUserId, socket, userData?.id])


  //SETTING REMOTE STREAM
  const handleAddTrack = useCallback((ev:RTCTrackEvent)=>{
    
    const remoteStream = ev.streams;
   
    setRemoteStream(remoteStream[0]);
  },[])

  const handlePeerNegoNeeded=useCallback(async ({from,offer}:{from:string,offer:RTCSessionDescriptionInit})=>{
    console.log('negotiation needed........');
    
    const ans = await peer.getAnswer(offer)
    socket?.emit('peer:nego-done',{to:from,ans})

  },[socket])
  
  const handlePeerNegoFinal= useCallback(async({ans}:{ans:RTCSessionDescriptionInit})=>{
    console.log('peer negotiation done',ans);
    
    await peer.setRemoteDescription(ans)
  },[])


  useEffect(()=>{
    peer.peer.addEventListener('negotiationneeded',handleNegoNeeded)

    return ()=>{
    peer.peer.removeEventListener('negotiationneeded',handleNegoNeeded)

    }
  },[handleNegoNeeded])


  useEffect(()=>{
    peer.peer.addEventListener('track',handleAddTrack)

    return ()=>{
      peer.peer.removeEventListener('track',handleAddTrack)
    }
  },[handleAddTrack])

  useEffect(()=>{
    socket?.on('session:user-joined',handleUserJoin)
    socket?.on('incomming:call',handleIncommingCall)
    socket?.on('call:accepted', handleCallAccepted)
    socket?.on('peer:nego-needed',handlePeerNegoNeeded)
    socket?.on('peer:nego-final',handlePeerNegoFinal)

    return ()=>{
    socket?.off('session:user-joined',handleUserJoin)
    socket?.off('incomming:call',handleIncommingCall)
    socket?.off('call:accepted', handleCallAccepted)
    socket?.off('peer:nego-needed',handlePeerNegoNeeded)
    socket?.off('peer:nego-final',handlePeerNegoFinal)

    }
  },[handleCallAccepted, handleIncommingCall, handlePeerNegoFinal, handlePeerNegoNeeded, handleUserJoin, socket])

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
      <Button onClick={sendStreams}>sendStreen</Button>

      {
        isMobile?(
          chating?(
            <div className="w-96 border-l dark:border-l-[#091220]">
              <VideoCallChat />
            </div>
          )
          :(
            <div className="flex-1">
              <VideoChatArea {...{localStream,remoteStream}} />
            </div>
          )
        )
        :(
          <>
          <div className="flex-1">
            <VideoChatArea {...{localStream,remoteStream}} />
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

