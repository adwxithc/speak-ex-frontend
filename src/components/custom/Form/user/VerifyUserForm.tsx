
import { Dispatch, SetStateAction, useState } from 'react'
import OtpInput from '../../../ui/OtpInput/OtpInput'
import Button from '../../../ui/Button/Button'
import { useDispatch } from 'react-redux';
import { useVerifyUserMutation } from '../../../../redux/features/user/auth/userApiSlice';
import { logUser } from '../../../../redux/features/user/auth/userSlice';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';


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
      dispatch(logUser(res.data));
      setLoading(false)
      navigate('/')
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {

      setLoading(false)
      const errorInfo = error.data.errors;
      if (error.status == 400) {

        toast.error(errorInfo[0].message)
      }
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
