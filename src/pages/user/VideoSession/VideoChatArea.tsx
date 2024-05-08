import { Maximize, MessageSquareText, Mic, Minimize, PhoneOff, Video } from "lucide-react"
import { useState } from "react"
import ReactPlayer from 'react-player'

import Button from "../../../components/ui/Button/Button"

import ToolTip from "../../../components/ui/ToolTip/ToolTip"


function VideoChatArea({localStream,remoteStream}:{localStream:MediaStream | null,remoteStream:MediaStream | null}) {

    const [fullscreen, setFullScreen] = useState(false)
  return (
    <div className="h-screen   flex flex-col">
    {/* top area */}
    <div className="h-16 bg-white  dark:bg-[#0e1c34] flex items-center">
       
        
    </div>
    {/* chat area */}
    <div className="flex-1 bg-secondary  dark:bg-[#152B52]  overflow-hidden">

        <div className="h-full w-full p-1 md:p-5 xl:px-20 relative overflow-hidd  ">
           

                
                <div className={`${fullscreen?'w-full h-full ':'aspect-square xl:aspect-video'} bg-[#0a1426] bg-[url('https://img.freepik.com/free-photo/man-with-headset-video-call_23-2148854889.jpg')] bg-cover rounded-xl drop-shadow-md relative mt-20 sm:m-0`}>
                
                <span className="text-gray-700 absolute top-5 right-5 cursor-pointer">
                {
                    fullscreen?
                    <Minimize onClick={()=>setFullScreen(false)} />:
                    <Maximize onClick={()=>setFullScreen(true)} />
                }
                
                
                </span>
                {
                    remoteStream?
                    <ReactPlayer  playing height={'300px'} width={'500px'}  url={remoteStream}/>
                    :<div>oops something went wrong...</div>
                }
                
                

                <span className="bg-[#0000002c] text-white px-4 py-2 rounded-full absolute bottom-5 left-5 text-sm font-semibold"> Adwaith C</span>
                <span className="bg-[#0000002c] text-white px-4 py-2 rounded-full absolute top-5 left-5 text-sm font-semibold"> 30 min</span>

                </div>
      
            
            
            {
                true &&
                <div className="aspect-video w-52 sm:w-72 bg-[#0a1426] bg-[url('https://cdn.idntimes.com/content-images/community/2023/11/woman-with-headset-video-call-23-2148854900-3fa1274ef03a11e97f2dd33996941c4a-de2273bf08f45eec0163b6666eb0c536_600x400.jpg')]  bg-cover  absolute bottom-10 right-5 sm:right-10  rounded-xl drop-shadow">
{
                    localStream?
                    <ReactPlayer muted playing height={'100px'} width={'200px'}  url={localStream}/>
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
            <ToolTip tooltip="mic">
            <span className=" dark:bg-white p-2 rounded-full cursor-pointer "><Mic  /></span>
            </ToolTip>

            <ToolTip tooltip="video">
                <span className="dark:bg-white p-2 rounded-full cursor-pointer"><Video /> </span>
            </ToolTip>
            <ToolTip tooltip="end call" >
                <Button className="bg-red-500 text-white " size={'md'}> <span className="mr-2 font-semibold">End</span> <PhoneOff size={15} /></Button>
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
