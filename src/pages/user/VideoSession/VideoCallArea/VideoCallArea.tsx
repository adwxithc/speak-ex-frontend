import { MessageSquareText, Mic, MicOff, PhoneOff } from "lucide-react"
import { Dispatch, SetStateAction, useCallback, useEffect, useRef, useState } from "react"
import { useParams } from "react-router-dom"


import { toogleVideoTrack, toogleAudioTrack } from '../../../../webRTC/streamToggle'
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
    changeVideoDevice: (deviceId: string) => Promise<void>
}

function VideoCallArea({  remoteStream, setChating, remoteUser, startTime, changeVideoDevice }: IVideoCallArea) {

    const localvideoRef = useRef<HTMLVideoElement>(null);
    const remotevideoRef = useRef<HTMLVideoElement>(null);

    const [audioEnabled, setAudioEnabled] = useState<boolean>(true)
    const [videoEnabled, setVideoEnabled] = useState<boolean>(true)

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
        toogleVideoTrack(localStream)
        setVideoEnabled(prev => !prev)
    }
    const toggleAudio = () => {
        const localStream = getPeerConnection().getLocalStream();

        if (!localStream) return
        toogleAudioTrack(localStream)
        setAudioEnabled(prev => !prev)

    }
    const terminate = useCallback(() => {
        socket?.emit('session:terminate', { sessionCode: sessionId, endingTime: new Date() })

    }, [sessionId, socket])





    return (

        <div className="h-full   flex flex-col">
         
            {/* chat area */}
            <div className="flex-1 overflow-hidden">

                <div className="h-full w-full p-1 md:p-5 xl:px-20 relative overflow-hidd  ">

                    <div className={`${'aspect-square xl:aspect-video'}  bg-black    rounded-xl drop-shadow-md relative mt-20 sm:m-0 overflow-hidden`}>

                        <span className="text-gray-700 absolute top-5 right-5 cursor-pointer">

                        </span>
                        {
                            remoteStream ?

                                <video ref={remotevideoRef} id="remoteVideo" autoPlay style={{ position: "absolute", top: "1", left: "1", width: "100%", height: "100%" }} />
                                : <div>oops something went wrong...</div>
                        }
                        <span className="text-white absolute top-5 right-5 bg-[#0000002c] p-1 rounded-full">{remoteStream?.getAudioTracks()[0]?.enabled ? <Mic /> : <MicOff />}</span>
                        <span className="bg-[#0000002c] text-white px-4 py-2 rounded-full absolute bottom-5 left-5 text-sm font-semibold"> {remoteUser?.firstName + " " + remoteUser?.lastName}</span>
                        <span className="bg-[#0000002c] text-white px-4 py-2 rounded-full absolute top-5 left-5 text-sm font-semibold"> <SessionDuration  {...{ terminate, startTime }} /> </span>

                    </div>
                    {
                        true &&
                        <div className="aspect-video w-52 sm:w-72 bg-black   absolute bottom-10 right-5 sm:right-10 overflow-hidden rounded-xl drop-shadow">
                            

                                    <video ref={localvideoRef} id='localVideo' autoPlay muted style={{ position: "absolute", top: "1", left: "1", width: "100%", height: "100%" }} />
                                 
                            
                            <span className="bg-[#0000002c] text-white px-3 py-2 rounded-full absolute bottom-3 left-3 text-xs font-semibold"> {userData?.firstName + " " + userData?.lastName}</span>
                        </div>
                    }
                </div>

            </div>
            {/* bottom area */}
            <div className="h-20 bg-black/30 flex justify-center items-center relative" >
                <div className="flex gap-5 items-center ">

                    <Button onClick={toggleAudio} className={` p-2 rounded-none h-full flex-1 shadow-white/10  px-1  transition-colors text-white  ${videoEnabled ? 'bg-[#444444] hover:bg-gray-700/20' : 'bg-red-600  hover:bg-red-700/20'}`} >

                        {audioEnabled ?<Mic />:<MicOff />
                        }
                    </Button>
                    <VideoButton {...{ toggleVideo, videoEnabled, changeVideoDevice }} />
                    <Button onClick={terminate} className="bg-red-500 text-white " size={'lg'}> <span className="mr-2 font-semibold">End</span> <PhoneOff size={15} /></Button>
                    <Button onClick={() => setChating(true)}><span className="bg-white text-black/70 p-2 rounded-full cursor-pointer"><MessageSquareText /> </span></Button>
                </div>
            </div>
        </div>

    )
}

export default VideoCallArea
