import { IoMdAdd } from "react-icons/io";

import PostThumbNail from "../../../components/custom/PostThumbNail/PostThumbNail"
import Button from "../../../components/ui/Button/Button"

function UsersPosts() {
  return (
    <div>
        <div className="p-2 mb-3 flex justify-end">
            <Button varient={'primary-outline'} size={"md"} className="text-center">Create post <IoMdAdd /></Button>
            
        </div>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-1'>
            <PostThumbNail title="Lorem10" imageUrl="https://m.media-amazon.com/images/I/71fdDUxnt4L._AC_UF1000,1000_QL80_.jpg" />
            <PostThumbNail title="Lorem10 jebrish look " imageUrl="https://media.istockphoto.com/id/1182280267/photo/executive-directors-looking-at-financial-reports.webp?b=1&s=170667a&w=0&k=20&c=hxkYLPlOtIEI3ztOwFoV7JdSw2PQw39kVHZGDv4UhWY=" />
            <PostThumbNail title="ji am fucdkedjksup" imageUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJoiPP0SbZUYRsqpqVtHlQ3uqO5smWeaKeseuim161DQ&s" />
            <PostThumbNail title="ji am fucdkedjksup" imageUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyd2JAgXnXVXNVk3b9T5S9UGHszx9WdJf6zAVQNuU6-g&s" />
            <PostThumbNail title="ji am fucdkedjksup" imageUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMQkLcVBA7gU_n3wQFENOIIvx8bhSqZxLaQg&shttps://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMQkLcVBA7gU_n3wQFENOIIvx8bhSqZxLaQg&s" />
        </div>
    </div>



  )
}

export default UsersPosts
