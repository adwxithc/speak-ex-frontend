import { useEffect, useRef, useState } from "react";
import ChatArea from "../../../components/custom/Chat/ChatArea/ChatArea"
import Conversations from '../../../components/custom/Chat/Conversations/Conversations'
import { useGetChatRoomsQuery } from "../../../redux/features/user/user/chatApiSlice";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { IChatRoom } from "../../../types/database";
import { Socket } from 'socket.io-client';
import { useSocket } from "../../../context/SocketProvider";
import { useLocation } from "react-router-dom";


function Chat() {
  const { userData } = useSelector((state: RootState) => state.user)
  const location = useLocation();
  const [isMobile, setIsMobile] = useState(true);


  const [conversations, setConversations] = useState<IChatRoom[]>([])
  const [directedRoom,setDirectedRoom] = useState(location?.state?.roomId||'')
  
  const [currentChat, setCurrentChat] = useState<IChatRoom | null>(null)
  const [onlineUsers, setOnlineUsers] = useState<{ userId: string, socketId: string }[]>([])
  const [page, setPage] = useState(1)
  const [key, setKey] = useState('')

  const socket = useRef<Socket | null>(null)
  socket.current = useSocket()
  const { data, isLoading } = useGetChatRoomsQuery({ userId: userData?.id, key });

  useEffect(() => {
    setConversations([...data?.data as IChatRoom[] || []])
    if(directedRoom){
      const room = data?.data.find((room:IChatRoom) => room.id === directedRoom)
      if(room){
        setCurrentChat(room)
        setDirectedRoom('')
      }
    }
  }, [data, directedRoom])

  



  useEffect(() => {

    socket.current?.emit('addUser', {
      userId: userData?.id
    })
    socket.current?.on('getUsers', (data) => {
      setOnlineUsers(data);

    })

    socket.current?.on("getMessage", (data) => {


      setConversations(prev => {
        const updatedConv = prev.find(c => c.otherUserId == data.senderId)
        if (!updatedConv || currentChat && currentChat.id == data.roomId) return prev

        return prev.map(c => {
          if (c.id == updatedConv.id && currentChat?.id !== updatedConv.id) {


            const unseenMessageCount = c.unseenMessageCount + 1;
            const lastMessage = { text: data.text, createdAt: new Date().toISOString(), senderId: data.senderId }
            return { ...c, unseenMessageCount, lastMessage }
          }
          return c
        })
      })
    })


    setConversations(prev => {
      return prev.map(c => {
        if (currentChat?.id == c.id) {
          const unseenMessageCount = 0;

          return { ...c, unseenMessageCount }
        }
        return c
      })
    })


  }, [currentChat, userData])

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setIsMobile(width <= 768); // Adjust breakpoint as needed
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);




  return (
    <>

      <div className="h-screen overflow-y-hidde  bg-[#11223e]">
        <div className="flex h-full">

          {
            isMobile ? (
              currentChat ?
                (<div className=" w-full h-full "> <ChatArea {...{ setCurrentChat, currentChat, socket, onlineUsers, setPage, page }} /></div>)
                : (<div className="w-full">{isLoading ? <div>Loading...</div> : <Conversations {...{ setCurrentChat, conversations, onlineUsers, setPage, setKey }} />}</div>)
            )
              : (<>

                <div className='w-2/5' >{isLoading ? <div>Loading...</div> : <Conversations {...{ setCurrentChat, conversations, onlineUsers, setPage, setKey }} />}</div>
                <div className=" w-full h-full ">{currentChat ? <ChatArea {...{ setCurrentChat, currentChat, socket, onlineUsers, page, setPage }} /> : <div className="h-full w-full text-gray-700 opacity-55 text-9xl pt-[10%] font-bold">Get Start You Chat..</div>}</div>
              </>)
          }



        </div>

      </div>

    </>
  )
}




export default Chat
