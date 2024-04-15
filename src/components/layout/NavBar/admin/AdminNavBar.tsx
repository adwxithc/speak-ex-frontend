import React from 'react'

function AdminNavBar({ children }: { children: React.ReactNode }) {
  return (
    <nav className='bg-primary w-full text-white z-40 absolute h-16 drop-shadow-md flex items-center justify-end'>
        <div className=' mr-8 flex'>
            {children}
        </div>
    
    </nav>
  )
}

export default AdminNavBar
