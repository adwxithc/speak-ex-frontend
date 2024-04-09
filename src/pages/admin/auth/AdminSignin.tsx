import { useState } from 'react'
import SignUpContainer from '../../../components/layout/SignUpContainer/SignUpContainer'
import AdminSignInForm from '../../../components/custom/Auth/AdminSignInForm'

function AdminSignin() {
  const [loading,setLoading] = useState(false)
  return (
    <div>
    <SignUpContainer title="Unlock a World of Languages!" description="Discover new languages and immerse yourself in different cultures through lively conversations on our interactive platform." loading={loading} >
      <AdminSignInForm setLoading={setLoading} />
    </SignUpContainer>
    </div>
  )
}

export default AdminSignin
