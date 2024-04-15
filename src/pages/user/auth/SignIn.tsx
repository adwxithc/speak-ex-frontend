
import SignUpContainer from '../../../components/layout/SignUpContainer/SignUpContainer'
import SignInForm from '../../../components/custom/Form/user/SignInForm'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../../redux/store'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'


function SignIn() {
  const {t} = useTranslation(['auth'])
  const {isAuth} =useSelector((state:RootState)=>state.user)
  const navigate = useNavigate()
  useEffect(()=>{
    if(isAuth) navigate('/')
  },[])

const [loading,setLoading] = useState(false)

  return (
    <div>
    <SignUpContainer title={t('authContainerHeader',{ns:'auth'})} description={t('authContainerDescription',{ns:'auth'})} loading={loading} >
        <SignInForm setLoading={setLoading} />

    </SignUpContainer>
    </div>
  )
}

export default SignIn
