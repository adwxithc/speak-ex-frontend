
import { Dispatch, SetStateAction, useState } from 'react'
import OtpInput from '../../../ui/OtpInput/OtpInput'
import Button from '../../../ui/Button/Button'
import { useDispatch } from 'react-redux';
import { useVerifyUserMutation } from '../../../../redux/features/user/user/userApiSlice';
import { setCridentials } from '../../../../redux/features/user/user/userSlice';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { isHttpError } from '../../../../utils/isHttpError';


function VerifyUser({ setLoading }: { setLoading: Dispatch<SetStateAction<boolean>> }) {
  const [enteredOtp, setEnteredOtp] = useState('');
  const [error, setError] = useState('')

  const dispatch = useDispatch()

  const [verify] = useVerifyUserMutation()
  const navigate = useNavigate()

  const handleOtpChange = (otp: string[]) => {
    setEnteredOtp(otp.join(''));
    setError('')
  }

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (enteredOtp.length != 6) {
      setError('enter valid otp')
      return
    }
    try {
      setLoading(true)
      const res = await verify({ otp: enteredOtp }).unwrap()
      dispatch(setCridentials(res.data));
      setLoading(false)
      navigate('/')
    
    } catch (error) {
      if(isHttpError(error) && error.status == 400){
        toast.error(error.data.errors[0].message);
      }
      setLoading(false)
    }
  }

  return (
    <div className="w-full p-5 text-center">
      <h2 className='text-2xl font-serif font-semibold mb-10'>Verify User</h2>

      <div className='max-w-[450px] mx-auto'>
        <p className='mb-5 text-sm text-gray-600'>we have send a verification code to your email please enter the OTP for user verification</p>
        <form className='flex flex-col gap-3' onSubmit={onSubmit}>

          <OtpInput onOtpChange={handleOtpChange} />
          <span className='text-red-500'>{error}</span>
          <Button varient={'primary'} size={'md'} >verify</Button>
        </form>
      </div>

    </div>

  )
}

export default VerifyUser
