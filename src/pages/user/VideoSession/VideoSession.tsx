import { useCallback, useEffect, useState } from "react";

import VideoCallChat from "./VideoCallChat"
import VideoChatArea from "./VideoChatArea"
import { useSocket } from "../../../context/SocketProvider";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import peer from '../../../services/peer.ts'
import { useLocation } from "react-router-dom";



export default function VideoSession() {
  const socket = useSocket()
  const {userData} =useSelector((state:RootState)=>state.user)
  const [isMobile, setIsMobile] = useState(true);
  const [chating, setChating] = useState(false);
 
  const [localStream, setLocalStream] = useState<MediaStream|null>(null)
  const [remoteStream, setRemoteStream] = useState<MediaStream|null>(null)
  const location = useLocation();
  const data = location.state;
  const {remoteUserId,audioEnabled, videoEnabled}=data
 
  console.log(audioEnabled, videoEnabled);
  
  const [enableVideo, setEnableVideo] = useState<boolean>(videoEnabled)
    const [enableAudio, setEnableAudio] = useState<boolean>(audioEnabled)

    const toggleAudio =()=>{
        setEnableAudio(prev=>!prev)
    }

    const toggleVideo =()=>{
        setEnableVideo(prev=>!prev)
    }



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
    const ans = await peer.getAnswer(offer)
    socket?.emit('peer:nego-done',{to:from,ans})

  },[socket])
  
  const handlePeerNegoFinal= useCallback(async({ans}:{ans:RTCSessionDescriptionInit})=>{
    await peer.setRemoteDescription(ans)
  },[])




  useEffect(()=>{
   
    const getLocalStream=async()=>{
      const stream = await navigator.mediaDevices.getUserMedia({
        audio:enableAudio,
        video:enableVideo
      })
      setLocalStream(stream)
      for (const track of stream.getTracks()) {
        peer.peer.addTrack(track, stream);
      }
      return stream
    }
    getLocalStream()
    

  },[enableAudio, enableVideo])

 



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
    socket?.on('peer:nego-needed',handlePeerNegoNeeded)
    socket?.on('peer:nego-final',handlePeerNegoFinal)

    return ()=>{
    socket?.off('peer:nego-needed',handlePeerNegoNeeded)
    socket?.off('peer:nego-final',handlePeerNegoFinal)
   
    }
  },[handlePeerNegoFinal, handlePeerNegoNeeded, socket])




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
        isMobile?(
          chating?(
            <div className="w-96 border-l dark:border-l-[#091220]">
              <VideoCallChat />
            </div>
          )
          :(
            <div className="flex-1">
              <VideoChatArea {...{localStream,toggleVideo,toggleAudio,enableAudio,enableVideo,remoteStream}} />
            </div>
          )
        )
        :(
          <>
          <div className="flex-1">
            <VideoChatArea {...{localStream,toggleVideo,toggleAudio,enableAudio,enableVideo,remoteStream}} />
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

