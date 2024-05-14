import { useEffect, useState } from "react";


function useTimer({ startTime,duration }:{startTime:number,duration:number}) {
  
    const initialSeconds = Math.max(duration -  Math.floor((Date.now()-startTime) / 1000),0) ;

    const [seconds, setSeconds] = useState(initialSeconds);
  
    useEffect(() => {
      const interval = setInterval(() => {
        if (seconds === 0) {
          clearInterval(interval);
          console.log("Time's up!");
        } else {
          setSeconds(prevSeconds => prevSeconds - 1);
        }
      }, 1000);
  
      return () => clearInterval(interval);
    }, [seconds]);
  
    return {seconds}
}

export default useTimer
