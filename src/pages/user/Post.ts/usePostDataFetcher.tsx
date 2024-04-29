import {  useEffect, useState } from 'react'
import { useGetPostMutation } from '../../../redux/features/user/post/postApiSlice'
import { IPost } from '../../../types/database';


interface IPostedUser{
    userName:string;
    profile:string
    email:string
}

export interface IPostData extends IPost{
    user:IPostedUser;
}

function usePostDataFetcher({postId}:{postId:string}) {
    const [post, setPost] = useState<IPostData>()
    
    const [getPost]=  useGetPostMutation()
    useEffect(()=>{

        const fetchData = async()=>{
            try {
                if(!postId) return 
                const res= await getPost({postId}).unwrap();
                setPost(res.data)
                
            } catch (error) {
                console.log(error);
            }
        }
        fetchData()

    },[postId,getPost])

  return (
    {
        post
        
    }
  )
}

export default usePostDataFetcher
