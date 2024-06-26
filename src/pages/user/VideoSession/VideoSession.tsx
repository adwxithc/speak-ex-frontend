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


}


export default function VideoSession({ remoteStream, remoteUser, handleSendMessage, messages, startTime }: IVideoSessionProps) {

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

    <div className="flex h-screen bg-[#222222]">
      <AnimatePresence
        initial={false}
        mode="wait"
      >

        {
          isMobile ? (
            chating ? (
              <div className="w-full  h-full">
                <LiveChat {...{ remoteUser, messages, handleSendMessage, setChating }} />
              </div>
            )
              : (
                <div className="flex-1 h-full">
                  <VideoCallArea {...{ remoteStream, setChating, remoteUser, startTime }} />
                </div>
              )
          )
            : (
              <>
                <div className="flex-1 h-full">
                  <VideoCallArea {...{ remoteStream, setChating, remoteUser, startTime }} />
                </div>

                <div className="w-96 h-full">
                  <LiveChat {...{ remoteUser, messages, handleSendMessage, setChating }} />
                </div>
              </>
            )
        }
      </AnimatePresence>
    </div>

  )

}

