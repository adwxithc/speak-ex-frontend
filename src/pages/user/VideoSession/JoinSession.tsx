
import Container from "../../../components/layout/Container/Container"
import Button from "../../../components/ui/Button/Button"
import { Mic, MicOff, Video, VideoOff } from "lucide-react"
import { useCallback, useEffect, useRef, useState } from "react"
import { useSocket } from "../../../context/SocketProvider"
import { RootState } from "../../../redux/store"
import { useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import toast from "react-hot-toast"


function JoinSession() {
    const [localStream, setLocalStream] = useState<MediaStream | null>(null)

    const { userData } = useSelector((state: RootState) => state.user)
    const [videoEnabled, setVideoEnabled] = useState(true);
    const [audioEnabled, setAudioEnabled] = useState(true);
    const navigate = useNavigate()
    const { sessionId = '' } = useParams()
    const socket = useSocket()
    const videoRef = useRef<HTMLVideoElement>(null);


    useEffect(() => {
        const getLocalStream = async () => {
            const stream = await navigator.mediaDevices.getUserMedia({
                audio: true,
                video: videoEnabled
            })
            setLocalStream(stream)
            return stream
        }
        const stream = getLocalStream()
        return () => {
            stream.then(s => {
                s.getTracks().forEach(track => track.stop())
            })
        }

    }, [setLocalStream, videoEnabled]);


    const toggleVideo = () => {
        setVideoEnabled(prev => !prev)

    };

    const toggleAudio = () => {
        setAudioEnabled(prev => !prev)
    };


    const handleJoinSession = useCallback(({ sessionId, allowed }: { sessionId: string, allowed: boolean, session: string }) => {

        if (allowed) {

            navigate(`/video-session/${sessionId}`, { state: { remoteUserId: '', audioEnabled, videoEnabled } })
        } else {
            toast.error('session is already occupied', { position: 'top-right' })
            navigate(`/`)
        }
    }, [audioEnabled, navigate, videoEnabled])

    useEffect(() => {
        socket?.on('session:join-allow', handleJoinSession)
        return () => {
            socket?.off('session:join-allow', handleJoinSession)
        }
    }, [handleJoinSession, socket])

    const sessionJoinReady = useCallback(() => {
        socket?.emit('session:join', { userId: userData?.id, sessionId })
    }, [sessionId, socket, userData?.id])


    useEffect(() => {
        if (videoRef.current && localStream) {
            videoRef.current.srcObject = localStream;
        }
    }, [localStream]);

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
                            <Button onClick={sessionJoinReady} className="drop-shadow-md bg-green-400 text-white px-8 py-2 text-lg" >Start</Button>

                            <Button onClick={() => navigate('/')} varient={'secondary-outline'} className="ml-5 px-8 py-2 text-lg" >Leave</Button>

                        </div>
                    </div>

                    <div className="relative aspect-video rounded-xl border dark:border-black overflow-hidden bg-black w-full md:w-1/2 shadow-md shadow-[#3b4b8d20]">
                        {/* <ReactPlayer className={'scale-150'}  playing url={localStream || ''}  style={{position:'absolute',top:'1',left:'1'}}   width={'100%'} height={'100%'} /> */}
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

export default JoinSession
