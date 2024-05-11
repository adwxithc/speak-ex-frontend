import ReactPlayer from "react-player"
import Container from "../../../components/layout/Container/Container"
import Button from "../../../components/ui/Button/Button"
import { Mic, MicOff, Video, VideoOff } from "lucide-react"
import {  useCallback, useEffect, useState } from "react"
import { useSocket } from "../../../context/SocketProvider"
import { useSelector } from "react-redux"
import { RootState } from "../../../redux/store"
import peer from '../../../services/peer'
import { useNavigate, useParams } from "react-router-dom"


function WaitForLearner() {
    const {userData} =useSelector((state:RootState)=>state.user)

    const [localStream, setLocalStream] =  useState<MediaStream|null>(null)
    const [videoEnabled, setVideoEnabled] = useState(true);
    const [audioEnabled, setAudioEnabled] = useState(true);
    const [remoteUserId , setRemoteUserId] = useState('')
    const {sessionId=''} = useParams()
    const navigate = useNavigate()
    const socket= useSocket()

    useEffect(()=>{
      const getLocalStream=async()=>{
        const stream = await navigator.mediaDevices.getUserMedia({
          audio:true,
          video:true
        })
        setLocalStream(stream)
      }
      getLocalStream()
    
    },[])


    const handleCallUser = useCallback(async({remoteUserId}:{remoteUserId:string})=>{

        const stream = await navigator.mediaDevices.getUserMedia({
          audio:true,
          video:true
        })
        setLocalStream(stream)
        
        
        const offer = await peer.getOffer()
      
        socket?.emit('session:call-user',{from:userData?.id ,to:remoteUserId, offer})
      
      },[socket, userData?.id])

      const handleUserJoin= useCallback(({userId}:{userId:string})=>{
 
        setRemoteUserId(userId)
        handleCallUser({remoteUserId:userId})
        
      },[handleCallUser])

      // const sendStreams = useCallback(async() => {
      
      //   const stream = await navigator.mediaDevices.getUserMedia({
      //     audio:true,
      //     video:true
      //   })
    
      //   for (const track of stream.getTracks()) {
      //     peer.peer.addTrack(track, stream);
      //   }
      // }, []);
      const sendStreams = useCallback(() => {
        if(!localStream){
          alert('localStream is null')
          return 
        }
        for (const track of localStream.getTracks()) {
          peer.peer.addTrack(track, localStream);
        }
      }, [localStream])


      const handleCallAccepted= useCallback(async({from,ans}:{from:string,ans:RTCSessionDescriptionInit})=>{
       
      //  setRemoteUserId(from)
      //   await peer.setRemoteDescription(ans)
        
      //   const stream = await navigator.mediaDevices.getUserMedia({
      //     audio:true,
      //     video:true
      //   })

      //   for (const track of stream.getTracks()) {
      //     peer.peer.addTrack(track, stream);
      //   }

      peer.setRemoteDescription(ans)
      console.log('call accepted',ans);
      sendStreams()
      
        navigate(`/video-session/${sessionId}`,{ state: {remoteUserId:from,audioEnabled:true,videoEnabled:true} })
        
      },[navigate, sessionId])
      

    useEffect(()=>{
        socket?.on('session:user-joined',handleUserJoin)
        socket?.on('call:accepted', handleCallAccepted)
       
        return ()=>{
        socket?.off('session:user-joined',handleUserJoin)
        socket?.off('call:accepted', handleCallAccepted)
        
        
        }
    },[handleCallAccepted, handleUserJoin, localStream, socket])


    const toggleVideo = () => {
        if(localStream){
            localStream?.getTracks().forEach(track => track.stop());
            setLocalStream(null)
        } 
      
       if(videoEnabled){
        setVideoEnabled(false)
        return 
        
       } 
        navigator.mediaDevices.getUserMedia({ video: true, audio: false })
        .then(stream => {
            
            setLocalStream(stream);
            setVideoEnabled(true)
        })
        .catch(error => {
            alert('error accessing local media')
            console.error('Error accessing local media:', error);
        });
        
    };

    const toggleAudio = () => {
        setAudioEnabled(prev=>!prev)

    };

  

  return (
    
    <div className='h-full  bg-secondary  dark:bg-[#152B52] '>
    <div className="h-16 bg-white  dark:bg-[#0e1c34]"></div>
    <Container className="h-[calc(100vh-3rem)]">
       
        <div className="flex flex-col md:flex-row items-center justify-center h-full  md:mx-28">
            
        <div className="md:order-2 flex flex-col items-center justify-center w-full md:w-1/2 ml-8">
          <iframe  src="https://lottie.host/embed/ce720426-7f3c-46ea-95b1-924e22564ae1/JMlzMCpwqN.json"></iframe>
          <div className=" mt-5 flex flex-col gap-5">
            <span className="sm:text-3xl  text-white font-bold ">Matching Chat Partners</span>
            <Button  onClick={()=>navigate('/')} className="dark:hover:bg-white dark:hover:text-primary" varient={'secondary-outline'} size={'lg'} >Cancel</Button>
          </div>
        </div>

        <div className="relative aspect-video rounded-xl border dark:border-black overflow-hidden bg-black w-full md:w-1/2 ">
            <ReactPlayer className={'scale-150'}  playing url={localStream || ''}  style={{position:'absolute',top:'1',left:'1'}}   width={'100%'} height={'100%'} />
  
            
            <div className="absolute bottom-5  w-full  flex justify-center gap-2">
                <Button onClick={toggleAudio} >
                    {audioEnabled?
                    <span className="border-2 dark:border-white  hover:border-gray-100 hover:text-gray-100 p-2 rounded-full text-white"><Mic /></span>
                    :<span className="  bg-red-600 hover:bg-red-500 p-2 rounded-full text-white"><MicOff /></span>
                    }
                    
                </Button>
                <Button onClick={toggleVideo} >
                    {videoEnabled?
                        <span className="border-2 dark:border-white  hover:border-gray-400 hover:text-gray-400  p-2 rounded-full dark:text-white"><Video /></span>
                        :<span className="  bg-red-600 hover:bg-red-500 p-2 rounded-full text-white"><VideoOff /></span>
                    }
                     
                </Button>
            </div>
           
        </div>
         

        </div>
    </Container>
       
        
      
    </div>
  )
}

export default WaitForLearner
