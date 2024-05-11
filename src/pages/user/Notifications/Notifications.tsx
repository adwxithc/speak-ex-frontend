import Button from "../../../components/ui/Button/Button"
import { INotification } from "./useNotifications"

interface INotificationsProps{
    notifications:INotification[];
    handleJoinSession: ({ sessionId }: {sessionId: string;}) => void
}

function Notifications({notifications,handleJoinSession}:INotificationsProps) {

    


  return (
    <div className='h-full w-full'>
        
        {
            notifications.map(noti=>(
                <div key={noti.sessionId} className="p-3 bg-secondary w-full mx-3 rounded-md mt-5">
                    <span>{noti.message}</span>
                    
                    <Button onClick={()=>handleJoinSession({sessionId:noti.sessionId})}  varient={'primary'} size={'sm'}>Join</Button>
                </div>
            ))
        }
    </div>
  )
}

export default Notifications
