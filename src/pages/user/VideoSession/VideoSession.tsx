import { useEffect, useState } from "react";

import VideoCallChat from "./VideoCallChat"
import VideoChatArea from "./VideoChatArea"
import IUser from "../../../types/database";

interface IVideoSessionProps {
  localStream: MediaStream | null,
  remoteStream: MediaStream | null,
  role:string
  remoteUser:Required<IUser>|null
}


export default function VideoSession({ localStream, remoteStream, role, remoteUser }: IVideoSessionProps) {

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
              <VideoCallChat {...{remoteUser}} />
            </div>
          )
            : (
              <div className="flex-1">
                <VideoChatArea {...{ localStream, remoteStream,role }} />
              </div>
            )
        )
          : (
            <>
              <div className="flex-1">
                <VideoChatArea {...{ localStream, remoteStream,role }} />
              </div>

              <div className="w-96 border-l dark:border-l-[#091220]">
                <VideoCallChat {...{remoteUser}} />
              </div>
            </>
          )
      }
    </div>

  )

}

