import React from 'react'

function AdminNavBar({ children }: { children: React.ReactNode }) {
    return (
        <nav className='bg-primary w-full text-white  absolute top-0  h-16 drop-shadow-md  items-center flex justify-end'>
            <div className='mr-8 relative'>
                
                {children}
            </div>

        </nav>
    )
}

export default AdminNavBar
