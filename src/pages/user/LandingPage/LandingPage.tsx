import { useSelector } from 'react-redux'

import Hero from '../../../components/custom/Hero/Hero'
import Intro from '../../../components/custom/Intro/Intro'
import { RootState } from '../../../redux/store'
import Feeds from '../Feeds/Feeds'
import useHandleSession from '../../../hooks/useHandleSession'



function LandingPage() {
  const {isAuth} =useSelector((state:RootState)=>state.user)
  const {handleStartSession} = useHandleSession()
  return (
    <>
  <Hero {...{handleStartSession}}/>
  {
    isAuth
    ?<Feeds />
    :<Intro />
  }   
    </>
  
  )
}

export default LandingPage
