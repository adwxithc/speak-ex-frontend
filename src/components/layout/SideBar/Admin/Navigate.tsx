import { BiSolidDashboard } from "react-icons/bi";
import { FaUsers } from "react-icons/fa";
import { RiMoneyDollarBoxLine } from "react-icons/ri";
import { MdOutlineTimer } from "react-icons/md";
import { TbMessageReport } from "react-icons/tb";
import { GrLanguage } from "react-icons/gr";
import { MessageSquareWarning } from "lucide-react";

export const list = [
    { title: 'Main', icon: <BiSolidDashboard />, link: '' }, 
    { title: 'Languages', icon: <GrLanguage />, link: 'languages'},
    { title: 'Users', icon: <FaUsers />, link: 'users' },
    { title: 'Monetization', icon: <RiMoneyDollarBoxLine />, link: 'monetisation' },
    { title: 'Credit Time', icon: <MdOutlineTimer />, link: 'credit-time' },
    { title: 'Report Management', icon: <MessageSquareWarning />, link: 'report-management'},
    { title: 'Users Concerns', icon: <TbMessageReport />, link: 'users-concern'},
    
  
  ];