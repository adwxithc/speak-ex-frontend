import { useEffect, useState } from 'react'
import SignUpContainer from '../../../components/layout/SignUpContainer/SignUpContainer';
import VerifyUserForm from '../../../components/custom/Form/user/VerifyUserForm'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../../../redux/store';

function VerifyUser() {

  const {isAuth} =useSelector((state:RootState)=>state.user)
  const navigate = useNavigate()
  useEffect(()=>{
    if(isAuth) navigate('/')
  },[isAuth, navigate])
    const [loading,setLoading] = useState(false)
  return (
    <div>
    <SignUpContainer loading={loading} title="Unlock a World of Languages!" description="Discover new languages and immerse yourself in different cultures through lively conversations on our interactive platform.">
        <VerifyUserForm setLoading={setLoading} />
    </SignUpContainer>
    </div>
  )
}

export default VerifyUser