

import Button from '../../../components/ui/Button/Button'
import Rating from '../../../components/custom/Rating/Rating'
import { Dispatch, SetStateAction, useState } from 'react'
import toast from 'react-hot-toast'
import { useRateSessionMutation } from '../../../redux/features/user/session/sessionApiSlice'
import { useParams } from 'react-router-dom'

function RateSession({setInAction}:{setInAction: Dispatch<SetStateAction<boolean>>}) {
    const [rating, setRating] = useState(0)
    const { sessionCode = '' } = useParams()
    const [rated,setRated] = useState(false)
   const [rateSession,{isLoading}] = useRateSessionMutation() 
    const handleRateUser = async ()=>{
        try {
            setInAction(true)
            const res = await rateSession({sessionCode,rating}).unwrap()
            
            if(res.success){
                toast('rated session',{position:'top-center'})
                setRated(true)
            }
            
            
        } catch (error) {
            toast('Something went wrong',{
                position:'top-center'
            })
            
        }finally{
            setInAction(true)
        }

    }
  return (
    <div className='p-7 sm:px-20 bg-white shadow-md mt-10 border-t rounded-md  flex flex-col justify-center items-center gap-5'>
      
 
    <h3 className=' text-gray-700 font-semibold mb-2 '>How was the session?</h3>
    <Rating {...{rating, setRating}} />
    <div className='ml-auto'>
        {
            !rated &&
             <Button disabled={rating==0} onClick={handleRateUser} varient={'success-outline'} size={'sm'}>{isLoading?'Loading..':'Submit'}</Button>
        }
    
    </div>
  </div>
  )
}

export default RateSession
