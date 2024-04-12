
import Hero from '../../components/custom/Hero/Hero'
import Navbar from '../../components/layout/NavBar/user/Navbar'
import Carosal from '../../components/custom/Carosal/AluminiCarosal'
import Section from '../../components/custom/Section/Section'
import Footer from '../../components/layout/Footer/Footer'



function test() {


  const workflow=[
    {
      title:'Sign Up and Language Selection',
      description:"Get started by signing up and selecting the language you want to learn. You can also choose the languages you're already good at during sign-up. Don't worry, it's easy! ",
      imageUrl:"src/assets/Images/intro/signups.png",
      blurHash:"L6K1|7M^00%gT}WZbdRN4T%M5HD%"

    },
    {
      title:'Earn Extra Talking Credits',
      description:"As you engage in conversations with others who want to learn the languages you're good at, you'll earn extra talking credits. It's like earning rewards for chatting!",
      imageUrl:"src/assets/Images/intro/1234-01.png",
      blurHash:"LAIY8[Mc0G.SGKt8-,IAOttR#iR5"
    },
    {
      title:'Use Credits to Learn',
      description:"Use your earned credits to chat with users who know the language you want to learn. It's like unlocking valuable conversations!",
      imageUrl:"src/assets/Images/intro/learn.png",
      blurHash:"LEHVF_n$0%NG*0j?RPWCkno#NfjE"
    },
    {
      title:'Free Hours and Additional Credits',
      description:"Get 5 free hours when you sign up to chat with others. Help them learn to earn more credits for your language journey.",
      imageUrl:"src/assets/Images/intro/1234-01.png",
      blurHash:"LAIY8[Mc0G.SGKt8-,IAOttR#iR5"
    }
  ]

  return (
    <>
    <Navbar />
      <div className=''>
    
      <Hero/>
  
      <Carosal />
      
      {workflow.map((item, index)=><Section key={item.title} className='md:px-20 bg-secondary' blurHash={item.blurHash} title={item.title} description={item.description} imagePosition={index%2==0?'left':'right'} imageUrl={item.imageUrl}/>)}
      </div>


      <Footer />
    
    </>
  
  )
}

export default test
