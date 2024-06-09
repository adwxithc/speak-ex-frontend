
import { useSelector } from 'react-redux';
import Avatar from '../../../components/ui/Avatar/Avatar'
import Button from '../../../components/ui/button/Button'

import { IExtendedUser } from './FollowAndFollowers'
import { RootState } from '../../../redux/store';
import { useFollowUserMutation, useUnfollowUserMutation } from '../../../redux/features/user/user/userApiSlice';
import { Dispatch, SetStateAction, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

interface FollowUserItemProps{
    user:IExtendedUser;
    setUsers: Dispatch<SetStateAction<[] | IExtendedUser[]>>
}

function FollowUserItem({user,setUsers}:FollowUserItemProps) {
    const { userData } = useSelector((state: RootState) => state.user)
    const [userInfo, setUserInfo] =useState(user)
    const following=userInfo?.followers?.includes(userData?.id||'')
    const {followType} = useParams()
    const navigate = useNavigate()
    
    const [followUser] = useFollowUserMutation();
    const [unfollowUser] = useUnfollowUserMutation();

    const handleUnfollow=async()=>{
        try {
            await unfollowUser({userId:userInfo.id})
            
            if(followType=='followers'){
                setUserInfo(prev=>({...prev,followers:[...prev.followers.filter(item=>item!==userData?.id)]}))
            }else{
                setUsers(prev=>{
                    return prev.filter(item=>item.id!==user.id)
                })
            }
            
        } catch (error) {
            console.log(error);
            
        }
    }

    const handleFollow=async()=>{
        try {
            await followUser({userId:userInfo.id})
            setUserInfo(prev=>({...prev,followers:[...prev.followers||[],userData?.id || '']}))
        } catch (error) {
            console.log(error);
        }
    }
  return (
    <li className="w-full  p-3 mb-3 flex justify-between items-center  rounded cursor-pointer hover:bg-gray-100" >
        <div className="flex  gap-3">
        <Avatar src={userInfo.profile} className="h-11 w-11" />
        <div className="flex flex-col">
            <span className="">{userInfo.firstName+' '+userInfo.lastName}</span>
            <span className="text-sm font-semibold text-gray-800 hover:underline" onClick={()=>navigate(`/profile/${user.userName}`)}>{userInfo.userName}</span>
            {
                userInfo?.usersFocusLanguage?.name && <p className="text-sm text-gray-500">{userInfo.usersFocusLanguage.name} Learner</p>
            }
            
        </div>
        </div>
        
        <div className="">
        
            <Button onClick={following?handleUnfollow:handleFollow} varient={'primary-outline'} size={'sm'}>{ following?'unfollow':'follow'}</Button>
        </div>
                            
    </li>
  )
}

export default FollowUserItem
