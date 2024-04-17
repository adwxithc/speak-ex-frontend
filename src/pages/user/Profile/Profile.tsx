import { CgProfile } from "react-icons/cg"
import SideBarItem from "../../../components/layout/SideBar/User/UserProfileSideBarItem"
import UserProfileSideBar from "../../../components/layout/SideBar/User/UserProfileSideBar"
import { IoMdInformationCircleOutline } from "react-icons/io"
import { MdOutlineMonetizationOn } from "react-icons/md"
import { AiOutlinePicture } from "react-icons/ai"
import { IoWalletOutline } from "react-icons/io5"
import { Outlet } from "react-router-dom"

function Profile() {
    return (
        <>
      
        <div className="bg-secondary h-screen overflow-hidden sm:px-10">
  
  
          <div className="flex flex-col sm:flex-row py-5">
            <UserProfileSideBar>
              <SideBarItem text="Profile" key='1' icon={<CgProfile />} />
              <SideBarItem text="User Info" key='1' icon={<IoMdInformationCircleOutline />} />
              <SideBarItem text="Monetization" key='2' icon={<MdOutlineMonetizationOn />} />
              <SideBarItem text="Create Post" key='3' icon={<AiOutlinePicture />} />
              <SideBarItem text="Wallet" key='4' icon={<IoWalletOutline />} />
            </UserProfileSideBar>
  
            <div className="bg-white rounded-xl shadow-sm w-full max-h-screen overflow-x-hidden overflow-y-scroll hide-scrollbar p-8">
                <Outlet />
            </div>
  
          </div>
  
  
        </div>
      </>
    )
}

export default Profile
