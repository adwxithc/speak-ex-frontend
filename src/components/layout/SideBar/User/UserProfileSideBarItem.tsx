
import React, { useContext } from 'react'
import {ProfileSideBarContext} from '../User/UserProfileSideBar'
import ToolTip from '../../../ui/ToolTip/ToolTip';

interface SideBarItem extends React.HTMLAttributes<HTMLLIElement> {
    icon: React.ReactNode;
     text: string;
      active?: boolean;
       alert?: string;
}


function UserProfileSideBarItem({ icon, text, active=false, alert,...props }: SideBarItem) {
    const { expanded } = useContext(ProfileSideBarContext)
    
    return (
        <li
        {...props}
        
         className={` 
    relative flex items-center  py-2 px-2  my-2    font-semibold rounded-md cursor-pointer  text-gray-600
    transition-colors group
    ${active ? "text-black font-semibold" :
                " hover:text-black hover:font-semibold"
            }
    `}>
        <ToolTip  tooltip={text} >
             <span className='text-xl font-extrabold'>{icon}</span>
        </ToolTip>
            <span className={`overflow-hidden transition-all ${expanded ? "w-44 ml-4" : "w-0 h-0"}`}>{text}</span>
            {
                alert && (
                    <div className={`absolute right-2 w-2 h-2 rounded bg-primary ${expanded ? "" : "top-2"}`}></div>
                )
            }

           
        </li>
    )
}

export default UserProfileSideBarItem
