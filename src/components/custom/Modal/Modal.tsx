
import { motion } from 'framer-motion'
import { ReactNode, FC } from 'react'
import Backdrop from './Backdrop'
import { X } from 'lucide-react';
import { DotLoader } from 'react-spinners';
import ReactDOM from 'react-dom'
import { cn } from '../../../utils/style-utils';

interface ModalProp extends React.HTMLAttributes<HTMLDivElement> {
    handleClose: () => void;
    children: ReactNode;
    loading: boolean;
    position?: string
    handleModalShowed?: () => void
}

const Modal: FC<ModalProp> = ({ handleClose, children, position = '', loading = false, className, handleModalShowed }) => {

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
                    className={cn(`w-auto rounded-3xl h-auto max-h-[95vh] m-auto p-2 flex flex-col items-center bg-white absolute shadow-2xl ${position}`, className)}
                    onClick={(e) => e.stopPropagation()}
                    variants={dropIn}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    onAnimationComplete={handleModalShowed}

                >
                    <div className='bg-gradient-to-br from-blue-50/50 via-white to-white rounded-3xl shadow-lg border-2 border-gray-100 h-full flex flex-col overflow-hidden backdrop-blur-sm'>
                        <div className='w-full p-2 flex justify-end items-center bg-gradient-to-r from-transparent to-gray-50/50'>
                            <button 
                                onClick={handleClose}
                                className='p-2 rounded-full hover:bg-gray-200 transition-all duration-200 group'
                                aria-label="Close modal"
                            >
                                <X className='text-gray-600 group-hover:text-gray-900 transition-colors' size={24} />
                            </button>
                        </div>
                        <div className='px-3 sm:px-5 md:px-6 h-full overflow-x-hidden overflow-y-scroll pretty-scrollbar'>
                            {children}
                        </div>
                    </div>



                </motion.div>
                {
                    loading &&
                    <div className="h-full w-full absolute flex items-center justify-center bg-black/60 backdrop-blur-sm top-0" onClick={(e) => e.stopPropagation()}>
                        <DotLoader color='white' size={60} />
                    </div>

                }

            </Backdrop>
        </>,
        (document.getElementById("portal")!)
    )
}

export default Modal
