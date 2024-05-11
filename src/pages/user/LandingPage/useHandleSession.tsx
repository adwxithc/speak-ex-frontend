import  { useCallback, useEffect, useState } from 'react'
import { useSocket } from '../../../context/SocketProvider'
import { useSelector } from 'react-redux'
import { RootState } from '../../../redux/store'
import { useNavigate } from 'react-router-dom'

function useHandleSession() {
    const {userData} =useSelector((state:RootState)=>state.user)
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const socket = useSocket()

    const handleStartSession = useCallback(()=>{
       
        setLoading(true)
  
        socket?.emit('session:start',{userId:userData?.id})

        setLoading(false)
    },[socket, userData?.id])

    const handleJoinSession=useCallback(({sessionId}:{sessionId:string})=>{
        navigate(`video-session/session-wait/${sessionId}`)
    },[navigate])

    useEffect(()=>{
        socket?.on('session:started',handleJoinSession)

        return ()=>{
            socket?.off('session:started',handleJoinSession)
        }
    },[handleJoinSession, socket])

  return {
    handleStartSession,
    loading
  }
  
}

export default useHandleSession
