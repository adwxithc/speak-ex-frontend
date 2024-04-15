import { ChevronLeftIcon } from '@heroicons/react/24/outline'
import React, { createContext, useState } from 'react'
import { LuChevronFirst, LuChevronLast } from 'react-icons/lu'

export const SideBarContext = createContext({ expanded: true })
function SideBar({ children }: { children: React.ReactNode }) {
    const [expanded, setExpanded] = useState(true)

    return (
        
        <aside className='h-screen z-0'>
            <nav className='h-full flex flex-col bg-white border-r shadow-sm'>
                <div className='p-4 pb-2 flex justify-between items-center  mb-5 h-16 border-b-2 '>
                    <img src="https://img.logoipsum.com/243.svg" className={`overflow-hidden transition-all ${expanded ? "w-32" : "w-0"}`} alt="" />
                    <button onClick={() => setExpanded(cur => !cur)} className='p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100'>
                        {expanded ? <LuChevronFirst /> : <LuChevronLast />}
                    </button>

                </div>
                <SideBarContext.Provider value={{ expanded }}>
                    <ul className={`flex-1 px-3 ${expanded && 'px-4'}`}>{children}</ul>
                </SideBarContext.Provider>
                <div className='border-t flex p-3'>
                    <img src="https://i.pinimg.com/736x/0d/64/98/0d64989794b1a4c9d89bff571d3d5842.jpg"
                        alt=""
                        className={` h-10 rounded-full `}
                    />
                    <div className={`flex justify-between items-center  overflow-hidden transition-all ${expanded ? "w-44 ml-3" : "w-0"} `}>
                        <div className='leading-4'>
                            <h4 className='font-semibold'>Admin</h4>
                            <span className='text-xs text-gray-600'>admn@gmail.com</span>
                        </div>
                        <ChevronLeftIcon className='w-5' />
                    </div>
                </div >
            </nav>

        </aside>
        
       
    )
}

export default SideBar
