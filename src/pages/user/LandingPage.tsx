
import Hero from '../../components/custom/Hero/Hero'
import Navbar from '../../components/layout/NavBar/user/Navbar'
import Carosal from '../../components/custom/Carosal/AluminiCarosal'
import Section from '../../components/custom/Section/Section'
import Footer from '../../components/layout/Footer/Footer'
import { useTranslation } from 'react-i18next'



function LandingPage() {

const {t} = useTranslation(['landingPage'])
const {step1,step2,step3,step4}=t('workflow')
  const workflow=[
    {
      title:step1.title,
      description:step1.description,
      imageUrl:"src/assets/Images/intro/signups.png",
      blurHash:"L6K1|7M^00%gT}WZbdRN4T%M5HD%"

    },
    {
      title:step2.title,
      description:step2.description,imageUrl:"src/assets/Images/intro/1234-01.png",
      blurHash:"LAIY8[Mc0G.SGKt8-,IAOttR#iR5"
    },
    {
      title:step3.title,
      description:step3.description,imageUrl:"src/assets/Images/intro/learn.png",
      blurHash:"LEHVF_n$0%NG*0j?RPWCkno#NfjE"
    },
    {
      title:step4.title,
      description:step4.description,
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
      
      {workflow.map((item, index)=><Section key={item.title} className='md:px-20 bg-secondary' {...item} description={item.description} imagePosition={index%2==0?'left':'right'} />)}
      </div>


      <Footer />
    
    </>
  
  )
}

export default LandingPage
