import { useEffect, useState } from "react";

import LiveChat from "./LiveChat/LiveChat"
import VideoCallArea from "./VideoCallArea/VideoCallArea"
import IUser, { IMessage } from "../../../types/database";
import { AnimatePresence } from "framer-motion";

interface IVideoSessionProps {

  remoteStream: MediaStream | null,
  remoteUser: Required<IUser> | null
  messages: IMessage[],
  handleSendMessage: (text: string, cb: () => void) => Promise<void>
  startTime: number;
  changeVideoDevice: (deviceId: string) => Promise<void>

}


export default function VideoSession({ remoteStream, remoteUser, handleSendMessage, messages, startTime, changeVideoDevice }: IVideoSessionProps) {

  const [isMobile, setIsMobile] = useState(true);
  const [chating, setChating] = useState(false)


  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setIsMobile(width <= 800); // Adjust breakpoint as needed
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);



  return (

    <div className="flex bg-[#0e1c34]">
      <AnimatePresence
        initial={false}
        mode="wait"
      >

        {
          isMobile ? (
            chating ? (
              <div className="w-full border-l dark:border-l-[#091220]">
                <LiveChat {...{ remoteUser, messages, handleSendMessage, setChating }} />
              </div>
            )
              : (
                <div className="flex-1">
                  <VideoCallArea {...{ remoteStream, setChating, remoteUser, startTime, changeVideoDevice }} />
                </div>
              )
          )
            : (
              <>
                <div className="flex-1">
                  <VideoCallArea {...{ remoteStream, setChating, remoteUser, startTime, changeVideoDevice }} />
                </div>

                <div className="w-96 border-l dark:border-l-[#091220]">
                  <LiveChat {...{ remoteUser, messages, handleSendMessage, setChating }} />
                </div>
              </>
            )
        }
      </AnimatePresence>
    </div>

  )

}

