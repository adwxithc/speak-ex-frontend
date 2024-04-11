import { useEffect, useState } from 'react'
import SignUpContainer from '../../../components/layout/SignUpContainer/SignUpContainer'
import AdminSignInForm from '../../../components/custom/Form/admin/AdminSignInForm'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { RootState } from '../../../redux/store'

function AdminSignin() {
  const {isAuth} =useSelector((state:RootState)=>state.admin)
  const navigate = useNavigate()
  useEffect(()=>{
    if(isAuth) navigate('/admin')
  },[])
  const [loading,setLoading] = useState(false)
  return (
    <div>
    <SignUpContainer title="Unlock a World of Languages!" description="Discover new languages and immerse yourself in different cultures through lively conversations on our interactive platform." loading={loading} >
      <AdminSignInForm setLoading={setLoading} />
    </SignUpContainer>
    </div>
  )
}

export default AdminSignin
