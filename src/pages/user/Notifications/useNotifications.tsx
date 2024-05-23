import { useCallback, useEffect, useState } from "react"
import { useSocket } from "../../../context/SocketProvider"
import { useNavigate } from "react-router-dom"
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";


export interface INotification {
    message: string;
    sessionId: string;
}

function useNotifications() {

    const [notifications, setNotification] = useState<INotification[]>([])
    const [openSessionOffer, setOpenSessionOffer] =  useState(false)
    const [sessionId, setSessionId] = useState('')
    const { userData } = useSelector((state: RootState) => state.user)
    const socket = useSocket()
    const navigate = useNavigate()



    const notifyUser = useCallback(({ sessionId }: { sessionId: string }) => {
        setOpenSessionOffer(true)
        setSessionId(sessionId)
        setNotification(prev => [...prev, { message: "Sesion available let's talk", sessionId }])
    }, [])

    const handleRejectOffer = ()=>{
        setOpenSessionOffer(false)
    }

    // const handleJoinSession1 = useCallback(({ sessionId }: { sessionId: string }) => {
       
    //     navigate(`/video-session/join/${sessionId}`)

    // }, [navigate])

    const handleJoinSession = useCallback(({ sessionId, allowed, message }: { sessionId: string, allowed: boolean, session: string, message:string }) => {

        if (allowed) {

            navigate(`/video-session/${sessionId}`, { state: { remoteUserId: '', audioEnabled:true, videoEnabled:true} })
        } else {
            toast.error(message, { position: 'top-right' })
            navigate(`/`)
        }
    }, [navigate])



    const sessionJoinReady = useCallback(() => {
        socket?.emit('session:join', { userId: userData?.id, sessionId })
    }, [sessionId, socket, userData?.id])

    useEffect(() => {

        socket?.on('session:available', notifyUser)
        socket?.on('session:join-allow', handleJoinSession)

        return () => {
         
            socket?.off('session:available', notifyUser)
            socket?.off('session:join-allow', handleJoinSession)

        }
    }, [ handleJoinSession, notifyUser, socket])

    return { notifications, handleJoinSession:sessionJoinReady, openSessionOffer, handleRejectOffer }
}

export default useNotifications
