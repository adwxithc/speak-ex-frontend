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
        <ul className='inline-flex flex-col shadow-2xl p-2 rounded-xl text-sm font-semibold bg-gray-800 text-white absolute -top-12 max-h-32 pretty-scrollbar overflow-y-auto border border-gray-600/60 backdrop-blur-2xl z-10'>
            {videoDevices.map((device, index) => (<li onClick={()=>changeVideoDevice(device.deviceId)} className='hover:bg-indigo-600 cursor-pointer rounded-lg px-3 py-2 transition-all duration-200 whitespace-nowrap' key={index} value={device.deviceId}>{device.label}</li>))
            }
            
        </ul>
    )
}

export default VideoDevices
