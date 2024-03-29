
import Hero from '../components/custom/Hero/Hero'
import Navbar from '../components/layout/NavBar/Navbar'
import Carosal from '../components/custom/Carosal/AluminiCarosal'
import Section from '../components/custom/Section/Section'
import '../assets/Images/intro/learn.png'

function test() {

  const workflow=[
    {
      title:'Sign Up and Language Selection',
      description:"Get started by signing up and selecting the language you want to learn. You can also choose the languages you're already good at during sign-up. Don't worry, it's easy! ",
      src:"src/assets/Images/intro/signups.png",
      imagePosition:'left'
    },
    {
      title:'Earn Extra Talking Credits',
      description:"As you engage in conversations with others who want to learn the languages you're good at, you'll earn extra talking credits. It's like earning rewards for chatting!",
      src:"src/assets/Images/intro/1234-01.png",
      imagePosition:'right'
    },
    {
      title:'Use Credits to Learn',
      description:"Use your earned credits to chat with users who know the language you want to learn. It's like unlocking valuable conversations!",
      src:"src/assets/Images/intro/learn.png",
      imagePosition:'right'
    },
    {
      title:'Free Hours and Additional Credits',
      description:"Use your earned credits to chat with users who know the language you want to learn. It's like unlocking valuable conversations!",
      src:"src/assets/Images/intro/learn.png",
      imagePosition:'right'
    }
  ]

  return (
    <>
    <Navbar />
      <div className='h-[200vh]'>
    
      <Hero/>
  
      <Carosal />
      
      <Section className='md:px-14'  title='Sign Up and Language Selection' description="Get started by signing up and selecting the language you want to learn. You can also choose the languages you're already good at during sign-up. Don't worry, it's easy! " imageUrl='src/assets/Images/intro/signups.png'/>
  
      </div>
    
    </>
  
  )
}

export default test
