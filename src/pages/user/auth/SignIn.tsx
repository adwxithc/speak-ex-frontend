
import SignUpContainer from '../../../components/layout/SignUpContainer/SignUpContainer'
import SignInForm from '../../../components/custom/Auth/SignInForm'

function SignIn() {
  return (
    <div>
    <SignUpContainer title="Unlock a World of Languages!" description="Discover new languages and immerse yourself in different cultures through lively conversations on our interactive platform." >
        <SignInForm />

    </SignUpContainer>
    </div>
  )
}

export default SignIn
