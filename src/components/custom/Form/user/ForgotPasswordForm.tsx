import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Dispatch, SetStateAction } from 'react';

import Button from '../../../ui/Button/Button';
import { useForgotPasswordMutation } from '../../../../redux/features/user/user/userApiSlice';
import { IformValue, schema } from './Schema/forgotPasswordSchema';
import { Input } from '../../../ui/Input/Input';



function ForgotPasswordForm({ setLoading }: { setLoading: Dispatch<SetStateAction<boolean>> }) {

  const navigate = useNavigate()

  const [forgotPassword] = useForgotPasswordMutation()

  const methods = useForm<IformValue>({
    mode: 'onChange',
    resolver: zodResolver(schema), // zod resolver for form validation
  });

  const { register, handleSubmit, formState, setError } = methods;
  const { errors } = formState

  const onSubmit = async (data: IformValue): Promise<void> => {
    try {
      setLoading(true)
      await forgotPassword({ ...data }).unwrap()
      setLoading(false)
      navigate('/verify-otp')
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {


      setLoading(false)
      const errorInfo = error.data.errors;
      if (error.status == 400) {
        setError('email', { message: errorInfo[0].message })
      } else {
        toast.error(errorInfo[0].message)
      }
    }
  }
  return (
    <div className='p-8 '>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1 className='text-2xl font-serif font-semibold mb-5'>Trouble with logging in?</h1>
        <p className='text-pretty text-gray-500 mb-8 text-sm'>Enter your email address, and we'll send you an OTP  to get back into your account</p>
        <div className="my-3 max-w-[450px]">

          


          <label htmlFor="email" className={`flex  ml-4 ${errors.email ? 'text-red-600 ' : 'text-black/60 '} `}>email</label>
          <Input id="email" {...register('email')} error={errors?.email?.message?.toString()} className="rounded-3xl py-7 hover:border-black " placeholder="email" />


        </div>
        <Button className='mt-2' varient={'primary'} size={'md'} >Send Verification email</Button>
        <div className='flex justify-center '>
          <p>don't have an account.! <b className="cursor-pointer text-primary" onClick={() => navigate('/signup')}>Create one</b></p>
        </div>

      </form>
    </div>
  )
}

export default ForgotPasswordForm
