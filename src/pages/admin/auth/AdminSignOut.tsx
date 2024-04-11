
import { useEffect } from 'react'
import { RiseLoader } from 'react-spinners'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useAdminSignOutMutation } from '../../../redux/features/admin/auth/adminApiSlice'
import { logoutAdmin } from '../../../redux/features/admin/auth/adminSlice'


function AdminSignOut() {

  

    const [logout] = useAdminSignOutMutation()
    const dispatch =useDispatch()

    const navigate= useNavigate()

    const signoutFunc=async()=>{
        try {
            await logout({}).unwrap()
            dispatch(logoutAdmin())
            navigate('/')
        } catch (error) {
            alert('error')
            console.log(error);  
        }   
    }

    useEffect(()=>{
        signoutFunc()
    },[])

  return (
    <div className='relative'>
      <div className="absolute top-0 h-full w-full text-center content-center bg-[#000000e2] z-40"><RiseLoader color="#fff" /></div>
    </div>
  )
}

export default AdminSignOut
