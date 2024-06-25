
import { ArrowLeft, SendHorizontal } from 'lucide-react'
import {motion} from 'framer-motion'
import { Dispatch, SetStateAction, useState } from 'react'
import { useSelector } from 'react-redux'

import Message from '../../../../components/custom/Chat/Message/Message'
import Avatar from '../../../../components/ui/Avatar/Avatar'
import IUser, { IMessage } from '../../../../types/database'
import { RootState } from '../../../../redux/store'
import Button from '../../../../components/ui/Button/Button'


interface ILiveChatProps{
  remoteUser:Required<IUser>|null
  messages:IMessage[],
  handleSendMessage: (text: string, cb: () => void) => Promise<void>
  setChating:Dispatch<SetStateAction<boolean>>
  
}

function LiveChat({remoteUser,messages, handleSendMessage, setChating}:ILiveChatProps) {
  
  const [text, setText] = useState('')
  const { userData } = useSelector((state: RootState) => state.user)

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
    // Set the textarea's height based on its content
    e.target.style.height = 'auto';
    e.target.style.height = e.target.scrollHeight < 150 ? `${e.target.scrollHeight}px` : '150px';
};

  if(!remoteUser) return <div className='h-screen w-full bg-gray-800'></div>
  return (
    <motion.div
    initial={{ x: '100vw' }}
    animate={{ x: 0 }}
    exit={{ x: '100vw' }}
    
    transition={{ type: 'spring', damping: 75, stiffness: 800 }}
    className="h-full flex flex-col">

    <div className="h-full  flex flex-col md:pt-2">
    {/* top area */}
    <div className="h-16 bg-white  flex items-center  ">
        <ArrowLeft onClick={()=>setChating(false)} color='white' className='mx-3 cursor-pointer' />
        <div className="flex  dark:text-white items-center  gap-3  ">
            <Avatar src={userData?.profile} className="h-8 w-8" />
            <div className="flex flex-col">
            <span >{userData?.firstName+' '+userData?.lastName}</span>
            <span className="text-xs text-gray-800 dark:text-gray-300   truncate">{userData?.email}</span>
            </div>
            
        </div>
    </div>
    {/* chat area */}
    <div className="flex-1 md:rounded-b-md  md:mb-2 bg-[#ebeaea] overflow-auto flex flex-col ">

        <div className='flex-1 overflow-auto pretty-scrollbar'>
          {
            messages?.map(msg=>(<div key={msg.id}><Message user={remoteUser} message={msg} /></div>))

          }
     
        </div>

        <div className='p-2'>

            <div className='flex bg-white  rounded-xl items-center overflow-hidden mx-2'>
            <textarea onChange={handleChange} value={text} placeholder='type something..' className='w-full text-black/80 pl-3 py-2 resize-none bg-inherit outline-none pretty-scrollbar' name="" id=""></textarea>
            <Button onClick={()=>handleSendMessage(text,()=>setText(''))} className='mr-3 dark:text-white mt-auto mb-5'><SendHorizontal   /></Button>
            
            </div>
            
        </div>


    </div>
    {/* bottom area */}
    <div className="h-20 bg-white  md:bg-black/30" ></div>
    </div>
    </motion.div>
  )
}

export default LiveChat
