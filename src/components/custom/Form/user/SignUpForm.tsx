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
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {

      const errorInfo = error.data.errors;
      if (error.status == 400) {
        setError('email', { message: errorInfo[0].message })
      } else {
        toast.error('something went wrong')
      }

    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full p-5 text-center">
      <h2 className='text-2xl font-serif font-semibold mb-10'>Set  Personal info</h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="sm:flex gap-3  mb-3">
        
          <div className=" w-full">
          <label htmlFor="firstName" className={`flex text-sm  ml-4 ${errors.firstName ? 'text-red-600 ' : 'text-black/60 '} `}>FirstName</label>
          <Input id="firstName"  {...register('firstName')} error={errors?.firstName?.message?.toString()} className="rounded-3xl py-7 hover:border-black " placeholder="firstName" />
          </div>
          <div className=" w-full">
          <label htmlFor="lastName" className={`flex text-sm  ml-4 ${errors.lastName ? 'text-red-600 ' : 'text-black/60 '} `}>LastName</label>
          <Input id="lastName"  {...register('lastName')} error={errors?.lastName?.message?.toString()} className="rounded-3xl py-7 hover:border-black " placeholder="lastName" />
          </div>
         
        </div>

        <div className="sm:flex gap-3   mb-3">
        
          <div className=" w-full">
          <label htmlFor="email" className={`flex text-sm  ml-4 ${errors.email ? 'text-red-600 ' : 'text-black/60 '} `}>Email</label>
          <Input id="email"  {...register('email')} error={errors?.email?.message?.toString()} className="rounded-3xl py-7 hover:border-black " placeholder="email" />
          </div>
       
           <div className=" w-full">
          <label htmlFor="userName" className={`flex text-sm  ml-4 ${errors.userName ? 'text-red-600 ' : 'text-black/60 '} `}>UserName</label>
          <Input id="userName"  {...register('userName')} error={errors?.userName?.message?.toString()} className="rounded-3xl py-7 hover:border-black " placeholder="userName" />
          </div>
        </div>

        <div className="mb-3">

         
          <label htmlFor="password" className={`flex text-sm  ml-4 ${errors.password ? 'text-red-600 ' : 'text-black/60 '} `}>Password</label>
          <Input type='password' id="password"  {...register('password')} error={errors?.password?.message?.toString()} className="rounded-3xl py-7 hover:border-black " placeholder="password" />
          
        </div>

        <div className="my-5">

         
          <label htmlFor="confirm_password" className={`flex text-sm  ml-4 ${errors.confirm_password ? 'text-red-600 ' : 'text-black/60 '} `}>Confirm Password</label>
          <Input type="password" id="confirm_password"  {...register('confirm_password')} error={errors?.confirm_password?.message?.toString()} className="rounded-3xl py-7 hover:border-black " placeholder="Confirm Password" />
          
        </div>
        <Button type="submit" varient={'primary-full'} size={"lg"} >Submit</Button>
        <p className="mt-3">Already have an account? <b className="cursor-pointer" onClick={() => navigate('/signin')}>signin</b></p>
      </form>
      <DevTool control={control} />
    </div>
  )
}
export default SignUpForm
