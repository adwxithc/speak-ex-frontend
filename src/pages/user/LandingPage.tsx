
import Hero from '../../components/custom/Hero/Hero'
import Navbar from '../../components/layout/NavBar/user/Navbar'
import Footer from '../../components/layout/Footer/Footer'
import Intro from '../../components/custom/Intro/Intro'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/store'

import Posts from '../../components/custom/Posts/Posts'



function LandingPage() {
  const {isAuth} =useSelector((state:RootState)=>state.user)
  return (
    <>
    <Navbar />
  
  
  <Hero/>
  {
    isAuth
    ?<Posts />
    :<Intro />
  }   

  <Footer />
    
    </>
  
  )
}

export default LandingPage
