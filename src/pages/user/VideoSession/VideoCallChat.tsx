
import { SendHorizontal } from 'lucide-react'
import Message from '../../../components/custom/Chat/Message/Message'
import Avatar from '../../../components/ui/Avatar/Avatar'
import { useState } from 'react'
import { IMessage } from '../../../types/database'

function VideoCallChat() {
  const [messages, setMessages] = useState<IMessage[]>([])
  return (
    <div className="h-screen   flex flex-col ">
    {/* top area */}
    <div className="h-16 bg-white dark:bg-[#0e1c34] flex items-center ">

        <div className="flex  dark:text-white items-center  gap-3 bg-[#0000001b] dark:bg-[#ffffff1f] px-3 py-1  rounded-full w2/3 overflow-hidden ml-3">
            <Avatar src="https://www.profilebakery.com/wp-content/uploads/2023/04/AI-Profile-Picture.jpg" className="h-8 w-8" />
            <div className="flex flex-col">
            <span >Adwaith C</span>
            <span className="text-xs text-gray-800 dark:text-gray-300   truncate">adwaithjanardhanano@gmai.com</span>
            </div>
            
        </div>
    </div>
    {/* chat area */}
    <div className="flex-1 bg-[#ebeaea] flex flex-col dark:bg-[#0F2440]">

        <div className='flex-1'>
          {
            messages.map(msg=>(<Message user={msg.} message={{createdAt:'',text:'hi',senderId:'',id:'',roomId:'',seen:true,updatedAt:''}} />))

          }
        <Message user={{profile:'',userName:''}} message={{createdAt:'',text:'hi',senderId:'',id:'',roomId:'',seen:true,updatedAt:''}} />
        <Message user={{profile:'',userName:''}} message={{createdAt:'',text:'hello i am adwait c ',senderId:'',id:'',roomId:'',seen:true,updatedAt:''}} />
        <Message user={{profile:'',userName:''}} message={{createdAt:'',text:'how are you doing',senderId:'',id:'',roomId:'',seen:true,updatedAt:''}} />
        <Message user={{profile:'',userName:''}} message={{createdAt:'',text:'it is nice to meet you',senderId:'',id:'',roomId:'',seen:true,updatedAt:''}} />
        </div>

        <div className='p-2'>

            <div className='flex bg-white dark:bg-[#152B52] rounded-xl items-center overflow-hidden mx-2'>
            <textarea placeholder='type something..' className='w-full  pl-3 pt-2 resize-none bg-inherit outline-none pretty-scrollbar' name="" id=""></textarea>
            <SendHorizontal className='mr-3 dark:text-white'  />
            </div>
            
        </div>


    </div>
    {/* bottom area */}
    <div className="h-20 bg-white  dark:bg-[#0e1c34]" ></div>
    </div>
  )
}

export default VideoCallChat
