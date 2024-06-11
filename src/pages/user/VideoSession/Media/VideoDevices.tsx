import { useEffect, useState } from 'react'

function VideoDevices({changeVideoDevice}:{changeVideoDevice: (deviceId: string) => Promise<void>}) {

    const [videoDevices, setVideoDevices] = useState<MediaDeviceInfo[]>([])

    useEffect(() => {

        const getVideoDivices = async () => {
            const devices = await navigator.mediaDevices.enumerateDevices()
            const videoDevices = devices.filter(d => d.kind === "videoinput");
            setVideoDevices(videoDevices)

        }
        getVideoDivices()

    }, [])

   

    return (
        <ul className='inline-flex flex-col  shadow-md p-1 rounded-md text-xs font-semibold bg-white text-black/70 absolute -top-10 max-h-20 pretty-scrollbar overflow-y-auto '>
            {videoDevices.map((device, index) => (<li onClick={()=>changeVideoDevice(device.deviceId)} className='hover:bg-black/10 cursor-pointer rounded-md p-1' key={index} value={device.deviceId}>{device.label}</li>))
            }
            
        </ul>
    )
}

export default VideoDevices
