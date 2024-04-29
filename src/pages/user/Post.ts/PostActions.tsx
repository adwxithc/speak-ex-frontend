import { MessageCircle, ThumbsUp } from "lucide-react"
import {  useLikeMutation, useUnlikeMutation } from "../../../redux/features/user/post/postApiSlice"
import { useEffect, useState } from "react"
import { IPostData } from "./usePostDataFetcher"
import { useSelector } from "react-redux"
import { RootState } from "../../../redux/store"

interface postActionsProps{
    postId:string,
    post:IPostData

}

function PostActions({postId,post}:postActionsProps) {

    const { userData} = useSelector((state: RootState) => state.user)
    const [isLiked, setIsLiked] = useState(false);
    const [like] =useLikeMutation()
    const [unlike] =useUnlikeMutation()
    useEffect(()=>{
        setIsLiked(post.upvotes?.includes(userData?.id || '') || false)
    },[post,userData?.id])
    

    const handleLike =async()=>{
        try {
            await like({postId})
            setIsLiked(true)
        } catch (error) {
            console.log(error);
            
        }
    }

    const handleUnlike =async()=>{
      try {
        await unlike({postId})
        setIsLiked(false)
      } catch (error) {
        console.log(error);
        
      }
    }

  return (
    <div className="w-full bg-white border sticky  bottom-0 drop-shadow-sm">
    <div className="max-w-[55rem] mx-auto w-auto">
        <div className=" flex flex-col md:flex-row justify-between text-gray-600">
            <div className="flex justify-around order-2 md:order-1 border-t p-2">
                <div className={`flex mr-8 cursor-pointer ${isLiked && 'text-blue-600'} `} onClick={isLiked?handleUnlike:handleLike}>
                    <ThumbsUp  />
                    Like
                </div>
                <div className="flex">
                    <MessageCircle />
                    comment
                </div>
            </div>
            <div className="p-2 ">
                <p>{post.comments?.length} comments</p>
            </div>
        </div>
    </div>
</div>
  )
}

export default PostActions
