import { IoMdAdd } from "react-icons/io";
import { AnimatePresence } from "framer-motion";

import PostThumbNail from "../../../components/custom/PostThumbNail/PostThumbNail"
import Button from "../../../components/ui/Button/Button"
import { useEffect, useState } from "react";
import Modal from "../../../components/custom/Modal/Modal";
import CreatePost from "../CreatePost/CreatePost";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { useGetUsersPostsMutation } from "../../../redux/features/user/post/postApiSlice";
import { IPost, IUser } from "../../../types/database";
import { Link } from "react-router-dom";


function UsersPosts() { 
  const [modalOpen, setModalOpen ] = useState(false)
  const [posts, setPosts]= useState<Partial<IPost>[]>([])
  const { userName } = useSelector((state: RootState) => state.user.userData) as IUser
  const [getPosts] = useGetUsersPostsMutation()
  const [loading,setLoading] =  useState(false)
  useEffect(()=>{
    const fetchData=async()=>{
      const res= await getPosts({userName}).unwrap()
      setPosts(res.data.posts)
    }
    fetchData();

  },[userName,getPosts])
  return (
    <div>
            <div className="p-2 mb-3 flex justify-end mt-5">
            
              
              <Button varient={'primary-outline'} size={"md"} className="text-center" onClick={()=>setModalOpen(true)}>
                <span className="hidden sm:inline">Create post</span> <IoMdAdd size={20} />
              </Button>
            
            </div>
       
  
        <div className='grid grid-cols-2 md:grid-cols-4 gap-4 sm:p-5 mt-3 sm:mt-0'>
            {
              posts.map(post=><Link  key={post.id} to={`/post/${post.id}`} > <PostThumbNail imageUrl={post.image as string} title={post.title as string} /></Link>)
            }
        </div>


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
