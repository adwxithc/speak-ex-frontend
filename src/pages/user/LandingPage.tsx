
import Hero from '../../components/custom/Hero/Hero'
import Intro from '../../components/custom/Intro/Intro'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/store'

import Posts from '../../components/custom/Posts/Posts'



function LandingPage() {
  const {isAuth} =useSelector((state:RootState)=>state.user)
  return (
    <>
  
  
  
  <Hero/>
  {
    isAuth
    ?<Posts />
    :<Intro />
  }   


    
    </>
  
  )
}

export default LandingPage
