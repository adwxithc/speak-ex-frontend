
import SignUpContainer from '../../../components/layout/SignUpContainer/SignUpContainer'
import SignInForm from '../../../components/custom/Auth/SignInForm'
import { useState } from 'react'


function SignIn() {

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
