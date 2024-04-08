
import { Dispatch, SetStateAction, useState } from 'react'
import OtpInput from '../../ui/OtpInput/OtpInput'
import  Button  from '../../ui/Button/Button'
import { useDispatch } from 'react-redux';
import { useVerifyOtpMutation } from '../../../redux/features/user/userApiSlice';
import { logUser } from '../../../redux/features/user/userSlice';
import toast from 'react-hot-toast';
import { Ierror } from '../../../types/error';
import { useNavigate } from 'react-router-dom';


function VerifyOtpForm({setLoading}:{setLoading:Dispatch<SetStateAction<boolean>>}) {
  const [enteredOtp, setEnteredOtp] = useState('');
  const [error,setError] = useState('')

  const dispatch =useDispatch()
const [verify] = useVerifyOtpMutation()
  
  const navigate= useNavigate()

  const handleOtpChange = (otp:string[]) => {
    setEnteredOtp(otp.join(''));
    setError('')
  }

  const onSubmit = async(e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault()
    if(enteredOtp.length!=6){
      setError('enter valid otp')
      return 
    }
    try {
      setLoading(true)
    const res= await verify({otp:enteredOtp}).unwrap()
    dispatch(logUser(res.data));
    setLoading(false)
    
    navigate('/forgot-password/reset-password')
    } catch (error) {
      
      setLoading(false)
            let message:string[];
            if( error.status >=400){
                const err= error as Ierror
                message=err.data.errors.map(item=>item.message) 
            }

            toast.custom(() => (
                <div className="px-6 bg-white py-3 border drop-shadow-2xl rounded-md ">
                  <b className="text-red-600">Error</b>
                  <ul>
                    {message.map((message) => (
                      <li key={message}>{message}</li>
                    ))}
                  </ul>
                </div>
              ),{
                duration: 6000,
            });
    }
  }

  return (
    <div className="w-full p-5 text-center">
    <h2 className='text-2xl font-serif font-semibold mb-10'>Verify User</h2>
    
      <div className='max-w-[450px] mx-auto'>
      <p className='mb-5 text-sm text-gray-600'>we have send a verification code to your email please enter the OTP for user verification</p>
        <form className='flex flex-col gap-3' onSubmit={onSubmit}>
          
        <OtpInput onOtpChange={handleOtpChange}  />
        <span className='text-red-500'>{error}</span>
        <Button varient={'primary'} size={'md'} >verify</Button>
        <p>don't have an account.! <b className="cursor-pointer text-primary" onClick={()=>navigate('/signup')}>Create one</b></p>
        </form> 
      </div>

    </div>

  )
}

export default VerifyOtpForm
