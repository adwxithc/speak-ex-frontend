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

  
        setShowDevices(false)
        changeVideoDevice(deviceId)

    }

    return (
        <div className='relative'>
        <div className={`inline-flex rounded-2xl overflow-hidden cursor-pointer shadow-xl transition-all duration-200 border ${videoEnabled ? 'bg-gray-700 hover:bg-gray-600 border-gray-600/50' : 'bg-rose-600 hover:bg-rose-500 border-rose-500/50'}`}>
            <div className={`inline-flex items-center text-white transition-all duration-200`}>
                <Button onClick={toggleVideo} className='p-4 rounded-none h-full flex-1 shadow-none'>
                    {
                        videoEnabled ? <Video size={22} /> : <VideoOff size={22} />
                    }
                </Button>
            </div>

            <div className={`inline-flex items-center px-2 text-white transition-all duration-200 hover:bg-white/10 border-l border-gray-700/40`} onClick={()=>setShowDevices(prev=>!prev)}>
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
