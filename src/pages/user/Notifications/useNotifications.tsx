import { Dispatch, SetStateAction, useCallback, useEffect, useState } from "react"
import { useSocket } from "../../../context/SocketProvider"
import { useNavigate } from "react-router-dom"
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { useGetNotificationsQuery, useGetSingleNotificationMutation } from "../../../redux/features/user/notification/notificationApiSlice";
import { IBackendResponse } from "../../../types/queryResults";
import { INotificationDetails } from "../../../types/database";
import { addNewNotification, pushNotifications, setHasMore, setPage } from "../../../redux/features/user/notification/notificationSlice";


export interface INotification {
    message: string;
    sessionId: string;
}

function useNotifications({setOpenNotification}:{setOpenNotification: Dispatch<SetStateAction<boolean>>}) {

    // const [notifications, setNotification] = useState<INotification[]>([])
    const [openSessionOffer, setOpenSessionOffer] = useState(false)
    const [sessionId, setSessionId] = useState('')
   

   

    const { userData } = useSelector((state: RootState) => state.user)
    const { page,nextPage } = useSelector((state: RootState) => state.notification)

    const dispatch = useDispatch()
    const socket = useSocket()
    const navigate = useNavigate()


    const { data } = useGetNotificationsQuery({page:nextPage},{skip:page==nextPage});
    console.log(data);
    
    
    const [getSingleNotification]=useGetSingleNotificationMutation()
        
    useEffect(() => {
        const newNotifications = data?.data?.notifications as INotification[];
        
        
        if(!newNotifications) return
      
        dispatch(pushNotifications([...newNotifications]))
        dispatch(setPage(data?.data?.currentPage||0))
      
        dispatch(setHasMore(data?.data?.lastPage>data?.data?.currentPage))
        
    
    }, [data?.data?.currentPage, data?.data?.lasPage, data?.data.lastPage, data?.data?.notifications, dispatch])


    const notifyUser = useCallback(({ sessionId }: { sessionId: string }) => {
        setOpenSessionOffer(true)
        setSessionId(sessionId)
        // setNotification(prev => [...prev, { message: "Sesion available let's talk", sessionId }])
    }, [])

    const handleRejectOffer = () => {
        setOpenSessionOffer(false)
    }


    const handleJoinSession = useCallback(({ sessionId, allowed, message, startTime, isMonetized }: { sessionId: string, allowed: boolean, session: string, message: string, startTime: string, isMonetized: boolean }) => {

        if (allowed) {

            navigate(`/video-session/${sessionId}`, { state: { remoteUserId: '', audioEnabled: true, videoEnabled: true, startTime, isMonetized } })
        } else {
            toast.error(message, { position: 'top-right' })
            navigate(`/`)
        }
    }, [navigate])

    const handleClose=()=>{
        setOpenNotification(false)
    }

    const handleNewNotification=useCallback(async({notificationId}:{notificationId:string})=>{
        
        const notification = await getSingleNotification({notificationId}).unwrap() as IBackendResponse<INotificationDetails>
        if(notification.data)
        dispatch(addNewNotification(notification.data))
    },[dispatch, getSingleNotification])



    const sessionJoinReady = useCallback(() => {
        socket?.emit('session:join', { userId: userData?.id, sessionId })
    }, [sessionId, socket, userData?.id])

    useEffect(() => {

        socket?.on('session:available', notifyUser)
        socket?.on('session:join-allow', handleJoinSession)
        socket?.on('notification', handleNewNotification)

        return () => {

            socket?.off('session:available', notifyUser)
            socket?.off('session:join-allow', handleJoinSession)
            socket?.off('notification', handleNewNotification)

        }
    }, [handleJoinSession, handleNewNotification, notifyUser, socket])

    return {  handleJoinSession: sessionJoinReady, openSessionOffer, handleRejectOffer,handleClose }
}

export default useNotifications
