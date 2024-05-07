import { useSelector } from 'react-redux'

import Hero from '../../../components/custom/Hero/Hero'
import Intro from '../../../components/custom/Intro/Intro'
import { RootState } from '../../../redux/store'
import Feeds from '../Feeds/Feeds'



function LandingPage() {
  const {isAuth} =useSelector((state:RootState)=>state.user)
  return (
    <>
  <Hero/>
  {
    isAuth
    ?<Feeds />
    :<Intro />
  }   
    </>
  
  )
}

export default LandingPage
