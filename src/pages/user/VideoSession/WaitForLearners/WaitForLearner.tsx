
import Container from "../../../../components/layout/Container/Container"
import Button from "../../../../components/ui/Button/Button"
import { Mic, MicOff, Video, VideoOff } from "lucide-react"
import { useCallback, useEffect, useRef, useState } from "react"
import { useSocket } from "../../../../context/SocketProvider"
import { useNavigate, useParams } from "react-router-dom"
import { useDispatch } from "react-redux"
import { setSession } from "../../../../redux/features/user/session/sessionSlice"
import getPeerConnection from "../../../../webRTC/peer"


function WaitForLearner() {
  const dispatch = useDispatch()


  const [videoEnabled, setVideoEnabled] = useState(true);
  const [audioEnabled, setAudioEnabled] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const { sessionId = '' } = useParams()
  const navigate = useNavigate()
  const socket = useSocket()

  const handleUserJoin = useCallback(({ userId, startTime }: { userId: string, startTime: string }) => {
    dispatch(setSession({ remoteUserId: userId }))
    navigate(`/video-session/${sessionId}`, { state: { remoteUserId: userId, audioEnabled, videoEnabled, type: 'helper', startTime } })
  }, [audioEnabled, dispatch, navigate, sessionId, videoEnabled])



  useEffect(() => {
    const timeOut = setInterval(() => {

      socket?.emit('session:rematch', { sessionId })
    }, 10000)

    return () => {
      clearInterval(timeOut)
    }
  }, [sessionId, socket])


  useEffect(() => {
    socket?.on('session:user-joined', handleUserJoin)

    return () => {
      socket?.off('session:user-joined', handleUserJoin)

    }
  }, [handleUserJoin, socket])


  const toggleAudio = () => {
    setAudioEnabled(prev => !prev)
  }

  const toggleVideo = () => {
    setVideoEnabled(prev => !prev)
  }

  useEffect(() => {
    const peerConnection = getPeerConnection()
    if (videoRef.current && peerConnection && peerConnection.getLocalStream()) {
      videoRef.current.srcObject = peerConnection.getLocalStream();
    }

  }, []);
  return (

    <div className='h-full  bg-secondary  dark:bg-[#152B52] '>
      <div className="h-16 bg-white  dark:bg-[#0e1c34]"></div>
      <Container className="h-[calc(100vh-3rem)]">

        <div className="flex flex-col md:flex-row items-center justify-center h-full  md:mx-28">

          <div className="md:order-2 flex flex-col items-center justify-center w-full md:w-1/2 ml-8">
            <iframe src="https://lottie.host/embed/ce720426-7f3c-46ea-95b1-924e22564ae1/JMlzMCpwqN.json"></iframe>
            <div className=" mt-5 flex flex-col gap-5">
              <span className="sm:text-3xl  text-white font-bold ">Matching Chat Partners</span>
              <Button onClick={() => navigate('/')} className="dark:hover:bg-white dark:hover:text-primary" varient={'secondary-outline'} size={'lg'} >Cancel</Button>
            </div>
          </div>

          <div className="relative aspect-video rounded-xl border dark:border-black overflow-hidden bg-black w-full md:w-1/2 ">

            <video ref={videoRef} autoPlay muted style={{ position: "absolute", top: "1", left: "1", width: "100%", height: "100%" }} />



            <div className="absolute bottom-5  w-full  flex justify-center gap-2">
              <Button onClick={toggleAudio} >
                {audioEnabled ?
                  <span className="border-2 dark:border-white  hover:border-gray-100 hover:text-gray-100 p-2 rounded-full text-white"><Mic /></span>
                  : <span className="  bg-red-600 hover:bg-red-500 p-2 rounded-full text-white"><MicOff /></span>
                }

              </Button>
              <Button onClick={toggleVideo} >
                {videoEnabled ?
                  <span className="border-2 dark:border-white  hover:border-gray-400 hover:text-gray-400  p-2 rounded-full dark:text-white"><Video /></span>
                  : <span className="  bg-red-600 hover:bg-red-500 p-2 rounded-full text-white"><VideoOff /></span>
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
