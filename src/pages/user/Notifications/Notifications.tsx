import { useSelector } from "react-redux"
import Button from "../../../components/ui/Button/Button"
import { useSocket } from "../../../context/SocketProvider"
import { RootState } from "../../../redux/store"
import { useCallback, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

function Notifications() {
    const {userData} =useSelector((state:RootState)=>state.user)
    const [sessionId,setSessionId ] =  useState('')
    const socket = useSocket()
    const navigate = useNavigate()

    const handleJoinSession=useCallback(({sessionId}:{sessionId:string})=>{
        navigate(`video-session/${sessionId}`)
    },[navigate])
    

    useEffect(()=>{
        socket?.on('session:join-allow',handleJoinSession)

        return ()=>{
            socket?.off('session:join-allow',handleJoinSession)
        }
    },[handleJoinSession, socket])
    const handleClick=()=>{
        socket?.emit('session:join',{userId:userData?.id, sessionId})

    }
  return (
    <div className='h-full w-full'>
        <div className='bg-secondary rounded-md p-3 mx-2 my-2'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus consectetur aliquor adipisci cupiditate fuga earum fugit? Rerum, minus!
        </div>
        <div className='bg-secondary rounded-md p-3 mx-2 my-2'>
            Lorem ipsum dolor sit amet consectetur adipisicing 
        </div>
        <div className='bg-secondary rounded-md p-3 mx-2 my-2'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus consectetur aliquam maiores molestias expedita quaerat sed, nulla cumque quae totam qui quis dolor adipisci cupiditate fuga earum fugit? Rerum, minus!
        </div>
        <div className='bg-secondary rounded-md p-3 mx-2 my-2'>
            Lorem ipsum dolor sit amet cons
            <input value={sessionId} onChange={(e)=>setSessionId(e.target.value)} type="text" />
            <Button onClick={handleClick}>Join</Button>
        </div>

       


      
    </div>
  )
}

export default Notifications
