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
    <div className='p-5 sm:p-8 md:p-12 max-w-[580px] mx-auto'>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 md:space-y-6">
        <div className="text-center md:text-left mb-6 md:mb-8">
          <h1 className='text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-3 md:mb-4'>Trouble Logging In?</h1>
          <p className='text-gray-600 leading-relaxed text-sm md:text-base'>
            No worries! Enter your email address, and we'll send you a verification code to help you regain access to your account.
          </p>
        </div>

        <div className="text-left">
          <label htmlFor="email" className={`block mb-2 ml-1 font-medium text-sm transition-colors ${errors.email ? 'text-red-600' : 'text-gray-700'}`}>
            Email Address
          </label>
          <Input 
            id="email" 
            {...register('email')} 
            error={errors?.email?.message?.toString()} 
            placeholder="Enter your email" 
          />
        </div>

        <Button 
          className='w-full md:w-auto' 
          varient={'primary'} 
          size={'lg'}
        >
          Send Verification Code
        </Button>

        <div className='flex justify-center md:justify-start pt-4'>
          <p className="text-gray-600 text-sm">
            Don't have an account? <b className="cursor-pointer text-primary hover:text-primary/80 font-semibold transition-colors duration-200" onClick={() => navigate('/signup')}>Create one</b>
          </p>
        </div>
      </form>
    </div>
  )
}

export default ForgotPasswordForm
