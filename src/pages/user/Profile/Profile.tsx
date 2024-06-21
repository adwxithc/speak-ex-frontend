import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom"
import { useSelector } from "react-redux"
import { RootState } from "../../../redux/store"
import { useGetUserQuery } from "../../../redux/features/user/user/profileApiSlice"
import { createContext, useEffect } from "react"
import { IUser } from "../../../types/database"
import Container from "../../../components/layout/Container/Container"
import ProfileInfo from './ProfileInfo'



const tabs = [
  {
    name: 'Profile',
    link: '',
    private: false

  },
  {
    name: 'Wallet',
    link: 'wallet',
    private: true

  },
  {
    name: 'User Info',
    link: 'user-info',
    private: true

  },
 
  {
    name: 'Monetization',
    link: 'monetization',
    private: true

  },
  {
    name: 'Session History',
    link: 'session-logs',
    private: true

  },
  

]

export const ProfileContext = createContext<{ data: IUser &{rating:number} | null, isLoading: boolean, error: unknown, self: boolean }>({ data: null, isLoading: true, error: null, self: false })

function Profile() {


  const { userData } = useSelector((state: RootState) => state.user)
  const navigate = useNavigate()
  const { userName = '' } = useParams()
  const location = useLocation();

  const loc = location?.pathname?.split(userName)[1]
  const selectedLoc = loc === '' ? '/' : loc




  const { data, isLoading, error, refetch } = useGetUserQuery({ ...{ userName } });
 
  
  useEffect(() => {
    refetch()
  }, [refetch, userName])

  const handleClick = (link: string) => {
    navigate(link)
  }

  return (
    <>
      <Container className="md:px-10 lg:px-32 px-0  sm:px-4 bg-secondary">
        <ProfileContext.Provider value={{ data: data?.data, isLoading, error, self: userData?.userName === userName }}>
          <div className="  bg-white shadow-md overflow-hidden ">
            <ProfileInfo />

            <div className="px-3  md:flex block">

              <aside className=" w-full md:w-52 flex md:block  h-full overflow-hidden px-3 text-black/50 transition-colors duration-500 overflow-x-auto">
                {
                  tabs.map((item) => (
                    item.private && userName !== userData?.userName ? <></> : <span className="flex justify-center"> <button className={` mx-2  capitalize p-2 md:mx-0 md:mb-3  ease-in hover:text-primary transition-all  border-primary  duration-400  whitespace-nowrap font-semibold ${('/' + item.link == selectedLoc) && 'border-b-4 text-primary '}  `} onClick={() => handleClick(item.link,)} key={item.name} >{item.name}</button></span>
                  ))
                }
              </aside>

              <div className="flex-1  md:border-l">
                <Outlet />
              </div>
            </div>

          </div>
        </ProfileContext.Provider>
      </Container>
    </>
  )
}

export default Profile