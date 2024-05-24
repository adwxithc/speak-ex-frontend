
import Button from '../../../components/ui/Button/Button'
import { Undo2 } from 'lucide-react'
import RateSession from './RateSession'
import Container from '../../../components/layout/Container/Container'
import { useNavigate } from 'react-router-dom'
import ReportSession from './ReportSession/ReportSession'
import { CountdownCircleTimer } from 'react-countdown-circle-timer'
import { useCallback, useState } from 'react'

function SessionFeedBack() {

  const navigate = useNavigate()
  const [inAction, setInAction] = useState(false)
  const handleTimesUp = useCallback(() => {
    if (inAction) return
    navigate('/')
  }, [inAction, navigate])


  return (
    <Container className={`bg-[url('/src/assets/Images/ad.png')] object-contain bg-no-repeat bg-center`}>

      <div className='ml-3 mt-5  sm:ml-16 sm:mt-8 flex items-center gap-2'>
        <CountdownCircleTimer
          isPlaying
          duration={60}
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
            <h1 className='text-3xl font-semibold text-center'>Session Has over.</h1>

            <Button onClick={() => navigate('/')} varient={'primary'} size={'md'}> <Undo2 /> <span className='ml-1'>Return to Home</span> </Button>
          </div>

          <RateSession {...{ setInAction }} />

        </div>
      </div>

      <ReportSession {...{ setInAction }} />

    </Container>
  )
}

export default SessionFeedBack
