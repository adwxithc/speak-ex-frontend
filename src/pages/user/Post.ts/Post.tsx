import PostWraper from "../../../components/layout/PostWraper/PostWraper"
import Avatar from '../../../components/ui/Avatar/Avatar'
import parse from 'html-react-parser'
import Button from "../../../components/ui/Button/Button"
import { MessageCircle, Plus, ThumbsUp } from "lucide-react"
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { useGetPostMutation } from "../../../redux/features/user/post/postApiSlice"
import { IPost } from "../../../types/database"

interface IPostedUser{
    userName:string;
    profile:string
    email:string
}


interface IPostData extends IPost{
    user:IPostedUser;
}


function Post() {
    const {postId} = useParams()
    const [getPost]=  useGetPostMutation()
    const [post, setPost] = useState<IPostData>()
    useEffect(()=>{

        const fetchData = async()=>{
            try {
                const res= await getPost({postId}).unwrap();
                setPost(res.data)

            } catch (error) {
                console.log(error);
            }
        }
        fetchData()

    },[postId,getPost])
    return (
        <>
        {
            post ?
            <div className={`h-full my-5 `}>
                <PostWraper>
                    <div className="  border-b w-full flex justify-center">
                        <img
                            className="w-full h-full"
                            src={
                                post?.image
                            }
                            alt={post?.title}
                        />
                    </div>

                    <div className="px-2 mt-8 ">
                        <div className="pb-5 text-left">
                            <h1 className="text-3xl md:text-5xl font-semibold leading-normal ">
                               {post?.title}
                            </h1>
                        </div>

                        <div className=" my-5 flex flex-col sm:flex-row sm:items-center gap-5 justify-between w-full">
                            <div className="flex items-center">
                                <Avatar
                                    className="h-10 w-10 sm:h-16 sm:w-16"
                                    src={post.user.profile || "https://marketplace.canva.com/EAFHfL_zPBk/1/0/1600w/canva-yellow-inspiration-modern-instagram-profile-picture-kpZhUIzCx_w.jpg"}
                                />
                                <div className="ml-2">
                                    <h3 className="text-gray-800 font-semibold">
                                        {post.user.userName}
                                    </h3>
                                    <p className="text-sm text-gray-500 truncate max-w-[70vw] ">
                                        {post.user.email}
                                    </p>
                                </div>
                            </div>

                            <div>
                                <Button varient={'primary-outline'} size={'md'}>
                                    {' '}
                                    <Plus /> Follow
                                </Button>
                            </div>
                        </div>

                        <div className="pb-5">
                            <p className="text-gray-400 text-sm">
                                {post.createdAt}
                            </p>
                        </div>

                        <div className="my-8">
                            <div className="tiptap w-full">
                                {parse(post.content)}
                            </div>
                        </div>
                    </div>
                </PostWraper>

                <div className="w-full bg-white border sticky  bottom-0 drop-shadow-sm">
                    <div className="max-w-[55rem] mx-auto w-auto">
                        <div className=" flex flex-col md:flex-row justify-between text-gray-600">
                            <div className="flex justify-around order-2 md:order-1 border-t p-2">
                                <div className="flex mr-8">
                                    <ThumbsUp />
                                    Like
                                </div>
                                <div className="flex">
                                    <MessageCircle />
                                    comment
                                </div>
                            </div>
                            <div className="p-2 ">
                                <p>22 comments</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            :
            <div className="h-full w-full p-8 flex justify-center items-center bg-red-50">
                something went wrong..!
            </div>

        }
            
        </>
    );
}

export default Post;