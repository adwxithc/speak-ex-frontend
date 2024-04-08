
import SignUpContainer from '../../../components/layout/SignUpContainer/SignUpContainer'
import SignUpForm from '../../../components/custom/Auth/SignUpForm'
import { useState } from 'react'

function SignUp() {

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
