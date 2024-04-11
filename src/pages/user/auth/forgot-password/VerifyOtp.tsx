
import { useState } from 'react'
import SignUpContainer from '../../../../components/layout/SignUpContainer/SignUpContainer'
import VerifyOtpForm from '../../../../components/custom/Form/user/VerifyOtpForm'

function VerifyOtp() {
    const [loading,setLoading] = useState(false)
    return (
      <div>
      <SignUpContainer loading={loading} title="Unlock a World of Languages!" description="Discover new languages and immerse yourself in different cultures through lively conversations on our interactive platform.">
          <VerifyOtpForm setLoading={setLoading} />
      </SignUpContainer>
      </div>
    )
}

export default VerifyOtp
