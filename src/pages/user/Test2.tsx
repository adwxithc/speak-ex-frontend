
import UserInfoForm from "../../components/custom/Auth/SignUpForm/UserInfoForm"
import SignUpContainer from "../../components/layout/SignUpContainer/SignUpContainer"



function Test2() {
  return (
    <div>
        <SignUpContainer title="Unlock a World of Languages!" description="Discover new languages and immerse yourself in different cultures through lively conversations on our interactive platform." >
        {/* <MultiStepForm steps={[<LanguageInfoForm/>,]} /> */}
        <UserInfoForm/>

        </SignUpContainer>
    </div>
  )
}

export default Test2
