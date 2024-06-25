import { ChevronDown, ChevronUp, Video, VideoOff } from 'lucide-react'
import Button from '../../../../components/ui/Button/Button'
import { useState } from 'react'
import VideoDevices from './VideoDevices'


function VideoButton({ toggleVideo, videoEnabled,changeVideoDevice }: { videoEnabled: boolean, toggleVideo: () => void,changeVideoDevice: (deviceId: string) => Promise<void>
}) {
    const [showDevices, setShowDevices] =  useState(false)
  

    const changeLocalVideoDevice = async(deviceId:string)=>{

        console.log(deviceId);
      
        setShowDevices(false)
        changeVideoDevice(deviceId)

    }

    return (
        <div className=''>
        <div className={` inline-flex rounded-md   overflow-hidden cursor-pointer `} >
            <div className={`inline-flex items-center shadow-white/10 shadow-inner text-white ${videoEnabled ? 'bg-[#444444] hover:bg-gray-700/20' : 'bg-red-600  hover:bg-red-700/20'} px-1  transition-colors`}>
                <Button onClick={toggleVideo} className=' p-2 rounded-none h-full flex-1 shadow-none' >
                    {
                        videoEnabled ? <Video size={18} /> : <VideoOff size={18} />
                    }
                </Button>
            </div>

            <div className={` ${videoEnabled ? 'bg-[#444444] text-white' : 'bg-red-700/50'} inline-flex items-center px-1`} onClick={()=>setShowDevices(prev=>!prev)}>
                {
                    showDevices?<ChevronUp size={18} />:<ChevronDown size={18} />
                }
            </div>
           
        </div>
         {
            showDevices?<VideoDevices {...{changeVideoDevice:changeLocalVideoDevice}}/>:<></>
        }
        </div>


    )
}

export default VideoButton
