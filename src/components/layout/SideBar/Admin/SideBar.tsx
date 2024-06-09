import React, { createContext, useState } from 'react'
import Button from '../../../ui/Button/Button'
import { useNavigate } from 'react-router-dom'
import { ArrowLeftToLine, ArrowRightToLine, LogOut } from 'lucide-react'
import { useSelector } from 'react-redux'
import { RootState } from '../../../../redux/store'


export const SideBarContext = createContext({ expanded: true })
function SideBar({ children }: { children: React.ReactNode }) {
    const [expanded, setExpanded] = useState(true)
    const navigate = useNavigate()
    const { adminData } = useSelector((state: RootState) => state.admin)

    return (
        
        <aside className='h-screen z-0'>
            <nav className='h-full flex flex-col bg-white border-r shadow-sm'>
                <div className='p-4 pb-2 flex justify-between items-center  mb-5 h-16 border-b-2 '>
                    <img src="https://img.logoipsum.com/243.svg" className={`overflow-hidden transition-all ${expanded ? "w-32" : "w-0"}`} alt="" />
                    <button onClick={() => setExpanded(cur => !cur)} className='p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100 text-black/70 '>
                        {expanded ?  <ArrowLeftToLine size={20} />:<ArrowRightToLine size={20} /> }

                    </button>

                </div>
                <SideBarContext.Provider value={{ expanded }}>
                    <ul className={`flex-1 px-3 ${expanded && 'px-4'}`}>{children}</ul>
                </SideBarContext.Provider>
                <div className='border-t flex p-3'>
                    <img src="/src/assets/Images/placeholder/nopic.jpg"
                        alt=""
                        className={` h-10 rounded-full `}
                    />

                    <div className={`flex justify-between items-center  overflow-hidden transition-all ${expanded ? "w-44 ml-3" : "w-0"} `}>
                        <div className='leading-4'>
                            <h4 className='font-semibold'>Admin</h4>
                            <span className='text-xs text-gray-600'>{adminData?.email}</span>
                        </div>
                        <Button type='button' className='hover:bg-black/10 transition-colors duration-500' size={'icon'} onClick={()=>navigate('/admin/signout')} ><LogOut className='text-black/80' size={21} />  </Button>
                    </div>

                </div >
            </nav>

        </aside>
        
       
    )
}

export default SideBar
