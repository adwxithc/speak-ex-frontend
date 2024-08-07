
import { Dispatch, SetStateAction } from 'react'
import ConversationItem from './ConversationItem'
import {IChatRoom} from '../../../../types/database';
import { Input } from '../../../ui/Input/Input';
import { CircleUserRound, Search } from 'lucide-react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../redux/store';
import { useNavigate } from 'react-router-dom';
import Button from '../../../ui/Button/Button';


interface ConversationsProps {
 
    conversations: IChatRoom[];
    setCurrentChat:Dispatch<SetStateAction<IChatRoom | null>>;
    onlineUsers:{userId:string,socketId:string}[]
    setPage: Dispatch<SetStateAction<number>>;
    setKey:Dispatch<SetStateAction<string>>;
}

function Conversations({ setCurrentChat, conversations,onlineUsers,setPage,setKey }: ConversationsProps) {
    const { userData } = useSelector((state: RootState) => state.user)
    const navigate = useNavigate()
    return (
        
        
        <aside className="border-r  h-screen  overflow-hidden bg-[#11223e] text-white">
            <nav className="h-full">
                <div className="flex p-2  items-center  bg-[#152b52]   h-16 relative">
                <Button  onClick={()=>navigate(`/profile/${userData?.userName}`)} className='absolute left-5 text-white/80'><CircleUserRound /></Button>
                    <h2 className="font-semibold text-xl sm:mx-auto text-white">Messages</h2>
 
                </div>
                <div className='w-11/12 my-3 bg-[#152b52] text-gray-300 flex items-center px-3 mx-auto rounded-md'>
                    <Search />
                    <Input placeholder='Search' onChange={(e)=>setKey(e.target.value)} className='bg-inherit  placeholder:text-gray-300  outline-none border-none '/>
                </div>
                <ul className=" overflow-x-hidden overflow-y-auto pretty-scrollbar h-full cursor-pointer">
                    {
                        conversations?.map(conversation => <div key={conversation.otherUserId} onClick={()=>{setCurrentChat(conversation);setPage(1)}} ><ConversationItem {...{ conversation,onlineUsers }} /></div>)
                    }
                </ul>
            </nav>

        </aside>
        
    )
}

export default Conversations
