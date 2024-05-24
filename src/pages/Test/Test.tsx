import { CountdownCircleTimer } from "react-countdown-circle-timer"
import Container from "../../components/layout/Container/Container"
import { useNavigate } from "react-router-dom"
import { useCallback } from "react"
import Button from "../../components/ui/Button/Button"
import { Undo2 } from "lucide-react"


function Test() {
  const navigate = useNavigate()
  const handleTimesUp = useCallback(() => {

    navigate('/')
  }, [navigate])


  return (
    <div className={`bg-[url('/src/assets/Images/ad.png')] object-contain bg-no-repeat bg-center h-screen`} >
      <Container >

        <div className='ml-3 mt-5  sm:ml-16 sm:mt-8 flex items-center gap-2'>
          <CountdownCircleTimer
            isPlaying
            duration={2600}
            colors={['#0c921e', '#ffea00', '#ff691e', '#ff0000']}
            colorsTime={[60, 30, 10, 0]}
            isSmoothColorTransition
            onComplete={handleTimesUp}
            strokeWidth={3}
            size={40}

          >
            {({ remainingTime }) => remainingTime}
          </CountdownCircleTimer>
          <span className='font-semibold'>Return to home</span>
        </div>


        <div className='flex'>
          <div className='mt-14  mx-auto '>

            <div className='w-full flex flex-col items-center gap-5 '>
              <h1 className='text-2xl font-semibold text-center'>Session Has over.</h1>

              <Button onClick={() => navigate('/')} varient={'primary'} size={'md'}> <Undo2 /> <span className='ml-1'>Return to Home</span> </Button>
            </div>
            
            <div className=" flex flex-col mt-5 justify-center items-center ">
              <h3 className="text-3xl font-semibold">Congragulation You have earned 25 Silver Coins!</h3>
              <iframe className="" src="https://lottie.host/embed/c67d3e9a-2de8-46ba-8572-f76ba0825d28/eJo7OgWctO.json" ></iframe>

            </div>


          </div>
        </div>

      </Container>
    </div>


  )
}

export default Test
