
import { Dispatch, SetStateAction } from 'react'
import ConversationItem from './ConversationItem'
import {IChatRoom} from '../../../../types/database';


interface ConversationsProps {
 
    conversations: IChatRoom[];
    setCurrentChat:Dispatch<SetStateAction<IChatRoom | null>>

}

function Conversations({ setCurrentChat, conversations }: ConversationsProps) {
    
    return (
        
        
        <aside className="border-r  h-screen  overflow-hidden bg-[#11223e] text-white">
            <nav className="h-full">
                <div className="flex p-2  items-center bg-[#152b52]   h-16">
                    <h2 className="font-semibold text-xl mx-auto text-white">Messages</h2>

                </div>
                <ul className=" overflow-x-hidden overflow-y-auto pretty-scrollbar h-full cursor-pointer">
                    {
                        conversations?.map(conversation => <div key={conversation.otherUserId} onClick={()=>setCurrentChat(conversation)} ><ConversationItem {...{ conversation }} /></div>)
                    }
                </ul>
            </nav>

        </aside>
        
    )
}

export default Conversations
