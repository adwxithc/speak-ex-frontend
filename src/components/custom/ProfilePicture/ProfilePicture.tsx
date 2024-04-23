import React, { forwardRef, useState } from 'react'
import { cn } from '../../../utils/style-utils'
import { useSelector } from 'react-redux';
import {RootState} from '../../../redux/store.ts';
import { IUser } from '../../../types/database.ts';
import Modal from '../Modal/Modal.tsx';
import { AnimatePresence } from 'framer-motion';
import UploadProfile from '../UploadProfile/UploadProfile.tsx';

interface ProfilePictureProps extends React.HTMLAttributes<HTMLDivElement> {
   
}


const ProfilePicture=forwardRef<HTMLDivElement, ProfilePictureProps>(
    ({className,...props}, ref)=>{

        const [showModal, setShowModal] = useState(false)
       

        const { profile } = useSelector((state: RootState) => state.user.userData) as IUser
        return (
            <>
             <div ref={ref} className={cn(`h-full   bg-[url('/Images/userProfile/cover.avif')]  bg-no-repeat bg-cover`,className)} {...props}  >
        
            <div className='bg-gradient-to-t from-black to-transparent h-full w-full flex  flex-col justify-center items-center'>
    
            <div className={`rounded-full overflow-hidden  border-2 border-secondary bg-primary w-24 h-24 cursor-pointer `} onClick={()=>setShowModal(true)}>
                <img className='object-cover' src={profile || "https://png.pngtree.com/png-clipart/20230927/original/pngtree-man-avatar-image-for-profile-png-image_13001877.png"} alt="" />
            </div>
            <div className='text-white flex flex-col items-center'>
                <h1 className='font-semibold'>Adwaith C</h1>
                <h2 className='text-sm'>adwaithjanardhanan0@gmail.com</h2>
            </div>
    
        </div>
             </div>
             
            
             <AnimatePresence
                initial={false}
                mode="wait"
                >
                {showModal && <Modal  loading={false}  handleClose={()=>{setShowModal(false)}} ><UploadProfile /></Modal>}
            </AnimatePresence>
             
                
                
             
             
            </>
           
          )
    });

export default ProfilePicture
