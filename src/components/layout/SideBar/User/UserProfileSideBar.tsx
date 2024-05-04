
import { createContext, useEffect, useState } from 'react'
import { IoMdClose, IoMdMenu } from "react-icons/io";
import ProfilePicture from '../../../custom/ProfilePicture/ProfilePicture';



export const ProfileSideBarContext = createContext({ expanded: true })
function UserProfileSideBar({ children }: { children: React.ReactNode }) {
    const [expanded, setExpanded] = useState(true)
    useEffect(() => {
       
          if (window.innerWidth <= 768) {
            setExpanded(false);
          }
    
      }, []);

    return (

        <aside className={`w-full sm:w-auto z-0 sm:mr-5 ${expanded && 'h-screen sm:h-full'} bg-white  shadow-md sm:rounded-xl  overflow-hidden `}>


            <div className='relative'>
                <div className={`${expanded ? 'right-0' : 'left-3'} sm:absolute top-0`}>
                    <button onClick={() => setExpanded(cur => !cur)} className=' p-1.5 text-xl drop-shadow-lg '>
                        {expanded ? <IoMdClose /> : <IoMdMenu />}
                    </button>
                </div>
                <nav className={` flex flex-col  transition-all ${expanded ? 'w-full h-full' : ' w-0 h-0 sm:h-full sm:w-full'}`}>
                    <div className='pb-2 hidden sm:flex justify-between items-center  mb-5 '>

                        <div className={`transition-all  ${expanded ? "w-96 h-52 " : "w-0 h-0"}`}>
                            <ProfilePicture />
                            
                        </div>
                    </div>

                    <ProfileSideBarContext.Provider value={{ expanded }}>
                        <div className=' flex justify-center gap-8 w-full text-sm text-primary font-semibold '>
                            <div className='flex flex-col items-center'>  <span>410</span> <span>Followers</span> </div>
                            <div className='flex flex-col items-center'>  <span>410</span> <span>Followers</span> </div>        
                        </div>
                        <ul className={`flex-1 px-3 ${expanded && 'px-4'}`}>{children}</ul>
                    </ProfileSideBarContext.Provider>

                </nav>
            </div>



        </aside>


    )
}

export default UserProfileSideBar
