

import Avatar from '../../../ui/Avatar/Avatar'

interface ConversationItemProps{

    conversation:{otherUserId:string,user:{userName:string,profile:string }}
    onlineUsers:{userId:string,socketId:string}[]
}

function ConversationItem({conversation, onlineUsers}:ConversationItemProps) {
    const isOnline= Boolean(onlineUsers.find(user=>user.userId==conversation.otherUserId))
  return (
    <li className="w-full pt-5 hover:bg-[#5d34ff21] p-2 px-4  border-b-2 border-b-[#0e1c34]">
    <div className="flex items-center">
        <div className='relative border border-black rounded-full'>
        <Avatar className="h-11 w-11" src={conversation.user.profile||`https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQuQo5Lw-BHj6ts6qC_vAlO1yblef_cVX8F1_sRgoAa6w&s`}/>
        {isOnline&&<span className='h-2.5 w-2.5 rounded-full bg-green-500 absolute top-1 right-0'></span>}
        
        </div>

        <div className="ml-3">
        <span className="font-semibold">{conversation.user.userName}</span>
        <p className="text-sm text-gray-400">Lorem ipsum, dolor sit amet cons</p>
        </div>
        
    </div>
</li>
  )
}

export default ConversationItem
