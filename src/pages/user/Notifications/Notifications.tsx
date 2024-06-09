import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { useCallback, useRef } from "react";

import Avatar from "../../../components/ui/avatar/Avatar";
import { RootState } from "../../../redux/store";
import { setNextPage } from "../../../redux/features/user/notification/notificationSlice";


function Notifications() {
    const { notifications, hasMore } = useSelector((state: RootState) => state.notification)
    const dispatch = useDispatch()

    const observer = useRef<IntersectionObserver | null>(null)

    const lastMessageRef = useCallback((node: HTMLDivElement | null) => {
        if (observer.current) observer.current.disconnect()
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasMore) {
                dispatch(setNextPage())
            }
        })
        if (node) observer.current.observe(node)
    }, [dispatch, hasMore])



    return (
        <div className='h-full w-full pt-5'>


            {
                notifications &&
                notifications.map((n, index) => (
                    <div key={n.id} className="flex  gap-2 border-b py-3" ref={index == notifications.length - 1 ? lastMessageRef : null}>

                        <Avatar src={n.actionCreatorInfo.profile} className="h-10 w-10" />


                        <div className="text-sm  font-medium flex flex-col justify-between  w-full ">
                            <div className="flex justify-between ">
                                <span className="text-black/90 font-semibold capitalize">{n.actionCreatorInfo.firstName + ' ' + n.actionCreatorInfo.lastName}</span>
                                {
                                    !n.read && <span className="h-2 w-2 rounded-full bg-green-500/70"></span>
                                }
                            </div>

                            <div className="flex flex-wrap gap-0.5">
                                <p className="">{n.title} </p>
                                <p className="text-xs text-black/60">{n.message}</p>
                                <span className="text-xs text-black/80 ml-1">{moment(n.createdAt).format('MMM D, YYYY')}</span>
                            </div>
                        </div>

                    </div>
                ))
            }



        </div>
    )
}

export default Notifications
