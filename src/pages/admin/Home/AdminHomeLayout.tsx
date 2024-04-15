
import AdminNavBar from '../../../components/layout/NavBar/admin/AdminNavBar'
import SideBar from '../../../components/layout/SideBar/SideBar'
import SideBarItem from '../../../components/layout/SideBar/SideBarItem'
import { PiSignOutBold } from "react-icons/pi";
import ToolTip from '../../../components/ui/ToolTip/ToolTip'
import {list} from '../../../components/layout/SideBar/Navigate'
import { Outlet, useNavigate } from 'react-router-dom';
import { useState } from 'react';

function AdminHomeLayout() {
  const [selectedLink, setSelectedLink] = useState<string>(window.location.pathname);
  const navigate=useNavigate()
  return (
    <>
    <div className='flex'>
        
    <SideBar >
    {list.map(item=><SideBarItem onClick={()=>{setSelectedLink(`/admin/${item.link}`);navigate(`/admin/${item.link}`)}} key={item.link} text={item.title} icon={item.icon} active={selectedLink=='/admin/'+item.link?true:false}/>)}
   
    </SideBar>

    <section className='h-screen w-full overflow-y-scroll relative hide-scrollbar'>
    <AdminNavBar>
        <ul>
            <li className='cursor-pointer'>
            <ToolTip tooltip='logout'> <PiSignOutBold className='' size={20}/> </ToolTip>
            </li>
        </ul>
    </AdminNavBar>
    <div className='h-16 mb-3'></div>
    <div className='p-5'>{<Outlet/>}</div>
    
    </section>

    </div>

    </>
    
  )
}

export default AdminHomeLayout
