import { useState } from 'react'
import SignUpContainer from '../../../components/layout/SignUpContainer/SignUpContainer';
import VerifyUserForm from '../../../components/custom/Auth/VerifyUserForm'

function VerifyUser() {
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