
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
    className="h-full flex flex-col ">

    <div className="h-full  flex flex-col md:pt-2">
    {/* top area */}
    <div className="h-20 md:rounded-t-2xl overflow-hidden bg-gray-900/95 backdrop-blur-2xl shadow-xl flex items-center md:mr-5 border-b border-gray-700/50">
        <ArrowLeft onClick={()=>setChating(false)} className='mx-4 cursor-pointer md:hidden inline hover:bg-gray-700 rounded-xl p-1.5 transition-colors text-white' size={28} />
        <div className="flex text-white items-center gap-4 md:ml-5">
            <Avatar src={userData?.profile} className="h-11 w-11 shadow-lg border-2 border-gray-600/60 ring-2 ring-violet-500/40" />
            <div className="flex flex-col">
            <span className='font-bold text-base tracking-wide' >{userData?.firstName+' '+userData?.lastName}</span>
            <span className="text-xs text-gray-400 truncate">{userData?.email}</span>
            </div>
            
        </div>
    </div>
    {/* chat area */}
    <div className="flex-1 md:rounded-b-2xl md:mb-2 bg-gray-950 overflow-auto flex flex-col md:mr-5 shadow-inner">

        <div className='flex-1 overflow-auto pretty-scrollbar p-2'>
          {
            messages?.map(msg=>(<div key={msg.id}><Message user={remoteUser} message={msg} /></div>))

          }
     
        </div>

        <div className='p-4'>

            <div className='flex bg-gray-900/90 rounded-2xl items-center overflow-hidden mx-2 shadow-2xl border border-gray-700/50 focus-within:border-violet-500/60 focus-within:ring-2 focus-within:ring-violet-500/30 transition-all backdrop-blur-xl'>
            <textarea onChange={handleChange} value={text} placeholder='Type a message...' className='w-full text-white pl-5 py-3.5 resize-none bg-transparent outline-none pretty-scrollbar placeholder:text-gray-400' name="" id=""></textarea>
            <Button onClick={()=>handleSendMessage(text,()=>setText(''))} className='mr-3 bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg mt-auto mb-3 rounded-2xl px-4 py-3 transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed border border-indigo-500/50' disabled={!text.trim()}>
                <SendHorizontal size={22} />
            </Button>
            
            </div>
            
        </div>


    </div>
    {/* bottom area */}
    <div className="h-20 bg-gray-900/95 backdrop-blur-2xl border-t border-gray-700/50" ></div>
    </div>
    </motion.div>
  )
}

export default LiveChat
