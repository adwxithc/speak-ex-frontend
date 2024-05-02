
import Message from '../Message/Message'
import Avatar from '../../../ui/Avatar/Avatar'
import Button from '../../../ui/Button/Button'
import { MoveLeft } from 'lucide-react'
import { Dispatch, MouseEvent, MutableRefObject, SetStateAction, useEffect, useRef, useState } from 'react';
import {motion} from 'framer-motion'
import {IChatRoom, IMessage} from '../../../../types/database';
import { useGetMessagesQuery, useSendMessageMutation } from '../../../../redux/features/user/user/chatApiSlice';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../redux/store';
import { Socket } from 'socket.io-client';

interface ChatAreaProps{
    setCurrentChat: Dispatch<SetStateAction<IChatRoom | null>>;
    currentChat:IChatRoom;
    socket: MutableRefObject<Socket | null>

}
function ChatArea({setCurrentChat,currentChat,socket}:ChatAreaProps) {

    const { userData } = useSelector((state: RootState) => state.user)
    const [text, setText ] = useState('')
    const [messages, setMessages] = useState<IMessage[]>([])
    const [arrivalMessage, setArrivalMessage] = useState<IMessage | null>(null);
    const scrollRef = useRef<HTMLDivElement | null>(null)
     const isFirstRender = useRef(true);

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setText(e.target.value);
        // Set the textarea's height based on its content
        e.target.style.height = 'auto'; 
        e.target.style.height = e.target.scrollHeight < 150 ? `${e.target.scrollHeight}px` : '150px'; 
      };


      const {data,isLoading} =  useGetMessagesQuery({roomId:currentChat?.id})
      const [sendMessage]=useSendMessageMutation()
      
      useEffect(()=>{
        console.log('pani 1');
        
        setMessages(data?.data.messages ||[] as  IMessage[])
      },[data])

      useEffect(()=>{
        if(isFirstRender.current){
            
            setTimeout(()=>{
                if(!scrollRef?.current) return
                scrollRef.current.scrollIntoView({behavior:'smooth'})
            },500)
        }else{
            isFirstRender.current=false
            if(!scrollRef?.current) return
            scrollRef.current.scrollIntoView({behavior:'smooth'})
        }
        
      },[messages])

      useEffect(() => {
   
        socket.current?.on("getMessage", (data) => {
        
          setArrivalMessage({
            id:'',
            senderId: data.senderId,
            text: data.text ,
            createdAt: Date.now().toString(),
            updatedAt:Date.now().toString(),
            roomId:currentChat.id 
          });
        });
      }, [socket,currentChat]);

      useEffect(() => {
        arrivalMessage &&
          currentChat?.members.includes(arrivalMessage.senderId) &&
          setMessages((prev) => [...prev, arrivalMessage]);
      }, [arrivalMessage, currentChat]);
   
    const handleSend=async(e: MouseEvent<HTMLButtonElement, MouseEvent>)=>{
        e.preventDefault()
        try {

           
            const receiverId = currentChat.members.find(
                (member) => member !== userData?.id
              );
          
              socket.current?.emit("sendMessage", {
                senderId: userData?.id,
                receiverId,
                text: text,
              });

            const res = await sendMessage({roomId:currentChat?.id,messageData:{text,senderId:userData?.id}}).unwrap()
            console.log(res);
            
            setMessages(prev=>[...prev,res.data])
            setText('')
            
        } catch (error) {
            console.log(error);
        }
    }
    
if(isLoading) return <div>Loading..</div>
    
  return (

    
  
    <motion.div
    initial={{ x: '100vw' }}
    animate={{ x: 0 }}
    transition={{ type: 'spring', damping: 75,stiffness: 800 }}
     className="h-full flex flex-col">
    {/* top area */}
    <div className=" h-16 bg-[#152b52] text-white flex items-center ">
        <div className="flex gap-3 ml-5">
        <MoveLeft onClick={()=>{setCurrentChat(null);setMessages([])}} />
        <Avatar src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQuQo5Lw-BHj6ts6qC_vAlO1yblef_cVX8F1_sRgoAa6w&s" className="h-10 w-10" />
        <div className="flex flex-col">
        <span>Jone Doe</span>
        <span className="text-gray-200 text-sm">Online</span>
        </div>
        
        </div>
        
    </div>
   

        {/* chat */}
        <div className=" flex-1  overflow-y-scroll pretty-scrollbar bg-[#0e1c34]">
            {
                messages.map(msg=><div ref={scrollRef} key={msg.id}><Message createdAt={msg.createdAt} text={msg.text} user={currentChat.user} own={msg.senderId==userData?.id} /></div>)
            }
        
       
    </div>
    {/* bottom area */}
    <div className="py-3 flex border-t bg-[#11223e]">


    <div className='border-2 border-[#0e1c34] bg-[#152b52] w-full overflow-hidden px-5 mx-8 flex rounded-[35px]'>
    <textarea value={text} onChange={handleChange} className="resize-none pt-3 text-white  bg-inherit outline-none   w-full max-w-[900px] flex items-center pretty-scrollbar" placeholder="write something..."></textarea>
    <div className='flex items-center'>
    <Button className='drop-shadow-xl bg-primary active:bg-secondary' size={'md'} onClick={handleSend}>Send</Button>
    </div>
    
    </div>
    

        
    </div>

   
  
</motion.div>
  )
}

export default ChatArea
