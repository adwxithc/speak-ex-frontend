import { MessageSquareText, Mic, MicOff, PhoneOff, Video, VideoOff } from "lucide-react"
import { Dispatch, SetStateAction, useCallback, useEffect, useRef, useState } from "react"
import { useParams } from "react-router-dom"


import { toogleVideoTrack, toogleAudioTrack } from '../../../../webRTC/streamToggle'
import Button from "../../../../components/ui/Button/Button"
import { useSocket } from "../../../../context/SocketProvider"
import { useSelector } from "react-redux"
import { RootState } from "../../../../redux/store"
import IUser from "../../../../types/database"
import SessionDuration from "../SessionDuration/SessionDuration"



interface IVideoCallArea {
    localStream: MediaStream | null;
    remoteStream: MediaStream | null;
    setChating: Dispatch<SetStateAction<boolean>>
    remoteUser: Required<IUser> | null
    startTime: number
}

function VideoCallArea({ localStream, remoteStream, setChating, remoteUser, startTime }: IVideoCallArea) {
  
    const localvideoRef = useRef<HTMLVideoElement>(null);
    const remotevideoRef = useRef<HTMLVideoElement>(null);

    const [audioEnabled, setAudioEnabled] = useState<boolean>(true)
    const [videoEnabled, setVideoEnabled] = useState<boolean>(true)

    const { userData } = useSelector((state: RootState) => state.user)


    const socket = useSocket()

    const { sessionId = '' } = useParams()


    useEffect(() => {
        if (localvideoRef.current && localStream) {
            localvideoRef.current.srcObject = localStream;
        }
        
    }, [localStream]);

    useEffect(() => {
        console.log('remote stream changed ',remoteStream,remotevideoRef.current);
        
        // if (remotevideoRef.current && remoteStream) {
        //     remotevideoRef.current.srcObject = remoteStream;
        // }
       
    }, [remoteStream]);

    const toggleVideo = () => {
        if (!localStream) return
        toogleVideoTrack(localStream)
        setVideoEnabled(prev => !prev)
    }
    const toggleAudio = () => {
        if (!localStream) return
        toogleAudioTrack(localStream)
        setAudioEnabled(prev => !prev)

    }
    const terminate = useCallback(() => {

       
        socket?.emit('session:terminate', { sessionCode: sessionId,endingTime:new Date()})
       
    },[sessionId, socket])




 
    return (

        <div className="h-screen   flex flex-col">
            {/* top area */}
            <div className="h-16 bg-white  dark:bg-[#0e1c34] flex items-center">
            </div>
            {/* chat area */}
            <div className="flex-1 bg-secondary  dark:bg-[#152B52]  overflow-hidden">

                <div className="h-full w-full p-1 md:p-5 xl:px-20 relative overflow-hidd  ">

                    <div className={`${'aspect-square xl:aspect-video'} bg-[#0a1426]   rounded-xl drop-shadow-md relative mt-20 sm:m-0 overflow-hidden`}>

                        <span className="text-gray-700 absolute top-5 right-5 cursor-pointer">

                        </span>
                        {
                            remoteStream ?

                                <video ref={remotevideoRef} id="remoteVideo" autoPlay style={{ position: "absolute", top: "1", left: "1", width: "100%", height: "100%" }} />
                                : <div>oops something went wrong...</div>
                        }
                        <span className="text-white absolute top-5 right-5 bg-[#0000002c] p-1 rounded-full">{remoteStream?.getAudioTracks()[0].enabled ? <Mic /> : <MicOff />}</span>
                        <span className="bg-[#0000002c] text-white px-4 py-2 rounded-full absolute bottom-5 left-5 text-sm font-semibold"> {remoteUser?.firstName + " " + remoteUser?.lastName}</span>
                        <span className="bg-[#0000002c] text-white px-4 py-2 rounded-full absolute top-5 left-5 text-sm font-semibold"> <SessionDuration  {...{ terminate, startTime }} /> </span>

                    </div>
                    {
                        true &&
                        <div className="aspect-video w-52 sm:w-72 bg-[#0a1426]    absolute bottom-10 right-5 sm:right-10 overflow-hidden rounded-xl drop-shadow">
                            {
                                localStream ?

                                    <video ref={localvideoRef} autoPlay muted style={{ position: "absolute", top: "1", left: "1", width: "100%", height: "100%" }} />
                                    : <div>oops something went wrong...</div>
                            }
                            <span className="bg-[#0000002c] text-white px-3 py-2 rounded-full absolute bottom-3 left-3 text-xs font-semibold"> {userData?.firstName + " " + userData?.lastName}</span>
                        </div>
                    }
                </div>

            </div>
            {/* bottom area */}
            <div className="h-20 bg-white dark:bg-[#0e1c34] flex justify-center items-center" >
                <div className="flex gap-5 items-center">
                    <Button onClick={toggleAudio} >

                        {audioEnabled ?
                            <span className=" dark:bg-white p-2 rounded-full cursor-pointer "><Mic /></span>
                            : <span className=" dark:bg-red-500 text-white p-2 rounded-full cursor-pointer "><MicOff /></span>
                        }
                    </Button>
                    <Button onClick={toggleVideo} >
                        {
                            videoEnabled ?
                                <span className="dark:bg-white p-2 rounded-full cursor-pointer"><Video /> </span>
                                :
                                <span className="dark:bg-red-600 text-white p-2 rounded-full cursor-pointer"><VideoOff /> </span>
                        }
                    </Button>
                    <Button onClick={terminate} className="bg-red-500 text-white " size={'md'}> <span className="mr-2 font-semibold">End</span> <PhoneOff size={15} /></Button>
                    <Button onClick={() => setChating(true)}><span className="dark:bg-white p-2 rounded-full cursor-pointer"><MessageSquareText /> </span></Button>
                </div>
            </div>
        </div>

    )
}

export default VideoCallArea
