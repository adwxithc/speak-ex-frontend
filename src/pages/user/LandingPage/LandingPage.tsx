import { useSelector } from 'react-redux'
import { RootState } from '../../../redux/store'
import { lazy } from 'react'


const Hero = lazy(()=>import('../../../components/custom/hero/Hero')) 
const Intro = lazy(()=>import('../../../components/custom/intro/Intro')) 
const Feeds = lazy(()=>import('../feeds/Feeds')) 





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
