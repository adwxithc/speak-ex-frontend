import PostWraper from "../../../components/layout/PostWraper/PostWraper"

import parse from 'html-react-parser'


import { useParams } from "react-router-dom"

import usePostDataFetcher from "./usePostDataFetcher"
import PostActions from "./PostActions"

import PostAuther from "./PostAuther"


function Post() {
    const {postId=''} = useParams()
    const {post} = usePostDataFetcher({postId})

 
    return (
        <>
        {
            post ?
            <div className={`h-full my-5 `}>
                <PostWraper >
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

                            <PostAuther auther={post.user}/>

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

             <PostActions {...{post,postId }} />
             
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
