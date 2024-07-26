
import Navbar from '../../components/layout/NavBar/user/Navbar'
import Container from '../../components/layout/Container/Container'
import Button from '../../components/ui/Button/Button'
import { useNavigate } from 'react-router-dom'
import { MoveLeft } from 'lucide-react'

function NotFound() {
  const navigate =useNavigate()
  return (
    <>
      <div className=" fixed  inset-0 z-50">
        <Navbar />
      </div>
      <div className="h-16"></div>
     
      <Container className="bg-secondary h-screen flex flex-col justify-center items-center ">


        <div className="w-full h-full  overflow-hidden">
          <iframe src="https://lottie.host/embed/b94e7eec-37aa-4b7f-95b6-caae612ac262/vJGns9Z6Vk.json" className="h-full w-full scale-150 md:scale-100" ></iframe>
          
        </div>
        <Button onClick={()=>navigate('/')} varient={'primary'} size={'md'} className="flex justify-center items-center gap-1 relative -top-44 sm:-top-32 z-50"><MoveLeft /> Go Home</Button>

      </Container>
    </>
  )
}

export default NotFound
