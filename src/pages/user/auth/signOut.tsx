
import { useEffect } from 'react'
import { RiseLoader } from 'react-spinners'
import { useSignOutMutation } from '../../../redux/features/user/auth/userApiSlice'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { logoutUser } from '../../../redux/features/user/auth/userSlice'






function SignOut() {

  

    const [logout] = useSignOutMutation()
    const dispatch =useDispatch()

    const navigate= useNavigate()

    const signoutFunc=async()=>{
        try {
            await logout({}).unwrap()
            dispatch(logoutUser())
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

export default SignOut
