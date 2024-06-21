import { Dispatch, SetStateAction, useCallback, useEffect, useState } from "react"
import { useSocket } from "../../../context/SocketProvider"
import { useNavigate } from "react-router-dom"
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { useGetNotificationsQuery, useGetSingleNotificationMutation, useMarkAsReadMutation } from "../../../redux/features/user/notification/notificationApiSlice";
import { IBackendResponse } from "../../../types/queryResults";
import { INotificationDetails } from "../../../types/database";
import { addNewNotification, pushNotifications, setHasMore, setNotifications, setPage, setUnreadedNotificationCount } from "../../../redux/features/user/notification/notificationSlice";
import { setSession } from "../../../redux/features/user/session/sessionSlice";
import getPeerConnection from "../../../webRTC/peer";


export interface INotification {
    message: string;
    sessionId: string;
}

function useNotifications({ setOpenNotification }: { setOpenNotification: Dispatch<SetStateAction<boolean>> }) {


    const [openSessionOffer, setOpenSessionOffer] = useState(false)
    const [sessionId, setSessionId] = useState('')


    const { userData, isAuth } = useSelector((state: RootState) => state.user)
    const { page, nextPage, notifications, unreadedNotifications } = useSelector((state: RootState) => state.notification)
    const [markAsRead] = useMarkAsReadMutation()

    const dispatch = useDispatch()
    const socket = useSocket()
    const navigate = useNavigate()


    const { data } = useGetNotificationsQuery({ page: nextPage }, { skip: page == nextPage || !isAuth });


    const [getSingleNotification] = useGetSingleNotificationMutation()

    useEffect(() => {
        const newNotifications = data?.data?.notifications as INotification[];


        if (!newNotifications) return

        dispatch(pushNotifications([...newNotifications]))
        dispatch(setPage(data?.data?.currentPage || 0))
        dispatch(setUnreadedNotificationCount(data?.data?.totalUnReadedNotifications || 0))
        dispatch(setHasMore(data?.data?.lastPage > data?.data?.currentPage))


    }, [data?.data?.currentPage, data?.data.lasPage, data?.data?.lastPage, data?.data?.notifications, data?.data?.totalUnReadedNotifications, dispatch])


    const notifyUser = useCallback(({ sessionId }: { sessionId: string }) => {
        setOpenSessionOffer(true)
        setSessionId(sessionId)

    }, [])

    const handleRejectOffer = () => {
        setOpenSessionOffer(false)
    }


    const handleJoinSession = useCallback(async ({ sessionId, allowed, message, startTime, isMonetized, offer, remoteUserId }: { sessionId: string, allowed: boolean, session: string, message: string, startTime: string, isMonetized: boolean, offer: RTCSessionDescriptionInit, remoteUserId: string }) => {

        if (allowed) {
            const peer = getPeerConnection()

            const stream = await navigator.mediaDevices.getUserMedia({
                audio: true,
                video: true
            });
            await peer.getAnswer(offer)

            dispatch(setSession({ remoteUserId }))
            for (const track of stream.getTracks()) {
                peer.addTrack(track, stream);
            }

            navigate(`/video-session/${sessionId}`, { state: { remoteUserId, audioEnabled: true, videoEnabled: true, startTime, type: 'learner', isMonetized } })
        } else {
            toast.error(message, { position: 'top-right' })
            navigate(`/`)
        }
    }, [dispatch, navigate])

    const handleClose = async () => {
        setOpenNotification(false)
        if (notifications?.length == 0) return

        const updatedNotifications = notifications?.map(n => ({ ...n, read: true }))
        dispatch(setNotifications(updatedNotifications))
        dispatch(setUnreadedNotificationCount(0))
        const notificationIds = notifications?.map(n => n.id)
        await markAsRead({ notificationIds }).unwrap()


    }

    const handleNewNotification = useCallback(async ({ notificationId }: { notificationId: string }) => {

        const notification = await getSingleNotification({ notificationId }).unwrap() as IBackendResponse<INotificationDetails>
        if (notification.data) {
            dispatch(addNewNotification(notification.data))
            dispatch(setUnreadedNotificationCount(unreadedNotifications + 1))
        }

    }, [dispatch, getSingleNotification, unreadedNotifications])



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

    return { handleJoinSession: sessionJoinReady, openSessionOffer, handleRejectOffer, handleClose }
}

export default useNotifications
