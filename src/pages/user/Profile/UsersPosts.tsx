import { IoMdAdd } from "react-icons/io";

import PostThumbNail from "../../../components/custom/PostThumbNail/PostThumbNail"
import Button from "../../../components/ui/Button/Button"

function UsersPosts() {
  return (
    <div>
            <div className="p-2 mb-3 flex justify-end">
            <Button varient={'primary-outline'} size={"md"} className="text-center">
            <span className="hidden sm:inline">Create post</span> <IoMdAdd size={20} /></Button>
            
            </div>
        <div className="flex gap-5 font-semibold justify-center my-5 text-lg text-primary  py-2">
            <div className="flex flex-col items-center"><span>3</span> <span>posts</span></div>
            <div className="flex flex-col items-center"><span>145</span> <span>followers</span></div>
            <div className="flex flex-col items-center"><span>250</span> <span>following</span></div>
        </div>
  
        <div className='grid grid-cols-2 md:grid-cols-3 gap-1'>
            
            <PostThumbNail title="Lorem10 jebrish look " imageUrl="https://media.istockphoto.com/id/1182280267/photo/executive-directors-looking-at-financial-reports.webp?b=1&s=170667a&w=0&k=20&c=hxkYLPlOtIEI3ztOwFoV7JdSw2PQw39kVHZGDv4UhWY=" />
            <PostThumbNail title="Lorem10 jebrish look " imageUrl="https://media.istockphoto.com/id/1182280267/photo/executive-directors-looking-at-financial-reports.webp?b=1&s=170667a&w=0&k=20&c=hxkYLPlOtIEI3ztOwFoV7JdSw2PQw39kVHZGDv4UhWY=" />
            <PostThumbNail title="Lorem10 jebrish look " imageUrl="https://media.istockphoto.com/id/1182280267/photo/executive-directors-looking-at-financial-reports.webp?b=1&s=170667a&w=0&k=20&c=hxkYLPlOtIEI3ztOwFoV7JdSw2PQw39kVHZGDv4UhWY=" />
           <PostThumbNail title="Lorem10 jebrish look " imageUrl="https://media.istockphoto.com/id/1182280267/photo/executive-directors-looking-at-financial-reports.webp?b=1&s=170667a&w=0&k=20&c=hxkYLPlOtIEI3ztOwFoV7JdSw2PQw39kVHZGDv4UhWY=" />
            
            <PostThumbNail title="ji am fucdkedjksup" imageUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyd2JAgXnXVXNVk3b9T5S9UGHszx9WdJf6zAVQNuU6-g&s" />
            <PostThumbNail title="ji am fucdkedjksup" imageUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMQkLcVBA7gU_n3wQFENOIIvx8bhSqZxLaQg&shttps://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMQkLcVBA7gU_n3wQFENOIIvx8bhSqZxLaQg&s" />
        </div>
    </div>



  )
}

export default UsersPosts
