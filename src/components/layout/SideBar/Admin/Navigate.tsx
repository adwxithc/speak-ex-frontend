import { BiSolidDashboard } from "react-icons/bi";
import { FaUsers } from "react-icons/fa";
import { RiMoneyDollarBoxLine } from "react-icons/ri";
import { MdOutlineTimer } from "react-icons/md";
import { GoGraph } from "react-icons/go";
import { TbMessageReport } from "react-icons/tb";
import { GrLanguage } from "react-icons/gr";

export const list = [
    { title: 'Main', icon: <BiSolidDashboard />, link: '' }, 
    { title: 'Languages', icon: <GrLanguage />, link: 'languages'},
    { title: 'Users', icon: <FaUsers />, link: 'users' },
    { title: 'Monetization', icon: <RiMoneyDollarBoxLine />, link: 'monetisation' },
    { title: 'Credit Time', icon: <MdOutlineTimer />, link: 'credit-time' },
    { title: 'Sales Report', icon: <GoGraph />, link: 'sales-report'},
    { title: 'Users Concerns', icon: <TbMessageReport />, link: 'users-concern'},
    
  
  ];