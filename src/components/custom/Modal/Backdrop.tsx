import { motion } from 'framer-motion'
import { FC, ReactNode } from 'react'

interface BackdropProps {
    children: ReactNode,
    onClick: () => void
}

const  Backdrop:FC<BackdropProps> = ({ children, onClick })=> {
    return (
        <motion.div
            className='fixed top-0 left-0  h-full w-full bg-[#000000a5] flex justify-center items-center z-50'
            onClick={onClick}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            {children}
        </motion.div>
    )
}

export default Backdrop
