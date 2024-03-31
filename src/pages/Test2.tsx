import MultiStepForm from "../components/custom/Form/MultiStepForm"
import SignUpContainer from "../components/layout/SignUpContainer/SignUpContainer"

function Lang(){
    return <div>lang</div>
}

function Info(){
    return <div>info</div>
}

function Test2() {
  return (
    <div>
        <SignUpContainer >
        <MultiStepForm steps={[<Lang/>,<Info/>]} />
        </SignUpContainer>
    </div>
  )
}

export default Test2
