import { useNavigate } from "react-router-dom"
import Container from "../../layout/Container/Container"
import Button from '../../ui/Button/Button.tsx'
import { Input } from "../../ui/Input/Input.tsx"
import Peoples from "../Peoples/Peoples.tsx"
import { useTranslation } from "react-i18next"
import { RootState } from "../../../redux/store.ts"
import { useSelector } from "react-redux"
import useHandleSession from "../../../hooks/useHandleSession.tsx"
const peoples = [
  {
    src: '/Images/peoples/person2-min.jpeg',
    size: 24,
    className: "w-32"
  },
  {
    src: '/Images/peoples/person3-min.jpg',
    size: 24,
  },
  {
    src: '/Images/peoples/emoji-min.jpg',
    size: 24,
  },
  {
    src: '/Images/peoples/person4-min.jpeg',
    size: 24,
    className: "w-32"
  },
  {
    src: '/Images/peoples/mic-min.jpg',
    size: 24,
    className: "w-20"
  },

  {
    src: '/Images/peoples/device.avif',
    size: 24,
    className: "w-20"
  },

  {
    src: '/Images/peoples/person5-min.jpg',
    size: 24,

  }
]


function Hero() {
  const {t} = useTranslation(['common','landingPage'])
  const {handleStartSession,loading} = useHandleSession()

  
  const {isAuth} =useSelector((state:RootState)=>state.user)
  const navigate = useNavigate()

  return (
    <Container className="mx-auto">

      <div className=" bg-[url('/src/assets/Images/ad.png')] h-[100vh] object-contain bg-no-repeat bg-center " >
        <div className="lg:max-w-[50%]   mx-auto">
          <div className=" pt-11 sm:pt-24 px-7 text-center ">

            <p className="lg:text-6xl  text-4xl font-bold">
              {t('header',{ns:'landingPage'})}
            </p>
            <p className="text-sm sm:text-lg mt-5">
              {t('description',{ns:'landingPage'})}
            </p>
            {
              isAuth
              ?<div className="mt-8">
                <Button varient={"primary"} size={"lg"} onClick={handleStartSession} >{loading?'starting session...':t('getStarted',{ns:'common'})}</Button>
              </div>
              : <div className="sm:flex items-center justify-center gap-1 mt-4">
              <Input type="tex" className="rounded-3xl drop-shadow-md mb-5 sm:mb-0  " />
              <Button varient={"primary"} size={"lg"} onClick={()=>navigate('/signup')}>{t('getStarted',{ns:'common'})}</Button>
            </div>
            }
           

            <Peoples list={peoples} className="hide-scrollbar mt-10 sm:mt-16" />

          </div>

        </div>

      </div>

    </Container>
  )
}

export default Hero

