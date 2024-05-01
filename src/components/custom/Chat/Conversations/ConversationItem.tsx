
import { Dispatch, SetStateAction } from 'react';
import Avatar from '../../../ui/Avatar/Avatar'

interface ConversationItemProps{
    setSelectedUser: Dispatch<SetStateAction<boolean>>;

}

function ConversationItem({setSelectedUser}:ConversationItemProps) {
  return (
    <li className="w-full pt-5 hover:bg-[#5d34ff21] p-2 px-4  border-b-2 border-b-[#0e1c34]" onClick={()=>setSelectedUser(true)}>
    <div className="flex items-center">

        <Avatar className="h-11 w-11" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQuQo5Lw-BHj6ts6qC_vAlO1yblef_cVX8F1_sRgoAa6w&s"/>

        <div className="ml-3">
        <span className="font-semibold">Jone Doe</span>
        <p className="text-sm text-gray-400">Lorem ipsum, dolor sit amet cons</p>
        </div>
        
    </div>
</li>
  )
}

export default ConversationItem
