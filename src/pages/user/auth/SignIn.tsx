
import SignUpContainer from '../../../components/layout/SignUpContainer/SignUpContainer'
import SignInForm from '../../../components/custom/Form/user/SignInForm'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../../redux/store'
import { useNavigate } from 'react-router-dom'


function SignIn() {
  const {isAuth} =useSelector((state:RootState)=>state.user)
  const navigate = useNavigate()
  useEffect(()=>{
    if(isAuth) navigate('/')
  },[])

const [loading,setLoading] = useState(false)

  return (
    <div>
    <SignUpContainer title="Unlock a World of Languages!" description="Discover new languages and immerse yourself in different cultures through lively conversations on our interactive platform." loading={loading} >
        <SignInForm setLoading={setLoading} />

    </SignUpContainer>
    </div>
  )
}

export default SignIn
