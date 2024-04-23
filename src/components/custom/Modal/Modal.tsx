
import { motion } from 'framer-motion'
import { ReactNode,FC } from 'react'
import Backdrop from './Backdrop'
import { X } from 'lucide-react';
import { DotLoader } from 'react-spinners';
import ReactDOM from 'react-dom'

interface ModalProp{
    handleClose: () => void;
    children: ReactNode;
    loading:boolean
}

const  Modal:FC<ModalProp> = ({ handleClose, children, loading=false } ) =>{
    
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
    return ReactDOM.createPortal(
        <>
         <Backdrop onClick={handleClose}>
            <motion.div
                className='w-auto h-auto max-h-[100vh] m-auto py-2  rounded-md flex flex-col items-center bg-white '
                onClick={(e) => e.stopPropagation()}
                variants={dropIn}
                initial="hidden"
                animate="visible"
                exit="exit"
            >

                <div className='border-b border-gray-300 w-full p-1'>
                <X className='ml-auto  cursor-pointer' onClick={handleClose} />
                </div>
                <div className='px-5 h-full overflow-y-scroll pretty-scrollbar'>
                {children}
                </div>
                
                
            </motion.div>
            {
                loading &&
                <div className="h-full w-full absolute flex items-center justify-center  bg-[#0000006d] top-0" onClick={(e)=>e.stopPropagation()}>
                    <DotLoader color='white' />
                </div>

            }
            
        </Backdrop>
        </>,
        (document.getElementById("portal")!)
    )
}
  
export default Modal
