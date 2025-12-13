
import { Dispatch, SetStateAction, useState } from 'react'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import OtpInput from '../../../ui/OtpInput/OtpInput'
import Button from '../../../ui/Button/Button'
import { useVerifyOtpMutation } from '../../../../redux/features/user/user/userApiSlice';
import { setCridentials } from '../../../../redux/features/user/user/userSlice';
import { isHttpError } from '../../../../utils/isHttpError';



function VerifyOtpForm({ setLoading }: { setLoading: Dispatch<SetStateAction<boolean>> }) {
  const [enteredOtp, setEnteredOtp] = useState('');
  const [error, setError] = useState('')

  const dispatch = useDispatch()
  const [verify] = useVerifyOtpMutation()

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

      navigate('/forgot-password/reset-password')

    } catch (error) {
      if (isHttpError(error) && error.status == 400) {
        toast.error(error.data.errors[0].message);
      }
      setLoading(false)

    }
  }

  return (
    <div className="w-full p-5 sm:p-8 md:p-12 text-center max-w-[580px] mx-auto">
      <div className="mb-6 md:mb-10">
        <h2 className='text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-3 md:mb-4'>Verify Your Account</h2>
        <p className='text-gray-600 leading-relaxed text-sm md:text-base'>
          We've sent a 6-digit verification code to your email. Please enter it below to verify your account.
        </p>
      </div>

      <div className='max-w-[500px] mx-auto'>
        <form className='flex flex-col gap-4 md:gap-6' onSubmit={onSubmit}>
          <div className='bg-gray-50 rounded-2xl p-5 sm:p-8 shadow-sm'>
            <OtpInput onOtpChange={handleOtpChange} />
            {error && <span className='text-red-500 text-sm font-medium mt-3 block'>{error}</span>}
          </div>

          <Button 
            varient={'primary'} 
            size={'lg'} 
            className='w-full'
          >
            Verify Code
          </Button>

          <p className="text-gray-600 text-sm pt-2">
            Don't have an account? <b className="cursor-pointer text-primary hover:text-primary/80 font-semibold transition-colors duration-200" onClick={() => navigate('/signup')}>Create one</b>
          </p>
        </form>
      </div>

    </div>

  )
}

export default VerifyOtpForm;
