
import { useState } from 'react'
import SignUpContainer from '../../../../components/layout/signUpContainer/SignUpContainer'
import ForgotPasswordForm from '../../../../components/custom/form/user/ForgotPasswordForm'

function ForgotPassword() {
    const [loading,setLoading] = useState(false)
  return (
    <div>
    <SignUpContainer title="Unlock a World of Languages!" description="Discover new languages and immerse yourself in different cultures through lively conversations on our interactive platform." loading={loading} >
        <ForgotPasswordForm setLoading={setLoading} />

    </SignUpContainer>
    </div>
  )
}

export default ForgotPassword
