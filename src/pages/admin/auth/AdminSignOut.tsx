
import { useCallback, useEffect } from 'react'
import { RiseLoader } from 'react-spinners'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useAdminSignOutMutation } from '../../../redux/features/admin/auth/adminAuthApiSlice'
import { logoutAdmin } from '../../../redux/features/admin/auth/adminSlice'


function AdminSignOut() {

  

    const [logout] = useAdminSignOutMutation()
    const dispatch =useDispatch()

    const navigate= useNavigate()

    const signoutFunc=useCallback( async()=>{
        try {
            await logout({}).unwrap()
            dispatch(logoutAdmin())
            navigate('/admin/signin')
        } catch (error) {
            alert('error')
            console.log(error);  
        }   
    },[dispatch, logout, navigate])

    useEffect(()=>{
        signoutFunc()
    },[signoutFunc])

  return (
    <div className='relative'>
      <div className="absolute top-0 h-full w-full text-center content-center bg-[#000000e2] z-40"><RiseLoader color="#fff" /></div>
    </div>
  )
}

export default AdminSignOut
