
import { Dispatch, SetStateAction } from 'react'
import ConversationItem from './ConversationItem'

interface ConversationsProps{
    setSelectedUser: Dispatch<SetStateAction<boolean>>;

}

function Conversations({setSelectedUser}:ConversationsProps) {
  return (
    <aside className="border-r  h-screen  overflow-hidden bg-[#11223e] text-white">
    <nav className="h-full">
        <div className="flex p-2  items-center bg-[#152b52]   h-16">
            <h2 className="font-semibold text-xl mx-auto text-white">Messages</h2>
           
        </div>
        <ul className=" overflow-x-hidden overflow-y-auto pretty-scrollbar h-full cursor-pointer">
        
       <ConversationItem {...{setSelectedUser}} />
       <ConversationItem {...{setSelectedUser}} />
       <ConversationItem {...{setSelectedUser}} />
      
    
            
        </ul>
    </nav>
  
</aside>
  )
}

export default Conversations
