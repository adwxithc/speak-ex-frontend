import ReactPlayer from "react-player"
import Container from "../../../components/layout/Container/Container"
import Button from "../../../components/ui/Button/Button"
import { Mic, MicOff, Video, VideoOff } from "lucide-react"
import { useCallback, useEffect, useState } from "react"
import { useSocket } from "../../../context/SocketProvider"
import peer from '../../.../../../services/peer'
import { RootState } from "../../../redux/store"
import { useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"




function JoinSession() {
    const [localStream, setLocalStream] =  useState<MediaStream|null>(null)

    const {userData} =useSelector((state:RootState)=>state.user)
    const [videoEnabled, setVideoEnabled] = useState(true);
    const [audioEnabled, setAudioEnabled] = useState(true);
    const [remoteUserId, setRemoteUserId] = useState('')
    const [ans, setAns] = useState<RTCSessionDescriptionInit|null>(null)
    const [allowJoin, setAllowJoin] = useState(false)
    const navigate = useNavigate()
    const {sessionId=''} = useParams()
    const socket =  useSocket()
    
   


    
    useEffect(() => {
        const getLocalStream=async()=>{
          const stream = await navigator.mediaDevices.getUserMedia({
            audio:true,
            video:true
          })
          setLocalStream(stream)
          return stream
        }
        getLocalStream()
        
      }, [ setLocalStream]);


  




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

    
    const startSession = useCallback(async(remoteUserId:string) => {
      
        // const stream =  await navigator.mediaDevices.getUserMedia({ video: true, audio: true })
        if(!localStream) return
        for (const track of localStream.getTracks()) {
          peer.peer.addTrack(track, localStream);
        }
        navigate(`/video-session/${sessionId}`,{ state: {remoteUserId,audioEnabled,videoEnabled} })
        
      }, [audioEnabled, localStream, navigate, sessionId, videoEnabled]);


    const handleIncommingCall = useCallback(async({from,offer}:{from:string,offer:RTCSessionDescriptionInit})=>{
      
        const ans = await peer.getAnswer(offer)
        setAns(ans || null)
        setRemoteUserId(from)
        setAllowJoin(true)
        
    },[])

    const handleJoinSesion =()=>{
      
        socket?.emit('call:accepted',{ans,to:remoteUserId, from:userData?.id})
        startSession(remoteUserId);
        
    }

    useEffect(()=>{
        socket?.on('incomming:call',handleIncommingCall)

        return ()=>{
            socket?.off('incomming:call',handleIncommingCall)
            // localStream?.getTracks().forEach(track => track.stop());
        }
    },[handleIncommingCall, localStream, socket])


  

  return (
    
    <div className='h-full  bg-secondary  dark:bg-[#0e1c34] '>
    <Container className="h-[calc(100vh-0rem)]">
    
        <div className="flex flex-col md:flex-row items-center justify-center h-full  md:mx-28">
            
        <div className="md:order-2 flex flex-col items-center justify-center w-full md:w-1/2 ml-8">
            <div className="">
            <iframe className="w-72 h-56" src="https://lottie.host/embed/dc963719-3bf5-4328-9d60-6fe3e04ec2ef/h7AHaG7jHC.json"></iframe>
            </div>
         <div>
            <h3 className="text-3xl dark:text-white font-semibold">Ready to start session?</h3>
         </div>
         <div className="mt-3 mb-8">
            {
                allowJoin && <Button onClick={handleJoinSesion}   className="drop-shadow-md bg-green-400 text-white px-8 py-2 text-lg" >Start</Button>
            }
            
            <Button onClick={()=>navigate('/')} varient={'secondary-outline'} className="ml-5 px-8 py-2 text-lg" >Leave</Button>
            
         </div>
        </div>

        <div className="relative aspect-video rounded-xl border dark:border-black overflow-hidden bg-black w-full md:w-1/2 shadow-md shadow-[#3b4b8d20]">
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

export default JoinSession
