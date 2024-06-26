import { ChevronDown, ChevronUp, Video, VideoOff } from 'lucide-react'
import Button from '../../../../components/ui/Button/Button'
import { useState } from 'react'
import VideoDevices from './VideoDevices'
import getPeerConnection from '../../../../webRTC/peer'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../../redux/store'
import { setSession } from '../../../../redux/features/user/session/sessionSlice'


function VideoButton({ toggleVideo, videoEnabled }: { videoEnabled: boolean, toggleVideo: () => void}) {
    const [showDevices, setShowDevices] =  useState(false)
  
    const { audioDevice } = useSelector((state: RootState) => state.session)
    const dispatch = useDispatch()

    const changeVideoDevice = async (deviceId: string) => {

        //2. we need to getUserMedia (permission)
        const newConstraints = {
            audio: audioDevice === "default" ? true : { deviceId: { exact: audioDevice } },
            video: { deviceId: { exact: deviceId } }
        }
        const stream = await navigator.mediaDevices.getUserMedia(newConstraints)
        // //3. update Redux with that videoDevice, and that video is enabled
        dispatch(setSession({ 'videoDevice': deviceId }));
        dispatch(setSession({ 'video': true }))


        
        //6. add tracks
        const [videoTrack] = stream.getVideoTracks();
        const peerConnection = getPeerConnection()

        const pc = peerConnection.getPeerConnection();
        if (!pc) return
        const senders = pc.getSenders()
        //find the sender that is in charge of the video track
        const sender = senders.find(s => {
            if (s.track) {
                //if this track matches the videoTrack kind, return it
                return s.track.kind === videoTrack.kind
            } else {
                return false;
            }
        })
        if (sender) {
            //sender is RTCRtpSender, so it can replace the track
            
            sender.replaceTrack(videoTrack)
           
        }
    }
    const changeLocalVideoDevice = async(deviceId:string)=>{

        console.log(deviceId);
      
        setShowDevices(false)
        changeVideoDevice(deviceId)

    }

    return (
        <div className=''>
        <div className={` inline-flex rounded-md   overflow-hidden cursor-pointer `} >
            <div className={`inline-flex items-center shadow-white/10 shadow-inner text-white ${videoEnabled ? 'bg-[#444444] hover:bg-gray-700/20 ' : 'bg-red-600  hover:bg-red-700/20'} px-1  transition-colors`}>
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
