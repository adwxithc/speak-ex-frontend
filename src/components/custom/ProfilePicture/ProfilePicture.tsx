import React, { forwardRef } from 'react'
import { cn } from '../../../utils/style-utils'

interface ProfilePictureProps extends React.HTMLAttributes<HTMLDivElement> {
   
}


const ProfilePicture=forwardRef<HTMLDivElement, ProfilePictureProps>(
    ({className,...props}, ref)=>{
        return (
            <div ref={ref} className={cn(`h-full   bg-[url('/Images/userProfile/cover.avif')]  bg-no-repeat bg-cover`,className)} {...props}  >
        
            <div className='bg-gradient-to-t from-black to-transparent h-full w-full flex  flex-col justify-center items-center'>
        
                <div className={`rounded-full overflow-hidden  border-2 border-secondary bg-[#718bff] w-24 h-24 `}>
                    <img className='object-cover' src="https://png.pngtree.com/png-clipart/20230927/original/pngtree-man-avatar-image-for-profile-png-image_13001877.png" alt="" />
                </div>
                <div className='text-white flex flex-col items-center'>
                    <h1 className='font-semibold'>Adwaith C</h1>
                    <h2 className='text-sm'>adwaithjanardhanan0@gmail.com</h2>
                </div>
        
            </div>
        </div>
          )
    });

export default ProfilePicture
