import { useSelector } from "react-redux"
import Avatar from "../../../ui/Avatar/Avatar"
import { RootState } from "../../../../redux/store"
import moment from 'moment'

interface MessageProps{
    own?:boolean,
    user:{userName:string, profile:string},
    text:string;
    createdAt:string
}

function Message({own,user,text,createdAt}:MessageProps) {
    const { userData } = useSelector((state: RootState) => state.user)
 return (
    <div className={`flex ${own && ' justify-end'} mt-4 w-[95%] mx-auto`}>
        <div >
        <div className={`flex gap-2`}>
            <Avatar src={own?userData?.profile:user.profile || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQuQo5Lw-BHj6ts6qC_vAlO1yblef_cVX8F1_sRgoAa6w&s"} className={`h-8 w-8 ${own && 'order-2'}`} />
            <div>
            <div className={`p-3 text-sm ${own ?'bg-secondary':'bg-primary text-white'} rounded-b-xl ${own ?'rounded-tl-xl':'rounded-tr-xl'} max-w-96 mt-3`}>
                <span className="leading-relaxed">{text}</span>
            </div>
            <div className={`flex  ${own&&'justify-end'}`}>
            <span className={`text-gray-400 text-xs`} >{moment(createdAt).fromNow()}</span>
            </div>
            
            </div>
           
        </div>
       
        
        </div>
        
       
    </div>
 )
}

export default Message
