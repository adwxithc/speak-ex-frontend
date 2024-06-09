
import Button from "../../ui/button/Button"
import useTimer from "../../../hooks/useTimer"
import { useEffect } from "react"


interface ISesionOfferProps{
    handleJoinSession: () => void
    handleRejectOffer: () => void
}
function SessionOffer({handleJoinSession, handleRejectOffer}:ISesionOfferProps) {
    const {seconds}= useTimer({duration:10,startTime:Date.now()})
    useEffect(()=>{
        if(seconds==0){
            handleRejectOffer()
        }
    },[handleRejectOffer, seconds])
    
  return (
    <div className="w-[50vw] md:w-[25vw] p-3">
      <div>
        <h2 className="text-center font-semibold text-lg ">A learning session is available..!{seconds}</h2>
        <div className="flex justify-center ">
        <iframe className="" src="https://lottie.host/embed/dc963719-3bf5-4328-9d60-6fe3e04ec2ef/h7AHaG7jHC.json"></iframe>
        </div>
       

        <div className="flex justify-center ">
            <Button onClick={handleJoinSession} varient={'primary'} size={'md'} >Join</Button>
            <Button onClick={handleRejectOffer} varient={'primary-outline'} size={'md'} >Cancel</Button>
        </div>
        
        
      </div>
    </div>
  )
}

export default SessionOffer
