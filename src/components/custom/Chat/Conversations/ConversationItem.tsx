

import moment from 'moment'
import { IChatRoom } from '../../../../types/database'
import Avatar from '../../../ui/Avatar/Avatar'



interface ConversationItemProps {

  conversation: IChatRoom
  onlineUsers: { userId: string, socketId: string }[]

}

function ConversationItem({ conversation, onlineUsers }: ConversationItemProps) {
  const isOnline = Boolean(onlineUsers.find(user => user.userId == conversation.otherUserId))



  return (
    <li className="w-full pt-5 hover:bg-[#5d34ff21] p-2 px-4  border-b-2 border-b-[#0e1c34]">
      <div className="flex items-center">


        <div className='relative border border-black rounded-full flex-shrink-0'>
          <Avatar className="h-11 w-11" src={conversation.user.profile || 'src/assets/Images/placeholder/nopic.jpg'} />
          {isOnline && <span className='h-2.5 w-2.5 rounded-full bg-green-500 absolute top-1 right-0'></span>}

        </div>



        <div className="ml-3">
          <div className='flex justify-between' >
            <span className="font-semibold">{conversation.user.userName}</span>


          </div>

          <p className="text-sm text-gray-400 w-full max-w-1/2 line-clamp-1">{conversation.lastMessage.text}</p>

        </div>

        <div className='flex flex-col items-end gap-2 ml-auto'>
          <span className='text-xs text-gray-400'>{moment(new Date(conversation.lastMessage.createdAt.toString())).fromNow()}</span>
          {conversation.unseenMessageCount > 0 &&
            <div className='h-5 w-5 rounded-full bg-white flex items-center justify-center text-primary font-semibold'>{conversation.unseenMessageCount}</div>
          }
        </div>


      </div>
    </li>
  )
}

export default ConversationItem
