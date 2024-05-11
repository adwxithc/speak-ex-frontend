import { useState } from "react"
import { useParams } from "react-router-dom"
import WaitForLearner from "./WaitForLearner"
import VideoSession from "./VideoSession"
import { useSelector } from "react-redux"
import { RootState } from "../../../redux/store"


function VideoSessionTest() {
    const {userType='learner'} = useParams()
    const {userData} =useSelector((state:RootState)=>state.user)

    const [remoteStream,setRemoteStream] = useState<MediaStream|null>(null)
    const [localStream, setLocalStream] =  useState<MediaStream|null>(null)
    console.log(userType,remoteStream);
    
  return (
    <>
    {userType==='helper' && !remoteStream
    ?<>
    <WaitForLearner  />
    </>
    :userType==='learner' && !remoteStream?
    <></>
    :<VideoSession />
    }
    
    </>
  )
}

export default VideoSessionTest
