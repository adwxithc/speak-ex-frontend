
import { motion } from 'framer-motion'
import { FC } from 'react'
import Backdrop from '../Modal/Backdrop';
import { X } from 'lucide-react';
import ReactDOM from 'react-dom'
import Notifications from '../../../pages/user/Notifications/Notifications';
import { INotification } from '../../../pages/user/Notifications/useNotifications';

interface ModalProp{
    handleClose: () => void;
    notifications:INotification[];
    handleJoinSession: ({ sessionId }: {sessionId: string;}) => void

}

const  Modal:FC<ModalProp> = ({ handleClose} ) =>{
    
    return ReactDOM.createPortal(
        <>
        
         <Backdrop onClick={handleClose}>
            <motion.div
                className={`w-[90vw] sm:w-96 h-full py-2  flex flex-col items-center bg-white absolute right-0`}
                onClick={(e) => e.stopPropagation()}
                initial={{ x: '100vw' }}
                exit={{ x: '100vw' }} // ANIMATE  TO  RIGHT WHEN UNMOUNTING
                animate={{ x: 0 }}
                transition={{ type: 'spring', damping: 75, stiffness: 800 }}
            >

                <div className='border-b border-gray-300 w-full p-2 flex items-center'>
                    <span className='font-bold text-primary ml-5'>NOTIFICATIONS</span>
                <X className='ml-auto  cursor-pointer' onClick={handleClose} />
                </div>


                <div className='px-5 h-full w-full overflow-x-hidden overflow-y-scroll pretty-scrollbar'>
                    <Notifications />
                </div>
                
                
            </motion.div>
         
            
        </Backdrop>
        </>,
        (document.getElementById("portal")!)
    )
}
  
export default Modal
