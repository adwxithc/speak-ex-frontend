import { useSelector } from "react-redux"
import { RootState } from "../../../../../redux/store"
import Avatar from "../../../../ui/Avatar/Avatar"

function UserData() {
    const { userData } = useSelector((state: RootState) => state.user)
  return (

    <div className="">
        <div className='flex gap-2 sm:gap-5 items-center'>
            <Avatar className='h-20 w-20' src={userData?.profile} />
            <div>
                <span className='font-semibold text-xl capitalize'>{userData?.firstName+' '+userData?.lastName}</span>

                <p className='text-orange-400 font-thin max-w-[65vw] truncate'>{userData?.email}</p>
            </div>
        </div>
        <div className="flex gap-2  mt-3 mb-8 justify-evenly overflow-auto">

            <div className= " h-20 w-20 p-3 drop-shadow bg-gray-100 rounded-xl flex flex-col justify-center items-center">
                <img className="h-12 w-12 " src="/src/assets/Images/menuIcon/profile.png" alt="" />
                <span className="text-sm text-gray-700">Profile</span>
            </div>
           
            <div className="h-20 w-20 p-4 drop-shadow bg-gray-100 rounded-xl flex flex-col justify-center items-center gap-1">
                <img className="h-8 w-8" src="/src/assets/Images/menuIcon/gold.png" alt="" />
                <span className="text-sm text-gray-700">00005</span>
            </div>
            <div className="h-20 w-20 p-4 drop-shadow bg-gray-100 rounded-xl flex flex-col justify-center items-center gap-1">
                <img className="h-8 w-8" src="/src/assets/Images/menuIcon/silver.png" alt="" />
                <span className="text-sm text-gray-700">15000</span>
            </div>
            <div className="h-20 w-20 p-4 drop-shadow bg-gray-100 rounded-xl flex flex-col justify-center items-center gap-1">
                <img className="h-8 w-8" src="/src/assets/Images/menuIcon/logout.png" alt="" />
                <span className="text-sm text-gray-700">logout</span>
            </div>
        </div>
    </div>
    
  )
}

export default UserData
