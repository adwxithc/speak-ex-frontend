import { useEffect, useState } from "react";
import VideoCallChat from "./VideoCallChat"
import VideoChatArea from "./VideoChatArea"



export default function VideoSession() {
  const [isMobile, setIsMobile] = useState(true);
  const [chating, setChating] = useState(false);

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
        isMobile?(
          chating?(
            <div className="w-96 border-l dark:border-l-[#091220]">
              <VideoCallChat />
            </div>
          )
          :(
            <div className="flex-1">
              <VideoChatArea />
            </div>
          )
        )
        :(
          <>
          <div className="flex-1">
            <VideoChatArea />
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

