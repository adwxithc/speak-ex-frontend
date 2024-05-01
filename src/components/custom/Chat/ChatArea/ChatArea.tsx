
import Message from '../Message/Message'
import Avatar from '../../../ui/Avatar/Avatar'
import Button from '../../../ui/Button/Button'
import { MoveLeft } from 'lucide-react'
import { Dispatch, SetStateAction, useState } from 'react';
import {motion} from 'framer-motion'

interface ChatAreaProps{
    setSelectedUser: Dispatch<SetStateAction<boolean>>;

}
function ChatArea({setSelectedUser}:ChatAreaProps) {
    const [text, setText ] = useState('')
    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setText(e.target.value);
        // Set the textarea's height based on its content
        e.target.style.height = 'auto'; // Reset the height to auto
        e.target.style.height = e.target.scrollHeight < 150 ? `${e.target.scrollHeight}px` : '150px'; // Set the height to the scroll height
      };

    
  return (

    
  
    <motion.div
    initial={{ x: '100vw' }}
    animate={{ x: 0 }}
    transition={{ type: 'spring', damping: 75,stiffness: 800 }}
     className="h-full flex flex-col">
    {/* top area */}
    <div className=" h-16 bg-[#152b52] text-white flex items-center ">
        <div className="flex gap-3 ml-5">
        <MoveLeft onClick={()=>setSelectedUser(false)} />
        <Avatar src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQuQo5Lw-BHj6ts6qC_vAlO1yblef_cVX8F1_sRgoAa6w&s" className="h-10 w-10" />

        <div className="flex flex-col">
        <span>Jone Doe</span>
        <span className="text-gray-200 text-sm">Online</span>
        </div>
        
        </div>
        
    </div>
   

        {/* chat */}
        <div className=" flex-1  overflow-y-scroll pretty-scrollbar bg-[#0e1c34]">
        <Message />
        
        <Message />
        <Message own />
        <Message />
        <Message own />
        <Message />
    </div>
    {/* bottom area */}
    <div className="py-3 flex border-t bg-[#11223e]">


    <div className='border-2 border-[#0e1c34] bg-[#152b52] w-full overflow-hidden px-5 mx-8 flex rounded-[35px]'>
    <textarea value={text} onChange={handleChange} className="resize-none pt-3 text-white  bg-inherit outline-none   w-full max-w-[900px] flex items-center pretty-scrollbar" placeholder="write something..."></textarea>
    <div className='flex items-center'>
    <Button className='drop-shadow-xl bg-primary active:bg-secondary' size={'md'}>Send</Button>
    </div>
    
    </div>
    

        
    </div>

   
  
</motion.div>
  )
}

export default ChatArea
