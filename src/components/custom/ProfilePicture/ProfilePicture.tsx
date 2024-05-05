import React, { forwardRef, useContext, useEffect, useState } from 'react'
import { cn } from '../../../utils/style-utils'
import { useDispatch, useSelector } from 'react-redux';

import Modal from '../Modal/Modal.tsx';
import { AnimatePresence } from 'framer-motion';
import UploadProfile from '../UploadProfile/UploadProfile.tsx';
import { useUploadProfileMutation } from '../../../redux/features/user/user/profileApiSlice.ts';
import { updateUser } from '../../../redux/features/user/user/userSlice.ts';
import toast from 'react-hot-toast';
import { ProfileContext } from '../../../pages/user/Profile/Profile.tsx';
import Skelton from './Skelton.tsx';
import Button from '../../ui/Button/Button.tsx';
import { RootState } from '../../../redux/store.ts';
import { useFollowUserMutation, useUnfollowUserMutation } from '../../../redux/features/user/user/userApiSlice.ts';

interface ProfilePictureProps extends React.HTMLAttributes<HTMLDivElement> {}


const ProfilePicture=forwardRef<HTMLDivElement, ProfilePictureProps>(
    ({className,...props}, ref)=>{
        const {data,isLoading,self}= useContext(ProfileContext)
        const { userData } = useSelector((state: RootState) => state.user)
        const [isFollowing,setIsFollowing] = useState(data?.followers?.includes(userData?.id || ''))
        
        const [upload] = useUploadProfileMutation()
        const [followUser] = useFollowUserMutation();
        const [unfollowUser] = useUnfollowUserMutation();

        const [loading, setLoading] = useState(false)
        const [showModal, setShowModal] = useState(false)
        const dispatch = useDispatch()

        useEffect(()=>{
            setIsFollowing(data?.followers?.includes(userData?.id || ''))
        },[data,userData])

        const handleImageUpload=async(imageFile:File)=>{
            try {
              setLoading(true)
              const formData= new FormData()
              formData.append('image',imageFile)
              const res=await upload(formData).unwrap()
             
              dispatch(updateUser({profile:res.data}));
              setLoading(false)
              setShowModal(false)
              toast(res.message,{
                position:'top-center'
            })
            } catch (error) {
              console.log(error);
              
            }
        }

        const handleFollow=async()=>{
            try {
                await followUser({userId:data?.id})
                setIsFollowing(true)
            } catch (error) {
                console.log(error);
                
            }
            
        }

        const handleUnfollow = async()=>{
            try {
                await unfollowUser({userId:data?.id})
                setIsFollowing(false)
            } catch (error) {
                console.log(error);
                
            }
            
        }

       

        return (
            <>
            {
                isLoading
                ?<Skelton className={className}/>
                :<div ref={ref} className={cn(`h-full   bg-[url('https://images.pexels.com/photos/268941/pexels-photo-268941.jpeg')]  bg-no-repeat bg-cover`,className)} {...props}  >
        
                <div className='bg-gradient-to-t from-black to-transparent h-full w-full flex  flex-col justify-center items-center'>
        
                <div className={`rounded-full overflow-hidden  border-2 border-secondary bg-primary w-24 h-24 cursor-pointer `} onClick={()=>{self && setShowModal(true)}}>
                    <img className='object-cover' src={data?.profile || "https://png.pngtree.com/png-clipart/20230927/original/pngtree-man-avatar-image-for-profile-png-image_13001877.png"} alt="" />
                </div>
                <div className='text-white flex flex-col items-center mt-1 '>
                    <h1 className='font-semibold'>{data?.userName}</h1>
                    <h2 className='text-sm'>{data?.email}</h2>
                </div>
            {
                !self &&
                <div className='mt-2'>
                    <Button onClick={isFollowing?handleUnfollow:handleFollow}  size={'md'} varient={'secondary-outline'}>{isFollowing?'unfollow':'follow'}</Button>
                </div>

            }
        
            </div>
                 </div>
            }
          
             <AnimatePresence
                initial={false}
                mode="wait"
            
                >
                {showModal && <Modal  loading={loading}  handleClose={()=>{setShowModal(false)}} ><UploadProfile {...{handleImageUpload}} /></Modal>}
            </AnimatePresence>
             
                
                
             
             
            </>
           
          )
    });

export default ProfilePicture
