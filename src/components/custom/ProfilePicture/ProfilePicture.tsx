import React, { forwardRef, useContext, useEffect, useState } from 'react'
import { cn } from '../../../utils/style-utils'
import { useDispatch, useSelector } from 'react-redux';

import Modal from '../Modal/Modal.tsx';
import { AnimatePresence } from 'framer-motion';
import UploadProfile from '../uploadImage/UploadImage.tsx';
import { useUploadProfileMutation } from '../../../redux/features/user/user/profileApiSlice.ts';
import { updateCridentials } from '../../../redux/features/user/user/userSlice.ts';
import toast from 'react-hot-toast';
import { ProfileContext } from '../../../pages/user/Profile/Profile.tsx';
import Skelton from './Skelton.tsx';
import Button from '../../ui/Button/Button.tsx';
import { RootState } from '../../../redux/store.ts';
import { useFollowUserMutation, useUnfollowUserMutation } from '../../../redux/features/user/user/userApiSlice.ts';
import { useCreateChatRoomMutation } from '../../../redux/features/user/user/chatApiSlice.ts';
import { ClipLoader } from 'react-spinners';
import { useNavigate } from 'react-router-dom';
import { IBackendResponse } from '../../../types/queryResults.ts';
import { IChatRoom } from '../../../types/database.ts';

interface ProfilePictureProps extends React.HTMLAttributes<HTMLDivElement> { }


const ProfilePicture = forwardRef<HTMLDivElement, ProfilePictureProps>(
    ({ className, ...props }, ref) => {
        const { data, isLoading, self } = useContext(ProfileContext)
        const { userData } = useSelector((state: RootState) => state.user)
        const [isFollowing, setIsFollowing] = useState(data?.followers?.includes(userData?.id || ''))

        const [upload] = useUploadProfileMutation()
        const [followUser] = useFollowUserMutation();
        const [unfollowUser] = useUnfollowUserMutation();
        const [createChatRoom, { isLoading: chatLoading }] = useCreateChatRoomMutation()

        const [loading, setLoading] = useState(false)
        const [showModal, setShowModal] = useState(false)
        const dispatch = useDispatch()
        const navigate = useNavigate()

        useEffect(() => {
            setIsFollowing(data?.followers?.includes(userData?.id || ''))
        }, [data, userData])

        const handleImageUpload = async (imageFile: File) => {
            try {
                setLoading(true)
                const formData = new FormData()
                formData.append('image', imageFile)
                const res = await upload(formData).unwrap()

                dispatch(updateCridentials({ profile: res.data }));
                setLoading(false)
                setShowModal(false)
                toast(res.message, {
                    position: 'top-center'
                })
            } catch (error) {
                console.log(error);

            }
        }

        const handleFollow = async () => {
            try {
                await followUser({ userId: data?.id })
                setIsFollowing(true)
            } catch (error) {
                console.log(error);

            }

        }

        const handleUnfollow = async () => {
            try {
                await unfollowUser({ userId: data?.id })
                setIsFollowing(false)
            } catch (error) {
                console.log(error);

            }
        }

        const handleMessage = async () => {
            try {
                if (data && userData && data.id !== userData.id) {
                    const response = await createChatRoom({ members: [userData.id, data?.id] }).unwrap() as IBackendResponse<IChatRoom>
                    
                    navigate('/chat',{state:{roomId:response.data.id}})
                }
            } catch (error) {
                toast.error('somrthing went wrong, try later')
            }
        }



        return (
            <>
                {
                    isLoading
                        ? <Skelton className={className} />
                        : <div ref={ref} className={cn(`h-full   bg-[url('https://images.pexels.com/photos/268941/pexels-photo-268941.jpeg')]  bg-no-repeat bg-cover`, className)} {...props}  >

                            <div className='bg-gradient-to-t from-black to-transparent h-full w-full flex  flex-col justify-center items-center'>

                                <div className={`rounded-full overflow-hidden  border-2 border-secondary bg-primary w-24 h-24 cursor-pointer `} onClick={() => { self && setShowModal(true) }}>
                                    <img className='object-cover' src={(userData?.id== data?.id? userData?.profile :data?.profile)||'src/assets/Images/placeholder/nopic.jpg'} alt="" />
                                </div>
                                <div className='text-white flex flex-col items-center mt-1 '>
                                    <h1 className='font-semibold'>{data?.userName}</h1>
                                    <h2 className='text-sm'>{data?.email}</h2>
                                </div>
                                {
                                    !self &&
                                    <div className='mt-2 overflow-hidden flex items-center'>
                                        <Button onClick={isFollowing ? handleUnfollow : handleFollow} size={'sm'} varient={'primary-square'}>{isFollowing ? 'unfollow' : 'follow'}</Button>
                                        <Button onClick={handleMessage} size={'sm'} varient={'primary-square'}>{chatLoading ? <ClipLoader color='white' size={18} /> : 'Message'}</Button>
                                    </div>

                                }

                            </div>
                        </div>
                }

                <AnimatePresence
                    initial={false}
                    mode="wait"

                >
                    {showModal && <Modal loading={loading} handleClose={() => { setShowModal(false) }} ><UploadProfile {...{ handleImageUpload }} /></Modal>}
                </AnimatePresence>





            </>

        )
    });

export default ProfilePicture
