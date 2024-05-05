import { Minus, Plus } from "lucide-react"
import Avatar from "../../../components/ui/Avatar/Avatar"
import Button from "../../../components/ui/Button/Button"
import { useFollowUserMutation, useUnfollowUserMutation } from "../../../redux/features/user/user/userApiSlice";
import { IPostedUser } from "./usePostDataFetcher";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface IPostAutherProps{
    auther:IPostedUser
}

function PostAuther({auther}:IPostAutherProps) {
    const { userData } = useSelector((state: RootState) => state.user)
    const [isFollowing, setIsFollowing] = useState(auther.followers.includes(userData?.id || ''))
    const navigate = useNavigate()

    const [followUser] = useFollowUserMutation();
    const [unfollowUser] = useUnfollowUserMutation()

    const handleFollow =async()=>{
        await followUser({userId:auther.id})
        setIsFollowing(true)
    }


    const handleUnfollow=async()=>{
        await unfollowUser({userId:auther.id})
        setIsFollowing(false)
    }
  return (
    <div className=" my-5 flex flex-col sm:flex-row sm:items-center gap-5 justify-between w-full">
    <div className="flex items-center">
        <Avatar
            className="h-10 w-10 sm:h-16 sm:w-16"
            src={auther.profile || "https://marketplace.canva.com/EAFHfL_zPBk/1/0/1600w/canva-yellow-inspiration-modern-instagram-profile-picture-kpZhUIzCx_w.jpg"}
        />
        <div className="ml-2">
            <h3 className="text-gray-800 font-semibold cursor-pointer" onClick={()=>navigate(`/profile/${auther.userName}`)}>
                {auther.userName}
            </h3>
            <p className="text-sm text-gray-500 truncate max-w-[70vw] ">
                {auther.email}
            </p>
        </div>
    </div>

    <div>
        {
            auther.id!==userData?.id &&
            <Button varient={'primary-outline'} size={'md'} onClick={isFollowing?handleUnfollow:handleFollow}>
            {
             isFollowing? <span className="flex"> <Minus /> unfollow</span>: <span className="flex"><Plus /> Follow</span>
            }
             
         </Button>

        }
        
    </div>
</div>
  )
}

export default PostAuther
