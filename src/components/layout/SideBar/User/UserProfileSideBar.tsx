
import  { createContext, useState } from 'react'
import { IoMdClose,IoMdMenu } from "react-icons/io";



export const ProfileSideBarContext = createContext({ expanded: true })
function UserProfileSideBar({ children }: { children: React.ReactNode }) {
    const [expanded, setExpanded] = useState(true)

    return (
        
        <aside className={`w-full sm:w-auto z-0 sm:mr-8 ${expanded && 'h-screen'} bg-white  drop-shadow-md rounded-xl  overflow-hidden `}>

            
            <div className=''>
            <div className={`${expanded ?'right-0': 'static left-3'} sm:absolute top-0 `}>
                <button onClick={() => setExpanded(cur => !cur)} className=' p-1.5 text-xl drop-shadow-lg '>
                    {expanded ? <IoMdClose /> : <IoMdMenu />}
                </button>
            </div>
            <nav className={` flex flex-col  transition-all ${expanded?'w-full h-full':' w-0 h-0 sm:h-full sm:w-full'}`}>
                <div className='pb-2 hidden sm:flex justify-between items-center  mb-5 '>
                   
                   

                    
                    <div className={`  bg-[url('/Images/userProfile/cover.avif')] transition-all  ${expanded ? "w-96 h-52 " : "w-0 h-0"}`} >

                    <div className='bg-gradient-to-t from-black to-transparent h-full w-full flex  flex-col justify-center items-center'>
                      
                        <div className={`rounded-full overflow-hidden  border-2 border-secondary bg-[#718bff] transition-all ${expanded ? "w-24 h-24" : "w-0 h-0"}`}>
                            <img className='object-cover' src="https://png.pngtree.com/png-clipart/20230927/original/pngtree-man-avatar-image-for-profile-png-image_13001877.png" alt="" />
                        </div>
                        <div className='text-white flex flex-col items-center'>
                            <h1 className='font-semibold'>Adwaith C</h1>
                            <h2 className='text-sm'>adwaithjanardhanan0@gmail.com</h2>
                        </div>
                     
                    </div>
                    

                    </div>
                   
                   
                </div>

                <ProfileSideBarContext.Provider value={{ expanded }}>
                    <ul className={`flex-1 px-3 ${expanded && 'px-4'}`}>{children}</ul>
                </ProfileSideBarContext.Provider>
          
            </nav>
            </div>
           

           
        </aside>
        
       
    )
}

export default UserProfileSideBar
