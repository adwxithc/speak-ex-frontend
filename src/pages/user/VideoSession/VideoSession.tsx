import { useEffect, useState } from "react";

import VideoCallChat from "./VideoCallChat"
import VideoChatArea from "./VideoChatArea"

interface IVideoSessionProps {
  localStream: MediaStream | null,
  remoteStream: MediaStream | null
}


export default function VideoSession({ localStream, remoteStream }: IVideoSessionProps) {

  const [isMobile, setIsMobile] = useState(true);
  const chating = false;

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setIsMobile(width <= 768); // Adjust breakpoint as needed
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);



  return (

    <div className="flex">

      {
        isMobile ? (
          chating ? (
            <div className="w-96 border-l dark:border-l-[#091220]">
              <VideoCallChat />
            </div>
          )
            : (
              <div className="flex-1">
                <VideoChatArea {...{ localStream, remoteStream }} />
              </div>
            )
        )
          : (
            <>
              <div className="flex-1">
                <VideoChatArea {...{ localStream, remoteStream }} />
              </div>

              <div className="w-96 border-l dark:border-l-[#091220]">
                <VideoCallChat />
              </div>
            </>
          )
      }
    </div>

  )

}

