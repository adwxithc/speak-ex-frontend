
import SideBarItem from "../../components/layout/SideBar/Admin/SideBarItem"
import UserProfileSideBar from "../../components/layout/SideBar/User/UserProfileSideBar"
import { Outlet, useNavigate, useParams } from "react-router-dom"
import ProfilePicture from "../../components/custom/ProfilePicture/ProfilePicture"
import { CircleDollarSign, CircleUser,Info, Wallet } from "lucide-react"
import { useSelector } from "react-redux"
import { RootState } from "../../redux/store"
import { useGetUserQuery } from "../../redux/features/user/user/profileApiSlice"
import { createContext } from "react"
import { IUser } from "../../types/database"
import Navbar from "../../components/layout/NavBar/user/Navbar"
import Footer from "../../components/layout/Footer/Footer"
import UsersPosts from "../user/UsersPosts/UsersPosts"


export const ProfileContext = createContext<{data:IUser|null,isLoading:boolean,error:unknown,self:boolean}>({data:null, isLoading:true, error:null,self:false})

function Test3() {

  
    return (
        <>
        <Navbar/>
        <div className="flex w-full h-screen p-3 gap-3 overflow-y-scroll">
          <div className="w-2/5 h-52 rounded overflow-hidden">
            <ProfilePicture />
          </div>
          <div className="w-full h-screen bg-red-200 rounded overflow-hidden"></div>
            <UsersPosts />
        </div>
        <Footer />
      </>
    )
}

export default Test3
