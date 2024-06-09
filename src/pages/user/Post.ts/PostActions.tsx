import { MessageCircle, ThumbsUp } from "lucide-react"
import {  useLikeMutation, useUnlikeMutation } from "../../../redux/features/user/post/postApiSlice"
import { useEffect, useRef, useState } from "react"
import { IPostData } from "./usePostDataFetcher"
import { useSelector } from "react-redux"
import { RootState } from "../../../redux/store"
import Comments from "../../../components/custom/comments/Comments"


interface postActionsProps{
    postId:string,
    post:IPostData

}

function PostActions({postId,post}:postActionsProps) {

    const { userData} = useSelector((state: RootState) => state.user)
    const [isLiked, setIsLiked] = useState(false);
    const [like] =useLikeMutation()
    const [unlike] =useUnlikeMutation()
    const [likes,setLikes]=useState<number>(post.upvotes?.length||0)
    const commentsRef = useRef<HTMLDivElement>(null);

    useEffect(()=>{
        setIsLiked(post.upvotes?.includes(userData?.id || '') || false)
    },[post,userData?.id])


    

    const handleLike =async()=>{
        try {
            await like({postId})
            setIsLiked(true)
            setLikes(prev=>prev+1)
        } catch (error) {
            console.log(error);
            
        }
    }

    const handleUnlike =async()=>{
      try {
        await unlike({postId})
        setIsLiked(false)
        setLikes(prev=>prev-1)
      } catch (error) {
        console.log(error);
        
      }
    }

    const scrollToComments = () => {
        if (commentsRef.current) {
            const yOffset = -300; // Adjust this value as needed
            const y = commentsRef.current.getBoundingClientRect().top + window.pageYOffset + yOffset;
            window.scrollTo({ top: y, behavior: 'smooth' });
        }
    };

  return (
    <>
    <div className={` bg-white border sticky  bottom-0 drop-shadow-sm `} >
    <div className="max-w-[55rem] mx-auto w-auto">
        <div className=" flex flex-col md:flex-row justify-between items-center text-gray-600">
            <div className="flex justify-around order-2 md:order-1 border-t ">
                <div className={`flex mr-8 cursor-pointer ${isLiked && 'text-blue-600'} hover:bg-secondary p-3 cursor-pointer active:bg-gray-200 rounded`} onClick={isLiked?handleUnlike:handleLike}>
                    <ThumbsUp  />
                    Like
                </div>
                <div className="flex hover:bg-secondary rounded p-3 cursor-pointer active:bg-gray-200" onClick={scrollToComments}>
                    <MessageCircle />
                    comment
                </div>
            </div>
            <div className="p-2 order-1 md:order-2 flex">
                <p className="mr-5">{post.comments?.length} comments</p>
                <p>{likes} Likes</p>
            </div>
        </div>
    </div>
    </div>

    <Comments ref={commentsRef} {...{postId}}/>
    </>
    
  )
}

export default PostActions
