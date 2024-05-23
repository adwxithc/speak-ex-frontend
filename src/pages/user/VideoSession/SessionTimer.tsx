import { useCallback, useEffect, useState } from "react";

function SessionTimer({startTime}:{startTime:number}) {

    const [formatedDuration, setFormatedDuration] = useState('00:00:00');

    const formatTime = useCallback((timeInSeconds:number) => {
        const hours = Math.floor(timeInSeconds / 3600);
        const minutes = Math.floor((timeInSeconds % 3600) / 60);
        const seconds = timeInSeconds % 60;
    
        return `${hours.toString().padStart(2, "0")}:${minutes
          .toString()
          .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
      },[]);

      useEffect(() => {
      
        const interval = setInterval(() => {
          const currentTime =  Date.now();
          const elapsed = Math.floor((currentTime - startTime) / 1000);
          // Calculate elapsed seconds
          setFormatedDuration(formatTime(elapsed));
        }, 1000);
    
        // Cleanup the interval on component unmount
        return () => clearInterval(interval);
      }, [formatTime, startTime]);
  return (
    
        <span className="text-white">{formatedDuration}</span>
      
   
  )
}

export default SessionTimer
