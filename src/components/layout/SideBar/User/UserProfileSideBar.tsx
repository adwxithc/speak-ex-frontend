import { createContext, useContext, useEffect, useState } from 'react'

import ProfilePicture from '../../../custom/ProfilePicture/ProfilePicture';
import { ProfileContext } from '../../../../pages/user/Profile/Profile';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';


export const ProfileSideBarContext = createContext({ expanded: true })
function UserProfileSideBar({ children }: { children: React.ReactNode }) {
    const [expanded, setExpanded] = useState(true)
    const { data } = useContext(ProfileContext)
    useEffect(() => {

        if (window.innerWidth <= 768) {
            setExpanded(false);
        }

    }, []);

    return (

        <aside className={`w-full sm:w-auto z-0 sm:mr-5 ${expanded && 'h-screen sm:h-full'} bg-white  shadow-md sm:rounded-xl  overflow-hidden `}>
            <div className='relative'>
                <div className={`${expanded ? 'right-0' : 'left-3'} sm:absolute top-0`}>
                    <button onClick={() => setExpanded(cur => !cur)} className=' p-1.5 text-xl text-primary drop-shadow-lg '>
                        {expanded ? <X /> : <Menu />}
                    </button>
                </div>
                <nav className={` flex flex-col  transition-all ${expanded ? 'w-full h-full' : ' w-0 h-0 sm:h-full sm:w-full'}`}>
                    <div className='pb-2 hidden sm:flex justify-between items-center  mb-5 '>

                        <div className={`transition-all  ${expanded ? "w-96 h-60 " : "w-0 h-0"}`}>
                            <ProfilePicture />

                        </div>
                    </div>

                    <ProfileSideBarContext.Provider value={{ expanded }}>
                        <div className={`  justify-center gap-3 w-full text-sm text-primary  hidden  ${expanded ? 'sm:flex' : 'hidden'} `}>
                            <Link to={`/profile/${data?.userName}/follow/followers`}><div className='cursor-pointer hover:border-b border-primary'><span className='font-semibold' >{data?.followers.length}</span> followers</div></Link>
                            <Link to={`/profile/${data?.userName}/follow/followings`}><div className='cursor-pointer hover:border-b border-primary'> <span className='font-semibold'>{data?.following.length}</span> following</div></Link>
                        </div>
                        <ul className={`flex-1 px-3 ${expanded && 'px-4'}`}>{children}</ul>
                    </ProfileSideBarContext.Provider>

                </nav>
            </div>



        </aside>


    )
}

export default UserProfileSideBar
