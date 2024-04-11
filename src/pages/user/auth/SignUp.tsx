
import SignUpContainer from '../../../components/layout/SignUpContainer/SignUpContainer'
import SignUpForm from '../../../components/custom/Form/user/SignUpForm'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { RootState } from '../../../redux/store'

function SignUp() {

  const {isAuth} =useSelector((state:RootState)=>state.user)
  const navigate = useNavigate()
  useEffect(()=>{
    if(isAuth) navigate('/')
  },[])

  const [loading,setLoading] = useState(false)
  return (
    <div>
    <SignUpContainer loading={loading} title="Unlock a World of Languages!" description="Discover new languages and immerse yourself in different cultures through lively conversations on our interactive platform." >
        <SignUpForm setLoading={setLoading} />

    </SignUpContainer>
    </div>
  )
}

export default SignUp
