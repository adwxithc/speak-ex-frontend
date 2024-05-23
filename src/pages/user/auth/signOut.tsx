
import { useCallback, useEffect } from 'react'
import { RiseLoader } from 'react-spinners'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import { useSignOutMutation } from '../../../redux/features/user/user/userApiSlice'
import { removeCridentials } from '../../../redux/features/user/user/userSlice'



function SignOut() {

  

    const [logout] = useSignOutMutation()
    const dispatch =useDispatch()

    const navigate= useNavigate()

    const signoutFunc=useCallback( async()=>{
        try {
            await logout({}).unwrap()
            dispatch(removeCridentials())
            navigate('/')
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

export default SignOut
