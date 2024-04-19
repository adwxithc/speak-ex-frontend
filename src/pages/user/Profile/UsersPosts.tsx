import { IoMdAdd } from "react-icons/io";
import { AnimatePresence } from "framer-motion";

import PostThumbNail from "../../../components/custom/PostThumbNail/PostThumbNail"
import Button from "../../../components/ui/Button/Button"
import { useState } from "react";
import Modal from "../../../components/custom/Modal/Modal";
import CreatePost from "../CreatePost/CreatePost";


function UsersPosts() {
  const [modalOpen, setModalOpen ] = useState(false)
  return (
    <div>
            <div className="p-2 mb-3 flex justify-end mt-5">
            
              
              <Button varient={'primary-outline'} size={"md"} className="text-center" onClick={()=>setModalOpen(true)}>
                <span className="hidden sm:inline">Create post</span> <IoMdAdd size={20} />
              </Button>
              
            
            
            </div>
       
  
        <div className='grid grid-cols-2 md:grid-cols-4 gap-4 sm:p-3 mt-3 sm:mt-0'>
            
            <PostThumbNail title="Lorem10 jebrish look " imageUrl="https://media.istockphoto.com/id/1182280267/photo/executive-directors-looking-at-financial-reports.webp?b=1&s=170667a&w=0&k=20&c=hxkYLPlOtIEI3ztOwFoV7JdSw2PQw39kVHZGDv4UhWY=" />
            <PostThumbNail title="Lorem10 jebrish look " imageUrl="https://media.istockphoto.com/id/1182280267/photo/executive-directors-looking-at-financial-reports.webp?b=1&s=170667a&w=0&k=20&c=hxkYLPlOtIEI3ztOwFoV7JdSw2PQw39kVHZGDv4UhWY=" />
            <PostThumbNail title="Lorem10 jebrish look " imageUrl="https://media.istockphoto.com/id/1182280267/photo/executive-directors-looking-at-financial-reports.webp?b=1&s=170667a&w=0&k=20&c=hxkYLPlOtIEI3ztOwFoV7JdSw2PQw39kVHZGDv4UhWY=" />
           <PostThumbNail title="Lorem10 jebrish look " imageUrl="https://media.istockphoto.com/id/1182280267/photo/executive-directors-looking-at-financial-reports.webp?b=1&s=170667a&w=0&k=20&c=hxkYLPlOtIEI3ztOwFoV7JdSw2PQw39kVHZGDv4UhWY=" />
            
            <PostThumbNail title="ji am fucdkedjksup" imageUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyd2JAgXnXVXNVk3b9T5S9UGHszx9WdJf6zAVQNuU6-g&s" />
            <PostThumbNail title="ji am fucdkedjksup" imageUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMQkLcVBA7gU_n3wQFENOIIvx8bhSqZxLaQg&shttps://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMQkLcVBA7gU_n3wQFENOIIvx8bhSqZxLaQg&s" />
        </div>

        <AnimatePresence
        initial={false}
        mode="wait"
        >
        {modalOpen && <Modal  handleClose={()=>{setModalOpen(false)}} ><CreatePost /></Modal>}
        </AnimatePresence>
    </div>



  )
}

export default UsersPosts
