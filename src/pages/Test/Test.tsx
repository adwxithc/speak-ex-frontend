import { useState } from 'react'
import Rating from '../../components/custom/Rating/Rating'
import Container from '../../components/layout/Container/Container'
import Button from '../../components/ui/Button/Button'
import { Handshake, Undo2 } from 'lucide-react'
import Navbar from '../../components/layout/NavBar/user/Navbar'

function Test() {
  const [rating, setRating] = useState(0)
  return (
    <>
    <Navbar/>
    <Container className=''>
      
      <div className='flex'>
      <div className='mt-14  mx-auto '>
     
     <div className='w-full flex flex-col items-center gap-5 '>
       <h1 className='text-3xl font-semibold text-center'>Session Has over.</h1>

       <Button  varient={'primary'} size={'md'}> <Undo2 /> <span className='ml-1'>Return to Home</span> </Button>
     </div>
     
     <div className='p-7 sm:px-20 shadow-md mt-10 border-t rounded-md  flex flex-col justify-center items-center gap-5'>
      
 
       <h3 className=' text-gray-700 font-semibold mb-2 '>How was the session?</h3>
       <Rating {...{rating, setRating}} />
       <div className='ml-auto'>
       <Button varient={'success-outline'} size={'sm'}>Submit</Button>
       </div>
     </div>
      </div>
      {/* <div className=' overflow-hidden w-80'>
          <img src="https://img.freepik.com/free-vector/online-meetup-abstract-concept-vector-illustration-conference-call-join-meetup-group-video-call-online-service-distance-communication-informal-meeting-members-networking-abstract-metaphor_335657-2920.jpg?t=st=1715764902~exp=1715768502~hmac=13db45f84f2c12287ca3e62d6ad2b9ffd5089da17b9b8c7018de5aacfefbba5b&w=740" alt="" />

       </div> */}

      </div>
     
      <div className='p-4 shadow mt-10  rounded  sm:max-w-[50vw] mx-auto bg-gray-50 '>

<div className='flex flex-col sm:flex-row  items-center '>
<div className='px-2'>
  <Handshake size={50} color='#00255F' />
</div>

 <p className='text-gray-900 ml-2 text-justify'> Please take a moment to report any issues you encountered during your session or provide feedback on the speaking quality. Your feedback helps us enhance the speaking practice experience for all users.</p>

</div>
<div className='flex justify-end '>
<Button  varient={'danger-outline'} size={'sm'}>Report</Button>
</div>

  
      </div>
      
    </Container>
    </>
    
  )
}

export default Test
