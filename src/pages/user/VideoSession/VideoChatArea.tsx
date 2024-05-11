import { Maximize, MessageSquareText, Mic, MicOff, Minimize, PhoneOff, Video, VideoOff } from "lucide-react"
import { useState } from "react"
import ReactPlayer from 'react-player'

import Button from "../../../components/ui/Button/Button"

import ToolTip from "../../../components/ui/ToolTip/ToolTip"
import { useNavigate } from "react-router-dom"

interface IVideoChatArea{
    toggleVideo: () => void;
    toggleAudio: () => void;
    enableVideo:boolean;
    enableAudio:boolean;
    localStream:MediaStream | null;
    remoteStream:MediaStream | null
}

function VideoChatArea({localStream,remoteStream, toggleVideo,toggleAudio,enableAudio,enableVideo }:IVideoChatArea) {
    const navigate = useNavigate()

    const [fullscreen, setFullScreen] = useState(false)
  return (
    <div className="h-screen   flex flex-col">
    {/* top area */}
    <div className="h-16 bg-white  dark:bg-[#0e1c34] flex items-center">
       
        
    </div>
    {/* chat area */}
    <div className="flex-1 bg-secondary  dark:bg-[#152B52]  overflow-hidden">

        <div className="h-full w-full p-1 md:p-5 xl:px-20 relative overflow-hidd  ">
  
                <div className={`${fullscreen?'w-full h-full ':'aspect-square xl:aspect-video'} bg-[#0a1426]   rounded-xl drop-shadow-md relative mt-20 sm:m-0 overflow-hidden`}>
                
                <span className="text-gray-700 absolute top-5 right-5 cursor-pointer">
                {
                    fullscreen?
                    <Minimize onClick={()=>setFullScreen(false)} />:
                    <Maximize onClick={()=>setFullScreen(true)} />
                }
                </span>
                {
                    remoteStream?
                    <ReactPlayer    playing height={'100%'} width={'100%'}  url={remoteStream}/>
                    :<div>oops something went wrong...</div>
                }

                <span className="bg-[#0000002c] text-white px-4 py-2 rounded-full absolute bottom-5 left-5 text-sm font-semibold"> Adwaith C</span>
                <span className="bg-[#0000002c] text-white px-4 py-2 rounded-full absolute top-5 left-5 text-sm font-semibold"> 30 min</span>

                </div>

            {
                true &&
                <div className="aspect-video w-52 sm:w-72 bg-[#0a1426]    absolute bottom-10 right-5 sm:right-10 overflow-hidden rounded-xl drop-shadow">
                {
                    localStream?
                    <ReactPlayer className={'scale-150'} muted playing height={'100%'} width={'100%'}  url={localStream}/>
                    :<div>oops something went wrong...</div>
                }
                <span className="bg-[#0000002c] text-white px-3 py-2 rounded-full absolute bottom-3 left-3 text-xs font-semibold"> thagamma</span>

                </div>
            }
            
        </div>
        
    </div>
    {/* bottom area */}
    <div className="h-20 bg-white dark:bg-[#0e1c34] flex justify-center items-center" >
        <div className="flex gap-5 items-center">
            <Button onClick={toggleAudio} >
                {enableAudio ?
                    <span className=" dark:bg-white p-2 rounded-full cursor-pointer "><Mic  /></span>
                    : <span className=" dark:bg-red-500 text-white p-2 rounded-full cursor-pointer "><MicOff /></span>
                }
            
            </Button>
          
            <Button onClick={toggleVideo} >
                {
                    enableVideo?
                    <span  className="dark:bg-white p-2 rounded-full cursor-pointer"><Video /> </span>
                    :
                    <span className="dark:bg-red-600 text-white p-2 rounded-full cursor-pointer"><VideoOff /> </span>
                }
            </Button>
           
            <ToolTip tooltip="end call" >
                <Button onClick={()=>navigate('/')} className="bg-red-500 text-white " size={'md'}> <span className="mr-2 font-semibold">End</span> <PhoneOff size={15} /></Button>
            </ToolTip>
            
            <ToolTip tooltip="chat">
                <span className="dark:bg-white p-2 rounded-full cursor-pointer"><MessageSquareText /> </span>
            </ToolTip>
            

            
        </div>
    </div>
  </div>
  )
}

export default VideoChatArea
