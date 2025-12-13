import { MessageSquareText, Mic, MicOff, PhoneOff } from "lucide-react"
import { Dispatch, SetStateAction, useCallback, useEffect, useRef, useState } from "react"
import { useLocation, useParams } from "react-router-dom"


import { toggleVideoTrack, toggleAudioTrack } from '../../../../webRTC/streamToggle'
import Button from "../../../../components/ui/Button/Button"
import { useSocket } from "../../../../context/SocketProvider"
import { useSelector } from "react-redux"
import { RootState } from "../../../../redux/store"
import IUser from "../../../../types/database"
import SessionDuration from "../SessionDuration/SessionDuration"
import VideoButton from "../Media/VideoButton"
import getPeerConnection from "../../../../webRTC/peer"



interface IVideoCallArea {
    remoteStream: MediaStream | null;
    setChating: Dispatch<SetStateAction<boolean>>
    remoteUser: Required<IUser> | null
    startTime: number;

}

function VideoCallArea({ remoteStream, setChating, remoteUser, startTime }: IVideoCallArea) {

    const location = useLocation();
    const { videoEnabled: video } = location.state;

    const localvideoRef = useRef<HTMLVideoElement>(null);
    const remotevideoRef = useRef<HTMLVideoElement>(null);

    const [audioEnabled, setAudioEnabled] = useState<boolean>(true)
    const [videoEnabled, setVideoEnabled] = useState<boolean>(video || false)

    const { userData } = useSelector((state: RootState) => state.user)


    const socket = useSocket()

    const { sessionId = '' } = useParams()


    useEffect(() => {

        const peerConnection = getPeerConnection()

        if (localvideoRef.current && peerConnection && peerConnection.getLocalStream()) {

            localvideoRef.current.srcObject = peerConnection.getLocalStream();
        }

    }, [videoEnabled]);

    useEffect(() => {
        const remoteVideo = document.getElementById('remoteVideo') as HTMLVideoElement;
        if (remoteVideo) {

            remoteVideo.srcObject = remoteStream;
        }
    }, [remoteStream]);

    const toggleVideo = () => {
        const localStream = getPeerConnection().getLocalStream();
        if (!localStream) return
        toggleVideoTrack(localStream)
        setVideoEnabled(prev => !prev)
    }
    const toggleAudio = () => {
        const localStream = getPeerConnection().getLocalStream();

        if (!localStream) return
        toggleAudioTrack(localStream)
        setAudioEnabled(prev => !prev)

    }
    const terminate = useCallback(() => {
        socket?.emit('session:terminate', { sessionCode: sessionId, endingTime: new Date() })

    }, [sessionId, socket])





    return (

        <div className="h-full flex flex-col">

            {/* chat area */}
            <div className="flex-1 overflow-hidden">

                <div className="h-full w-full p-2 md:p-6 xl:px-20 relative overflow-hidden">

                    <div className={`${'aspect-square xl:aspect-video'} bg-gray-900 rounded-3xl shadow-2xl relative mt-20 sm:m-0 overflow-hidden border border-gray-700/60 ring-1 ring-gray-600/30`}>

                        {
                            remoteStream ?

                                <video ref={remotevideoRef} id="remoteVideo" autoPlay style={{ position: "absolute", top: "1", left: "1", width: "100%", height: "100%" }} />
                                : <div className="flex items-center justify-center h-full text-gray-400 text-lg">Connecting...</div>
                        }
                        <div className="absolute top-5 right-5 bg-gray-800/95 backdrop-blur-xl p-3 rounded-2xl shadow-xl border border-gray-600/40">
                            {remoteStream?.getAudioTracks()[0]?.enabled ? <Mic className="text-emerald-400" size={22} /> : <MicOff className="text-rose-400" size={22} />}
                        </div>
                        <div className="absolute bottom-5 left-5 bg-gray-800/95 backdrop-blur-xl px-6 py-3 rounded-2xl shadow-xl border border-gray-600/40">
                            <span className="text-white text-sm font-semibold tracking-wide">{remoteUser?.firstName + " " + remoteUser?.lastName}</span>
                        </div>
                        <div className="absolute top-5 left-5 bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-600 backdrop-blur-xl px-6 py-3 rounded-2xl shadow-xl border border-indigo-400/30">
                            <span className="text-white text-sm font-bold tracking-wide"><SessionDuration {...{ terminate, startTime }} /></span>
                        </div>

                    </div>
                    {
                        true &&
                        <div className="aspect-video w-52 sm:w-72 bg-gray-900 absolute bottom-10 right-5 sm:right-10 overflow-hidden rounded-2xl shadow-2xl border border-gray-700/60 ring-1 ring-gray-600/30">


                            <video ref={localvideoRef} id='localVideo' autoPlay muted style={{ position: "absolute", top: "1", left: "1", width: "100%", height: "100%" }} />


                            <div className="absolute bottom-3 left-3 bg-gray-800/95 backdrop-blur-xl px-4 py-2 rounded-xl shadow-lg border border-gray-600/40">
                                <span className="text-white text-xs font-semibold tracking-wide">{userData?.firstName + " " + userData?.lastName}</span>
                            </div>
                        </div>
                    }
                </div>

            </div>
            {/* bottom area */}
            <div className="h-24 bg-gray-900/95 backdrop-blur-2xl flex justify-center items-center relative border-t border-gray-700/50 shadow-2xl">
                <div className="flex gap-3 items-center">

                    <Button onClick={toggleAudio} className={`p-4 rounded-2xl shadow-xl transition-all duration-200 text-white border ${audioEnabled ? 'bg-gray-700 hover:bg-gray-600 border-gray-600/50' : 'bg-rose-600 hover:bg-rose-500 border-rose-500/50'}`}>
                        {audioEnabled ? <Mic size={22} /> : <MicOff size={22} />}
                    </Button>
                    
                    <VideoButton {...{ toggleVideo, videoEnabled }} />
                    
                    <Button onClick={terminate} className="bg-rose-600 hover:bg-rose-500 text-white shadow-xl transition-all duration-200 border border-rose-500/50 p-4 rounded-2xl">
                        <span className="mr-1.5 font-medium">End</span> <PhoneOff size={16} />
                    </Button>
                    
                    <Button onClick={() => setChating(true)} className="bg-indigo-600 hover:bg-indigo-500 text-white shadow-xl transition-all duration-200 p-4 rounded-2xl border border-indigo-500/50">
                        <MessageSquareText size={22} />
                    </Button>
                </div>
            </div>
        </div>

    )
}

export default VideoCallArea
