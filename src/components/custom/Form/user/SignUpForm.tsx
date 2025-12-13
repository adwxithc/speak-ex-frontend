import { useForm } from 'react-hook-form';
import { Dispatch, SetStateAction } from "react";
import { DevTool } from "@hookform/devtools";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import { SignupSchema, IformValue } from "./Schema/SignupSchema";
import { useSignUpMutation } from "../../../../redux/features/user/user/userApiSlice";
import Button from "../../../ui/Button/Button";
import { Input } from "../../../ui/Input/Input";
import { isHttpError } from '../../../../utils/isHttpError';


function SignUpForm({ setLoading }: { setLoading: Dispatch<SetStateAction<boolean>> }) {

  const schema = SignupSchema()

  const navigate = useNavigate()

  const [signup] = useSignUpMutation()

  const methods = useForm<IformValue>({
    mode: 'onChange',
    resolver: zodResolver(schema), // zod resolver for form validation
  });

  const { register, control, handleSubmit, formState, setError } = methods;
  const { errors } = formState

  const onSubmit = async (data: IformValue) => {
    try {

      const { confirm_password, ...formData } = data;
      confirm_password;
      setLoading(true)
      await signup({ ...formData }).unwrap()
      navigate('/signup/verify-user')
    } catch (error) {
      if(isHttpError(error) && error.status == 400){
        setError('email', { message: error.data.errors[0].message })
      } else {
        toast.error('something went wrong')
      }

    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full p-5 sm:p-8 md:p-12 text-center max-w-[680px] mx-auto">
      <div className="mb-6 md:mb-10">
        <h2 className='text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-gray-900 mb-2 md:mb-3'>Create Your Account</h2>
        <p className="text-gray-500 text-sm hidden lg:block">Join our community and start your language learning journey</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 md:space-y-5">
        {/* Name Fields Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
          <div className="text-left">
            <label htmlFor="firstName" className={`block mb-2 ml-1 font-medium text-sm transition-colors ${errors.firstName ? 'text-red-600' : 'text-gray-700'}`}>
              First Name
            </label>
            <Input 
              id="firstName" 
              {...register('firstName')} 
              error={errors?.firstName?.message?.toString()} 
              placeholder="Enter first name" 
            />
          </div>
          
          <div className="text-left">
            <label htmlFor="lastName" className={`block mb-2 ml-1 font-medium text-sm transition-colors ${errors.lastName ? 'text-red-600' : 'text-gray-700'}`}>
              Last Name
            </label>
            <Input 
              id="lastName" 
              {...register('lastName')} 
              error={errors?.lastName?.message?.toString()} 
              placeholder="Enter last name" 
            />
          </div>
        </div>

        {/* Email and Username Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
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
       
          <div className="text-left">
            <label htmlFor="userName" className={`block mb-2 ml-1 font-medium text-sm transition-colors ${errors.userName ? 'text-red-600' : 'text-gray-700'}`}>
              Username
            </label>
            <Input 
              id="userName" 
              {...register('userName')} 
              error={errors?.userName?.message?.toString()} 
              placeholder="Choose a username" 
            />
          </div>
        </div>

        {/* Password Field */}
        <div className="text-left">
          <label htmlFor="password" className={`block mb-2 ml-1 font-medium text-sm transition-colors ${errors.password ? 'text-red-600' : 'text-gray-700'}`}>
            Password
          </label>
          <Input 
            type='password' 
            id="password" 
            {...register('password')} 
            error={errors?.password?.message?.toString()} 
            placeholder="Create a strong password" 
          />
        </div>

        {/* Confirm Password Field */}
        <div className="text-left">
          <label htmlFor="confirm_password" className={`block mb-2 ml-1 font-medium text-sm transition-colors ${errors.confirm_password ? 'text-red-600' : 'text-gray-700'}`}>
            Confirm Password
          </label>
          <Input 
            type="password" 
            id="confirm_password" 
            {...register('confirm_password')} 
            error={errors?.confirm_password?.message?.toString()} 
            placeholder="Re-enter your password" 
          />
        </div>

        {/* Submit Button */}
        <Button 
          type="submit" 
          varient={'primary-full'} 
          size={"lg"}
        >
          Create Account
        </Button>

        {/* Sign In Link */}
        <p className="text-gray-600 text-sm pt-2">
          Already have an account? <b className="cursor-pointer text-primary hover:text-primary/80 font-semibold transition-colors duration-200" onClick={() => navigate('/signin')}>Sign in</b>
        </p>
      </form>
      <DevTool control={control} />
    </div>
  )
}
export default SignUpForm
