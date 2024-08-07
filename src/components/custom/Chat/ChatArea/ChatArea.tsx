import { Dispatch, MutableRefObject, SetStateAction, useCallback, useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion'
import { useSelector } from 'react-redux';
import { Socket } from 'socket.io-client';

import Message from '../Message/Message'
import Avatar from '../../../ui/Avatar/Avatar'
import Button from '../../../ui/Button/Button'
import { MoveLeft } from 'lucide-react'
import { IChatRoom, IMessage } from '../../../../types/database';
import { useGetMessagesMutation, useSendMessageMutation, useSetMessageSeenMutation } from '../../../../redux/features/user/user/chatApiSlice';
import { RootState } from '../../../../redux/store';
import { PropagateLoader } from 'react-spinners';
import toast from 'react-hot-toast';


interface ChatAreaProps {
    setCurrentChat: Dispatch<SetStateAction<IChatRoom | null>>;
    currentChat: IChatRoom;
    socket: MutableRefObject<Socket | null>;
    onlineUsers: { userId: string, socketId: string }[]
    setPage: Dispatch<SetStateAction<number>>
    page: number
}
function ChatArea({ setCurrentChat, currentChat, socket, onlineUsers, page, setPage }: ChatAreaProps) {

    const isOnline = Boolean(onlineUsers.find(user => user.userId == currentChat.otherUserId))
    const { userData } = useSelector((state: RootState) => state.user)
    const [text, setText] = useState('')
    const [messages, setMessages] = useState<IMessage[]>([])
    const [hasMore, setHasMore] = useState(false)
    const scrollRef = useRef<HTMLDivElement | null>(null)
    const [setMessageSeen] = useSetMessageSeenMutation()
    const isFirstRender = useRef(true);


    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setText(e.target.value);
        e.target.style.height = 'auto';
        e.target.style.height = e.target.scrollHeight < 150 ? `${e.target.scrollHeight}px` : '150px';
    };

    const handleSeenMessage = useCallback(async () => {

        try {
            socket.current?.emit("setMessageSeen", {
                receiverId: currentChat.otherUserId,
            });
            await setMessageSeen({ roomId: currentChat.id, senderId: currentChat.otherUserId })
        } catch (error) {
            toast.error('something went wrong');

        }
    }, [currentChat, setMessageSeen, socket])

    const [getMessages, { isLoading }] = useGetMessagesMutation()
    const observer = useRef<IntersectionObserver | null>(null)

    const lastMessageRef = useCallback((node: HTMLDivElement | null) => {
        if (isLoading) return
        if (observer.current) observer.current.disconnect()

        observer.current = new IntersectionObserver(entries => {

            if (entries[0].isIntersecting && hasMore && !isFirstRender.current) {
                setPage(prev => prev + 1)
            }

        })
        if (node) observer.current.observe(node)


    }, [isLoading, hasMore, setPage])


    const [sendMessage] = useSendMessageMutation()

    useEffect(() => {
        const fetchMessages = async () => {
            try {

                const res = await getMessages({ roomId: currentChat?.id, page }).unwrap();
                isFirstRender.current = true
                setMessages(prev => {

                    return page == 1 ? [...(res.data.messages || [])] : [...(res.data.messages || []), ...prev]
                });
                setHasMore(res.data.lastPage > page)
            } catch (error) {
                toast.error('something went wrong')
            }
        }
        fetchMessages()
    }, [currentChat, getMessages, page])

    useEffect(() => {
        if (isFirstRender.current) {
            if (!scrollRef?.current) return
            scrollRef.current.scrollIntoView()

            setTimeout(() => {
                isFirstRender.current = false
            }, 500)

        } else {

            if (!scrollRef?.current) return
            scrollRef.current.scrollIntoView({ behavior: 'smooth' })
        }

    }, [messages, page,])




    const handleSend = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        if (!text) return
        try {

            const receiverId = currentChat.members.find(
                (member) => member !== userData?.id
            );


            const id = (Math.random() * 10000).toString()
            const newMessage = {
                id,
                createdAt: new Date().toString(),
                updatedAt: new Date().toString(),
                roomId: currentChat.id,
                senderId: userData?.id || '',
                text,
                seen: false,
            }

            setMessages(prev => [...prev, newMessage])

            socket.current?.emit("sendMessage", {
                senderId: userData?.id,
                receiverId,
                text: text,
            });
            setText('')
            await sendMessage({ roomId: currentChat?.id, messageData: { text, senderId: userData?.id } })

        } catch (error) {
            toast.error('something went wrong');
        }
    }

    const handleGetMessage = useCallback((data: { senderId: string, text: string }) => {
        const newMessage = {
            id: '',
            senderId: data.senderId,
            text: data.text,
            createdAt: new Date().toString(),
            updatedAt: new Date().toString(),
            seen: true,
            roomId: currentChat.id
        };

        currentChat?.members.includes(newMessage.senderId) &&
            setMessages((prev) => [...prev, newMessage]);

        handleSeenMessage()
    }, [currentChat.id, currentChat?.members, handleSeenMessage])

    const handleGetMessageSeen = useCallback(() => {
        setMessages(prev => [...prev.map(msg => ({ ...msg, seen: true }))])
    }, [])

    useEffect(() => {
        const socketEvent = socket.current
        if (socketEvent) {
            socketEvent.on("getMessage", handleGetMessage)
            socketEvent.on("getMessageSeen", handleGetMessageSeen)
        }
        return () => {
            if (socketEvent) {
                socketEvent.off("getMessage", handleGetMessage)
                socketEvent.off("getMessageSeen", handleGetMessageSeen)
            }

        }
    }, [handleGetMessage, handleGetMessageSeen, socket])
    return (

        <motion.div
            initial={{ x: '100vw' }}
            animate={{ x: 0 }}
            transition={{ type: 'spring', damping: 75, stiffness: 800 }}
            className="h-full flex flex-col">
            {/* top area */}
            <div className=" h-16 bg-[#152b52] text-white flex items-center ">
                <div className="flex items-center gap-3 ml-5">
                    <MoveLeft className='cursor-pointer' onClick={() => setCurrentChat(null)} />
                    <Avatar src={currentChat.user.profile || 'src/assets/Images/placeholder/nopic.jpg'} className="h-10 w-10" />
                    <div className="flex flex-col">
                        <span>{currentChat.user.userName}</span>
                        <span className="text-gray-300 text-sm">{isOnline ? 'Online' : 'Offline'}</span>
                    </div>
                </div>
            </div>
            {/* chat */}
            <div className=" flex-1  overflow-y-scroll pretty-scrollbar bg-[#0e1c34]">
                {isLoading ? <div className='flex justify-center text-gray-200 pt-1'><PropagateLoader color='white' /></div> : ''}
                {
                    messages.map((msg, index) => <div key={msg.id} ref={index == 0 ? lastMessageRef : null}><div ref={scrollRef} ><Message message={msg} user={currentChat.user} /></div></div>)
                }
            </div>
            {/* bottom area */}
            <div className="py-1 flex  bg-[#152a4c]">
                <div className='border-2 border-[#0e1c34] bg-[#152b52] w-full overflow-hidden px-5 mx-8 flex rounded-[35px]'>
                    <textarea value={text} onChange={handleChange} className="resize-none pt-3 text-white  bg-inherit outline-none   w-full max-w-[900px] flex items-center pretty-scrollbar" placeholder="write something..."></textarea>
                    <div className='flex items-center'>
                        <Button varient={'primary'} className='drop-shadow-xl active:text-primary active:bg-secondary' size={'md'} onClick={handleSend}>Send</Button>
                    </div>

                </div>
            </div>
        </motion.div>
    )
}

export default ChatArea
