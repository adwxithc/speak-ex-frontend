
import SideBarItem from "../../../components/layout/SideBar/User/UserProfileSideBarItem"
import UserProfileSideBar from "../../../components/layout/SideBar/User/UserProfileSideBar"
import { Outlet, useNavigate } from "react-router-dom"
import ProfilePicture from "../../../components/custom/ProfilePicture/ProfilePicture"
import { CircleDollarSign, CircleUser,Info, Wallet } from "lucide-react"

function Profile() {
  const navigate =useNavigate()
    return (
        <>
      
        <div className="bg-secondary h-screen overflow-hidden sm:px-10 mb-8">
  
  
          <div className="flex flex-col sm:flex-row py-5">
            <UserProfileSideBar>

              <SideBarItem text="Profile" key='1' icon={<CircleUser />} onClick={()=>navigate('/profile')} />
              <SideBarItem text="User Info" key='2' icon={<Info />} onClick={()=>navigate('/profile/user-info')}  />
              <SideBarItem text="Monetization" key='3' icon={<CircleDollarSign />} />
              <SideBarItem text="Wallet" key='5' icon={<Wallet />} />
            </UserProfileSideBar>
  
            <div className="bg-white rounded-xl shadow-sm w-full max-h-screen overflow-x-hidden overflow-y-scroll pretty-scrollbar  ">

              <div className="sm:hidden h-52 sm:h-0">
              <ProfilePicture />
              </div>
              
                <Outlet />
            </div>
  
          </div>
  
        </div>
      </>
    )
}

export default Profile
