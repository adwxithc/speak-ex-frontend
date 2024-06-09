
import SideBarItem from "../../../components/layout/SideBar/User/UserProfileSideBarItem"
import UserProfileSideBar from "../../../components/layout/SideBar/User/UserProfileSideBar"
import { Outlet, useNavigate, useParams } from "react-router-dom"
import ProfilePicture from "../../../components/custom/profilePicture/ProfilePicture"
import { CircleDollarSign, CircleUser, History, Info, MessageSquareText, Wallet } from "lucide-react"
import { useSelector } from "react-redux"
import { RootState } from "../../../redux/store"
import { useGetUserQuery } from "../../../redux/features/user/user/profileApiSlice"
import { createContext, useEffect } from "react"
import { IUser } from "../../../types/database"


export const ProfileContext = createContext<{ data: IUser | null, isLoading: boolean, error: unknown, self: boolean }>({ data: null, isLoading: true, error: null, self: false })

function Profile() {
  const { userData } = useSelector((state: RootState) => state.user)
  const navigate = useNavigate()
  const { userName } = useParams()

  const { data, isLoading, error, refetch } = useGetUserQuery({ ...{ userName } });
  useEffect(() => {
    refetch()
  }, [refetch, userName])

  return (
    <>
      <ProfileContext.Provider value={{ data: data?.data, isLoading, error, self: userData?.userName === userName }}>
        <div className="bg-secondary h-screen sm:h-auto overflow-hidden sm:px-10 pb-8">


          <div className="flex flex-col sm:flex-row py-5 ">
            <UserProfileSideBar>

              <SideBarItem text="Profile" key='1' icon={<CircleUser />} onClick={() => navigate(``)} />

              {userName === userData?.userName &&
                <>
                  <SideBarItem text="Chat" key='2' icon={<MessageSquareText />} onClick={() => navigate('/chat')} />
                  <SideBarItem text="User Info" key='3' icon={<Info />} onClick={() => navigate('user-info')} />
                  <SideBarItem text="Monetization" key='4' icon={<CircleDollarSign />} onClick={() => navigate('monetization')} />
                  <SideBarItem text="Session History" key='5' icon={<History />} onClick={() => navigate('session-logs')} />
                  <SideBarItem text="Wallet" key='6' icon={<Wallet />} onClick={() => navigate('wallet')} />
                </>
              }
            </UserProfileSideBar>

            <div className="bg-white rounded-xl w-full max-h-screen overflow-x-hidden overflow-y-scroll pretty-scrollbar shadow-md">

              <div className=" h-52 sm:h-0 overflow-hidden">

                <ProfilePicture />

              </div>
              <div className={` sm:hidden flex justify-center gap-8 w-full text-sm text-primary font-semibold mt-2`}>
                <div className='flex flex-col items-center'>  <span>410</span> <span>Followers</span> </div>
                <div className='flex flex-col items-center'>  <span>410</span> <span>Followers</span> </div>
              </div>
              <Outlet />
            </div>

          </div>

        </div>
      </ProfileContext.Provider>
    </>
  )
}

export default Profile
