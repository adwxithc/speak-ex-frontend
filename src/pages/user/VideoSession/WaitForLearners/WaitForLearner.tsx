
import Container from "../../../../components/layout/Container/Container"
import Button from "../../../../components/ui/Button/Button"
import { Mic, MicOff, Video, VideoOff } from "lucide-react"
import { useCallback, useEffect, useRef, useState } from "react"
import { useSocket } from "../../../../context/SocketProvider"
import { useNavigate, useParams } from "react-router-dom"

import getPeerConnection, { resetPeerConnection } from "../../../../webRTC/peer"
import { useDispatch } from "react-redux"
import { setSession } from "../../../../redux/features/user/session/sessionSlice"
import { toggleVideoTrack } from "../../../../webRTC/streamToggle"
import endPeerConnectionHandler from "../../../../webRTC/endPeerConnectionHandler"


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
    navigate(`/video-session/${sessionId}`, { state: { remoteUserId: userId, audioEnabled, videoEnabled, type: 'helper', startTime }, replace: true })
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
    const localStream = getPeerConnection().getLocalStream();
    if (!localStream) return
    toggleVideoTrack(localStream)
    
  }


  useEffect(() => {
    const peerConnection = getPeerConnection()
    if (videoRef.current && peerConnection && peerConnection.getLocalStream()) {
      videoRef.current.srcObject = peerConnection.getLocalStream();
    }

  }, []);

  const cancelSession =()=>{
    const pc = getPeerConnection()
        endPeerConnectionHandler({ localStream: pc.getLocalStream(), peerService: pc, remoteStream:null })
        resetPeerConnection()
        navigate('/', { replace: true })
  }
  return (

    <div className='min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-black'>
      <div className="h-16 bg-gradient-to-r from-gray-900/95 via-gray-800/95 to-gray-900/95 backdrop-blur-lg border-b border-gray-700/50"></div>
      <Container className="h-[calc(100vh-4rem)] py-8">

        <div className="flex flex-col md:flex-row items-center justify-center h-full gap-8 md:gap-12 px-4 md:px-8 lg:px-20">

          <div className="md:order-2 flex flex-col items-center justify-center w-full md:w-1/2">
            <div className="w-full max-w-md">
              <iframe src="https://lottie.host/embed/ce720426-7f3c-46ea-95b1-924e22564ae1/JMlzMCpwqN.json" className="w-full h-64 md:h-80"></iframe>
            </div>
            <div className="mt-8 flex flex-col gap-6 items-center">
              <div className="text-center">
                <h2 className="text-2xl sm:text-3xl md:text-4xl text-white font-bold mb-2">Matching Chat Partners</h2>
                <p className="text-gray-400 text-sm md:text-base">Please wait while we find the perfect match for you...</p>
              </div>
              <Button onClick={cancelSession} className="bg-gradient-to-br from-gray-700 to-gray-800 hover:from-gray-600 hover:to-gray-700 border-2 border-gray-600 text-white shadow-lg transition-all duration-200" size={'lg'}>Cancel Session</Button>
            </div>
          </div>

          <div className="relative aspect-video rounded-2xl border-2 border-gray-700/50 overflow-hidden bg-gradient-to-br from-gray-950 to-black w-full md:w-1/2 shadow-2xl">

            <video ref={videoRef} autoPlay muted style={{ position: "absolute", top: "1", left: "1", width: "100%", height: "100%" }} />



            <div className="absolute bottom-6 w-full flex justify-center gap-4">
              <Button 
                onClick={toggleAudio} 
                className={`p-3 rounded-xl shadow-lg transition-all duration-200 ${audioEnabled ? 'bg-gradient-to-br from-gray-700 to-gray-800 hover:from-gray-600 hover:to-gray-700 border-2 border-gray-600' : 'bg-gradient-to-br from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 border-2 border-red-500'}`}
              >
                {audioEnabled ? <Mic className="text-white" size={22} /> : <MicOff className="text-white" size={22} />}
              </Button>
              <Button 
                onClick={toggleVideo} 
                className={`p-3 rounded-xl shadow-lg transition-all duration-200 ${videoEnabled ? 'bg-gradient-to-br from-gray-700 to-gray-800 hover:from-gray-600 hover:to-gray-700 border-2 border-gray-600' : 'bg-gradient-to-br from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 border-2 border-red-500'}`}
              >
                {videoEnabled ? <Video className="text-white" size={22} /> : <VideoOff className="text-white" size={22} />}
              </Button>
            </div>

          </div>




        </div>
      </Container>



    </div>
  )
}

export default WaitForLearner
