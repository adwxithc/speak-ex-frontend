import LanguageInfoForm from "../components/custom/Auth/SignUpForm/LanguageInfoForm"
import UserInfoForm from "../components/custom/Auth/SignUpForm/UserInfoForm"
import MultiStepForm from "../components/custom/Form/MultiStepForm"
import SignUpContainer from "../components/layout/SignUpContainer/SignUpContainer"



function Test2() {
  return (
    <div>
        <SignUpContainer title="Signup" description="lets get stated to the world of language learning" >
        <MultiStepForm steps={[<LanguageInfoForm/>,<UserInfoForm/>]} />
        </SignUpContainer>
    </div>
  )
}

export default Test2
