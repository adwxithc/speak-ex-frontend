
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
    <div className="w-full p-5 sm:p-8 md:p-12 text-center max-w-[580px] mx-auto">
      <div className="mb-6 md:mb-10">
        <h2 className='text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-3 md:mb-4'>Verify Your Email</h2>
        <p className='text-gray-600 leading-relaxed text-sm md:text-base'>
          We've sent a 6-digit verification code to your email. Please enter it below to complete your registration.
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
            Verify Email
          </Button>
        </form>
      </div>

    </div>

  )
}

export default VerifyUser
