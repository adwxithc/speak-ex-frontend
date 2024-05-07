
import moment from 'moment'
import { MessageCircle, ThumbsUp } from "lucide-react"
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import parse from 'html-react-parser'
import { useSelector } from 'react-redux'

import { IFeedItem } from "./useGetFeeds"
import Avatar from "../../../components/ui/Avatar/Avatar"
import { useLikeMutation, useUnlikeMutation } from '../../../redux/features/user/post/postApiSlice'
import { RootState } from '../../../redux/store'
import ToolTip from '../../../components/ui/ToolTip/ToolTip'


interface IPostPreviewProps{
    post:IFeedItem
}

function PostPreview({post}:IPostPreviewProps) {

    const { userData} = useSelector((state: RootState) => state.user)
    const navigate = useNavigate()

    const [like] =useLikeMutation()
    const [unlike] =useUnlikeMutation()
    const [isLiked, setIsLiked] = useState(false);
    const [likes,setLikes]=useState(post.upvotes?.length||0)


    const comments =  post.comments?.length || 0


    useEffect(()=>{
        setIsLiked(post.upvotes?.includes(userData?.id || '') || false)
    },[post,userData?.id])

    const handleLike =async()=>{
        try {
            await like({postId:post._id})
            setIsLiked(true)
            setLikes(prev=>prev+1)
        } catch (error) {
            console.log(error);
            
        }
    }

    const handleUnlike =async()=>{
      try {
        await unlike({postId:post._id})
        setIsLiked(false)
        setLikes(prev=>prev-1)
      } catch (error) {
        console.log(error);
        
      }
    }

  return (
    <div className=" border-b   p-3">

    <div className="flex  items-center">

        <div className="flex items-center gap-2 mb-3 cursor-pointer" onClick={()=>navigate(`/profile/${post.user.userName}`)}>
        <Avatar className="h-8 w-8" src={post.user.profile || 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'} />
        <span className="font-semibold">{post.user.firstName +"  "+post.user.lastName}</span>
        </div>

        <span className="text-gray-600 text-sm ml-auto sm:mr-5">{moment(post.createdAt).calendar()}</span>
    </div >

    <div className=" flex max-h-[150px] sm:max-h-[200px]">
        <div className="w-3/5">

            <div>
                <div className="">
                    <h3 className="font-bold sm:text-2xl mb-2  line-clamp-2 sm:line-clamp-1 ">{post.title}</h3>
                    <div className="hidden sm:block">
                        <p className="text-justify line-clamp-2 md:line-clamp-3  ">{parse(post.content)}</p>
                    </div>
                    <ToolTip tooltip='Read More Content'><Link  to={`/post/${post._id}`} ><span className="text-primary font-semibold hover:border-b-2 border-primary cursor-pointer text-sm sm:text-md">view more...</span></Link></ToolTip>
                </div>




            </div>


            

        </div>

        <div className=" w-2/5 overflow-hidden   ml-3 sm:ml-12 flex items-center px-5">
            <img className="object-fit " src={post.image} alt="" />
        </div>
    </div>

    <div className="flex gap-5 ">
        <ToolTip tooltip='Likes'><span className="text-sm flex"> <span className='cursor-pointer' onClick={isLiked?handleUnlike:handleLike}> <ThumbsUp size={18} color={isLiked?"blue":"gray"}  /> </span> <span className="ml-1"> {likes}</span>  </span></ToolTip>
        <ToolTip tooltip='Comments'><span className="text-sm flex"> <Link  to={`/post/${post._id}`} > <MessageCircle size={18} color="gray" /></Link> <span className="ml-1">{comments}</span> </span></ToolTip>
    </div>

</div>
  )
}

export default PostPreview
