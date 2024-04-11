import { useState } from "react"
import SignUpContainer from "../../../../components/layout/SignUpContainer/SignUpContainer"
import ResetPasswordForm from "../../../../components/custom/Form/user/ResetPasswordForm"

function ResetPassword() {
    const [loading,setLoading] = useState(false)
  return (
    <div>
    <SignUpContainer title="Unlock a World of Languages!" description="Discover new languages and immerse yourself in different cultures through lively conversations on our interactive platform." loading={loading} >
        <ResetPasswordForm setLoading={setLoading} />

    </SignUpContainer>
    </div>
  )
}

export default ResetPassword
