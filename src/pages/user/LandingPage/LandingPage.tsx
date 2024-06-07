import { useSelector } from 'react-redux'
import { RootState } from '../../../redux/store'
import { lazy } from 'react'


const Hero = lazy(()=>import('../../../components/custom/Hero/Hero')) 
const Intro = lazy(()=>import('../../../components/custom/Intro/Intro')) 
const Feeds = lazy(()=>import('../Feeds/Feeds')) 





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
