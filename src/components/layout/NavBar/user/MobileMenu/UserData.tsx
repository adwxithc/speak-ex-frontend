import { useSelector } from "react-redux"
import { RootState } from "../../../../../redux/store"
import Avatar from "../../../../ui/Avatar/Avatar"
import { useNavigate } from "react-router-dom"
import { DisclosureButton } from "@headlessui/react"

function UserData() {
    const { userData } = useSelector((state: RootState) => state.user)
    const { wallet } = useSelector((state: RootState) => state.user)
    const navigate =  useNavigate()
  
  return (

    <div className="">
        <div className='flex gap-2 sm:gap-5 items-center'>
            <Avatar className='h-20 w-20' src={userData?.profile} />
            <div className="flex flex-col items-start">
                <span className='font-semibold text-xl capitalize'>{userData?.firstName+' '+userData?.lastName}</span>

                <p className='text-orange-400 font-thin max-w-[65vw] truncate'>{userData?.email}</p>
            </div>
        </div>
        <div className="flex gap-2  mt-3 mb-8 justify-evenly overflow-auto">

            <DisclosureButton className= " h-20 w-20 p-3 drop-shadow bg-gray-100 rounded-xl flex flex-col justify-center items-center"  onClick={()=>navigate(`/profile/${userData?.userName}`)}>
                <img className="h-12 w-12 " src="/Images/icons/profile.webp" alt="profile" />
                <span className="text-sm text-gray-700">Profile</span>
            </DisclosureButton>
           
            <DisclosureButton className="h-20 w-20 p-4 drop-shadow bg-gray-100 rounded-xl flex flex-col justify-center items-center gap-1" onClick={()=>navigate(`/profile/${userData?.userName}/wallet`)}>
                <img className="h-8 w-8" src="/Images/Coins/gold.webp" alt="gold coins" />
                <span className="text-sm text-gray-700">{wallet?.goldCoins||0}</span>
            </DisclosureButton>
            <DisclosureButton className="h-20 w-20 p-4 drop-shadow bg-gray-100 rounded-xl flex flex-col justify-center items-center gap-1" onClick={()=>navigate(`/profile/${userData?.userName}/wallet`)}>
                <img className="h-8 w-8" src="/Images/Coins/silver.webp" alt="silver coins" />
                <span className="text-sm text-gray-700">{wallet?.silverCoins||0}</span>
            </DisclosureButton>
            <DisclosureButton className="h-20 w-20 p-4 drop-shadow bg-gray-100 rounded-xl flex flex-col justify-center items-center gap-1" onClick={()=>navigate('/signout')}>
                <img className="h-8 w-8" src="/Images/icons/logout.webp" alt="logout" />
                <span className="text-sm text-gray-700">logout</span>
            </DisclosureButton>
        </div>
    </div>
    
  )
}

export default UserData
