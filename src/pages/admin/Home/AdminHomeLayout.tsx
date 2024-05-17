
import AdminNavBar from '../../../components/layout/NavBar/admin/AdminNavBar'
import SideBar from '../../../components/layout/SideBar/Admin/SideBar'
import SideBarItem from '../../../components/layout/SideBar/Admin/SideBarItem'
import { PiSignOutBold } from "react-icons/pi";
import ToolTip from '../../../components/ui/ToolTip/ToolTip'
import {list} from '../../../components/layout/SideBar/Admin/Navigate'
import { Outlet, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Button from '../../../components/ui/Button/Button';

function AdminHomeLayout() {
  const [selectedLink, setSelectedLink] = useState<string>(window.location.pathname);
  const navigate=useNavigate()
  return (
    <>
    <div className='flex bg-[#FAFBFC]'>
    <AdminNavBar>
        <ul>
            <li className='cursor-pointer'>
            <ToolTip tooltip='logout'> <Button type='button' className='hover:bg-[#00000071]  bg-transparent' size={'icon'} onClick={()=>navigate('/admin/signout')} > <PiSignOutBold className='' size={20}/> </Button>  </ToolTip>
            </li>
        </ul>
    </AdminNavBar>
    <SideBar >
    {list.map(item=><SideBarItem onClick={()=>{setSelectedLink(`/admin/${item.link}`);navigate(`/admin/${item.link}`)}} key={item.link} text={item.title} icon={item.icon} active={selectedLink=='/admin/'+item.link?true:false}/>)}
   
    </SideBar>
   
    <section className='h-screen w-full overflow-y-scroll   hide-scrollbar'>
  
    <div className='h-16'></div>
    <div className=' py-3 md:p-5 '>{<Outlet/>}</div>
    
    </section>

    </div>

    </>
    
  )
}

export default AdminHomeLayout
