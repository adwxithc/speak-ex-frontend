import { useSelector } from "react-redux"
import Avatar from "../../../ui/avatar/Avatar"
import { RootState } from "../../../../redux/store"
import moment from 'moment'
import { IMessage } from "../../../../types/database";
import { CheckCheck } from "lucide-react";

interface MessageProps{
    user:{userName:string, profile:string},
    message:IMessage
}

function Message({user,message}:MessageProps) {
    const { userData } = useSelector((state: RootState) => state.user)
    const own= message.senderId==userData?.id
 return (
    <div className={`flex ${own && ' justify-end'} mt-4 w-[95%] mx-auto`}>
        <div >
        <div className={`flex gap-2`}>
            <Avatar src={own?userData?.profile:user.profile || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQuQo5Lw-BHj6ts6qC_vAlO1yblef_cVX8F1_sRgoAa6w&s"} className={`h-8 w-8 ${own && 'order-2'}`} />
            <div>
            <div className={`p-2 px-3 text-sm ${own ?'bg-secondary':'bg-primary text-white'} rounded-b-xl ${own ?'rounded-tl-xl':'rounded-tr-xl'} max-w-96 mt-2`}>
                <span className="leading-relaxed">{message.text}</span>

                <div className={`flex justify-end items-center`}>
                <span className={`text-gray-400 text-xs`} >{moment(new Date(message.createdAt.toString())).fromNow()} </span>
                {own && message.seen && <CheckCheck className="ml-2" size={15} color="blue" />}
                </div>

            </div>
         
           
            </div>
           
           
        </div>
        
        
        </div>
  
    </div>
 )
}

export default Message
