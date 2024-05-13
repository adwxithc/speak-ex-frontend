import { useCallback, useEffect, useState } from "react"
import { useSocket } from "../../../context/SocketProvider"
import { useNavigate } from "react-router-dom"
import toast from "react-hot-toast"

export interface INotification {
    message: string;
    sessionId: string;
}

function useNotifications() {

    const [notifications, setNotification] = useState<INotification[]>([])

    const socket = useSocket()
    const navigate = useNavigate()



    const handleJoinSession = useCallback(({ sessionId }: { sessionId: string }) => {
        // socket?.emit('session:join',{userId:userData?.id, sessionId})
        navigate(`/video-session/join/${sessionId}`)

    }, [navigate])

    const handleEnterSession = useCallback(({ sessionId, allowed }: { sessionId: string, allowed: boolean, session: string }) => {
        if (allowed) {
            navigate(`/video-session/join/${sessionId}`)
        } else {
            toast.error('session is already occupied', { position: 'top-right' })
        }

    }, [navigate])

    const notifyUser = useCallback(({ sessionId }: { sessionId: string }) => {
        setNotification(prev => [...prev, { message: "Sesion available let's talk", sessionId }])
    }, [])

    useEffect(() => {

        socket?.on('session:available', notifyUser)
        // socket?.on('session:join-allow',handleEnterSession)

        return () => {
            // socket?.off('session:join-allow',handleEnterSession)
            socket?.off('session:available', notifyUser)

        }
    }, [handleEnterSession, handleJoinSession, notifyUser, socket])

    return { notifications, handleJoinSession }
}

export default useNotifications
