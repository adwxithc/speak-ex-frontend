import { useCallback, useEffect, useState } from 'react'
import { useSocket } from '../context/SocketProvider'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../redux/store'
import { useNavigate } from 'react-router-dom'
import { setOpenCompleteProfileModal } from '../redux/features/user/user/userSlice'

function useHandleSession() {
    const { userData } = useSelector((state: RootState) => state.user)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)
    const socket = useSocket()

    const handleStartSession = useCallback(() => {
        if(userData?.proficientLanguage?.length===0){
            dispatch(setOpenCompleteProfileModal())
            return 
        }
        setLoading(true)

        socket?.emit('session:start', { userId: userData?.id })

        
    }, [dispatch, socket, userData?.id, userData?.proficientLanguage?.length])

    const handleJoinSession = useCallback(({ sessionId }: { sessionId: string }) => {
        setLoading(false)
        navigate(`/video-session/session-wait/${sessionId}`)
    }, [navigate])

    useEffect(() => {
        socket?.on('session:started', handleJoinSession)

        return () => {
            socket?.off('session:started', handleJoinSession)
        }
    }, [handleJoinSession, socket])

    return {
        handleStartSession,
        loading
    }

}

export default useHandleSession
