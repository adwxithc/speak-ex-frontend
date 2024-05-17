
import { SendHorizontal } from 'lucide-react'
import Message from '../../../components/custom/Chat/Message/Message'
import Avatar from '../../../components/ui/Avatar/Avatar'
import { useEffect, useState } from 'react'
import IUser, { IMessage } from '../../../types/database'
import { useSelector } from 'react-redux'
import { RootState } from '../../../redux/store'
import Button from '../../../components/ui/Button/Button'
import { useSocket } from '../../../context/SocketProvider'

interface IVideoCallChatProps{
  remoteUser:Required<IUser>|null
}

function VideoCallChat({remoteUser}:IVideoCallChatProps) {
  const [messages, setMessages] = useState<IMessage[]>([])
  const [text, setText] = useState('')
  const { userData } = useSelector((state: RootState) => state.user)
  const socket  = useSocket()
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
    // Set the textarea's height based on its content
    e.target.style.height = 'auto';
    e.target.style.height = e.target.scrollHeight < 150 ? `${e.target.scrollHeight}px` : '150px';
};

const handleSend = async () => {

  if (!text || !remoteUser) return
      const receiverId = remoteUser.id
    
      socket?.emit("sendMessage", {
          senderId: userData?.id,
          receiverId,
          text: text,
      });
      const newMessage ={
        id: '',
        senderId:userData?.id as string,
        text,
        createdAt: new Date().toString(),
        updatedAt: new Date().toString(),
        seen: true,
        roomId:''
    }
      setMessages(prev => [...prev, newMessage])
      setText('')

}

useEffect(() => {

  socket?.on("getMessage", (data) => {
      alert('got message')
      const newMessage ={
          id: '',
          senderId: data.senderId,
          text: data.text,
          createdAt: new Date().toString(),
          updatedAt: new Date().toString(),
          seen: true,
          roomId:''
      }
      setMessages((prev) => [...prev, newMessage]);
  });

 
}, [socket]);


  if(!remoteUser) return <div className='h-screen w-full bg-gray-800'></div>
  return (
    <div className="h-screen   flex flex-col ">
    {/* top area */}
    <div className="h-16 bg-white dark:bg-[#0e1c34] flex items-center ">

        <div className="flex  dark:text-white items-center  gap-3 bg-[#0000001b] dark:bg-[#ffffff1f] px-3 py-1  rounded-full w2/3 overflow-hidden ml-3">
            <Avatar src={userData?.profile} className="h-8 w-8" />
            <div className="flex flex-col">
            <span >{userData?.firstName+' '+userData?.lastName}</span>
            <span className="text-xs text-gray-800 dark:text-gray-300   truncate">{userData?.email}</span>
            </div>
            
        </div>
    </div>
    {/* chat area */}
    <div className="flex-1 bg-[#ebeaea] flex flex-col dark:bg-[#0F2440]">

        <div className='flex-1'>
          {
            messages.map(msg=>(<Message user={remoteUser} message={msg} />))

          }
     
        </div>

        <div className='p-2'>

            <div className='flex bg-white dark:bg-[#152B52] rounded-xl items-center overflow-hidden mx-2'>
            <textarea onChange={handleChange} value={text} placeholder='type something..' className='w-full text-white pl-3 py-2 resize-none bg-inherit outline-none pretty-scrollbar' name="" id=""></textarea>
            <Button onClick={handleSend} className='mr-3 dark:text-white mt-auto mb-5'><SendHorizontal   /></Button>
            
            </div>
            
        </div>


    </div>
    {/* bottom area */}
    <div className="h-20 bg-white  dark:bg-[#0e1c34]" ></div>
    </div>
  )
}

export default VideoCallChat
