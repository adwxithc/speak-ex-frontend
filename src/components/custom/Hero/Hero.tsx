import { useNavigate } from "react-router-dom"
import Container from "../../layout/Container/Container"
import Button from '../../ui/Button/Button.tsx'
import { Input } from "../../ui/Input/Input.tsx"
import Peoples from "../Peoples/Peoples.tsx"
import { useTranslation } from "react-i18next"
import { RootState } from "../../../redux/store.ts"
import { useSelector } from "react-redux"

interface IHeroProps{
  handleStartSession:()=>void
}

function Hero({handleStartSession}:IHeroProps) {
  const {t} = useTranslation(['common','landingPage'])

  const peoples = [
    {
      src: 'src/assets/Images/peoples/person2.jpeg',
      size: 24,
      className: "w-32"
    },
    {
      src: 'src/assets/Images/peoples/person3.jpg',
      size: 24,
    },
    {
      src: 'src/assets/Images/peoples/emoji.jpg',
      size: 24,
    },
    {
      src: 'src/assets/Images/peoples/person4.jpeg',
      size: 24,
      className: "w-32"
    },
    {
      src: 'src/assets/Images/peoples/mic.jpg',
      size: 24,
      className: "w-20"
    },

    {
      src: 'src/assets/Images/peoples/device.avif',
      size: 24,
      className: "w-20"
    },

    {
      src: 'src/assets/Images/peoples/person5.jpg',
      size: 24,

    }
  ]
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
                <Button varient={"primary"} size={"lg"} onClick={handleStartSession} >{t('getStarted',{ns:'common'})}</Button>
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

