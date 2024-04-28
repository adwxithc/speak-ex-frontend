import { IoMdAdd } from "react-icons/io";
import { AnimatePresence } from "framer-motion";

import PostThumbNail from "../../../components/custom/PostThumbNail/PostThumbNail"
import Button from "../../../components/ui/Button/Button"
import { useContext, useEffect, useState } from "react";
import Modal from "../../../components/custom/Modal/Modal";
import CreatePost from "../CreatePost/CreatePost";
import { useGetUsersPostsMutation } from "../../../redux/features/user/post/postApiSlice";
import { IPost } from "../../../types/database";
import { Link } from "react-router-dom";
import { ProfileContext } from "../Profile/Profile";
import UserPostsSkelton from "./UserPostsSkelton";


function UsersPosts() { 
  const [modalOpen, setModalOpen ] = useState(false)
  const [posts, setPosts]= useState<Partial<IPost>[]>([])
 
  const [getPosts] = useGetUsersPostsMutation()
  const [loading,setLoading] =  useState(false)
  const [postLoading, setPostLoading] = useState(true)
  
  const {data,self}= useContext(ProfileContext)
  useEffect(()=>{
    const fetchData=async()=>{
      try {
        if(!data) return 
        const res= await getPosts({userName:data?.userName}).unwrap()
        setPosts(res.data.posts)
      } catch (error) {
        console.log();
        
      }finally{
        setPostLoading(false)
      }
     
    }
    fetchData();

  },[data,getPosts])
  

  return (
    <div>
      {
        self &&
            <div className="p-2 mb-3 flex justify-end mt-5">
            
              
              <Button varient={'primary-outline'} size={"md"} className="text-center" onClick={()=>setModalOpen(true)}>
                <span className="hidden sm:inline">Create post</span> <IoMdAdd size={20} />
              </Button>
            
            </div>
      }
       
        {
          postLoading
          ?
            <UserPostsSkelton />
          
          :
         
            <div className='grid grid-cols-2 md:grid-cols-4 gap-4 sm:p-5 mt-3 sm:mt-0'>
            {
              posts.map(post=><Link  key={post.id} to={`/post/${post.id}`} > <PostThumbNail imageUrl={post.image as string} title={post.title as string} /></Link>)
            }
            
          </div>
          
        }
        
        
        
       


        <AnimatePresence
        initial={false}
        mode="wait"
        >
        {modalOpen && <Modal {...{loading}}  handleClose={()=>{setModalOpen(false)}} ><CreatePost {...{setLoading,setPosts,setModalOpen}} /></Modal>}
        </AnimatePresence>
    </div>



  )
}

export default UsersPosts
