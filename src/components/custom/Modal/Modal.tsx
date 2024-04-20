
import { motion } from 'framer-motion'
import { ReactNode,FC } from 'react'
import Backdrop from './Backdrop'
import { X } from 'lucide-react';

interface ModalProp{
    handleClose: () => void;
    children: ReactNode;
}

const  Modal:FC<ModalProp> = ({ handleClose, children } ) =>{
    const dropIn = {
        hidden: {
            y: "-100vh"
        },
        visible: {
            y: "0",
            opacity: 1,
            transition: {
                duration: 0.2,
                type: "spring",
                damping: 30,
                stiffness: 200
            }
        },
        exit: {
            y: "100vh",
            opacity: 0,
        },
    }
    return (
        <Backdrop onClick={handleClose}>
            <motion.div
                className='w-auto h-full m-auto  rounded-md flex flex-col items-center bg-white '
                onClick={(e) => e.stopPropagation()}
                variants={dropIn}
                initial="hidden"
                animate="visible"
                exit="exit"
            >

                <div className='border-b border-gray-300 w-full p-1'>
                <X className='ml-auto  cursor-pointer' onClick={handleClose} />
                </div>
                <div className='px-5 h-auto overflow-y-scroll pretty-scrollbar'>
                {children}
                </div>

                
            </motion.div>
        </Backdrop>
    )
}

export default Modal
