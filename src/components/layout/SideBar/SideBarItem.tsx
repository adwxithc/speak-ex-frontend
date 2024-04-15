import React, { useContext } from 'react'
import { SideBarContext } from './SideBar'
import { useNavigate } from 'react-router-dom'

interface SideBarItem extends React.HTMLAttributes<HTMLLIElement> {
    icon: React.ReactNode;
     text: string;
      active?: boolean;
    
       alert?: string;
}


function SideBarItem({ icon, text, active=false, alert,...props }: SideBarItem) {
    const { expanded } = useContext(SideBarContext)
    const navigate = useNavigate()
    return (
        <li
        {...props}
        
         className={` 
    relative flex items-center  py-3 px-4  my-2    font-medium rounded-md cursor-pointer  text-gray-700
    transition-colors group
    ${active ? "bg-primary text-white" :
                "hover:bg-primary hover:text-white"
            }
    `}>
             <span className='text-xl font-extrabold'>{icon}</span>
            
            <span className={`overflow-hidden transition-all ${expanded ? "w-44 ml-4" : "w-0 h-0"}`}>{text}</span>
            {
                alert && (
                    <div className={`absolute right-2 w-2 h-2 rounded bg-primary ${expanded ? "" : "top-2"}`}></div>
                )
            }

            
            {
                !expanded && <div
                    className={`absolute left-full rounded-md px-2 py-1 ml-6 z-10
            bg-primary text-white text-sm whitespace-nowrap
            invisible opacity-20 -translate-x-3 transition-all
            group-hover:visible group-hover:opacity-100 group-hover:translate-x-0
            `}
                >{text}</div>
            }
        </li>
    )
}

export default SideBarItem
