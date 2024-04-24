import { TextField } from "@mui/material"
import { useForm } from 'react-hook-form';
import { Dispatch, SetStateAction } from "react";
import { DevTool } from "@hookform/devtools";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import { SignupSchema, IformValue } from "./Schema/SignupSchema";
import { useSignUpMutation } from "../../../../redux/features/user/user/userApiSlice";
import Button from "../../../ui/Button/Button";


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


      setLoading(false)
      navigate('/signup/verify-user')
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
    <div className="w-full p-5 text-center">
      <h2 className='text-2xl font-serif font-semibold mb-10'>Set  Personal info</h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="sm:flex gap-1  ">
          <TextField
            className=" w-full my-3"
            label="First Name"
            {...register('firstName')}
            error={!!errors.firstName}
            helperText={errors.firstName ? errors.firstName.message?.toString() : ''}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: '20px',
              },
            }}
          />
          <TextField
            className=" w-full my-3"
            label="Last Name"
            {...register('lastName')}
            error={!!errors.lastName}
            helperText={errors.lastName ? errors.lastName.message?.toString() : ''}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: '20px',
              },
            }}
          />
        </div>

        <div className="sm:flex gap-1   ">
          <TextField
            className=" w-full my-3"
            label="Email"
            {...register('email')}
            error={!!errors.email}
            helperText={errors.email ? errors.email.message?.toString() : ''}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: '20px',
              },
            }}
          />
          <TextField
            className=" w-full my-3"
            label="userName"
            {...register('userName')}
            error={!!errors.userName}
            helperText={errors.userName ? errors.userName.message?.toString() : ''}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: '20px',
              },
            }}
          />
        </div>

        <div className="my-3">

          <TextField
            type="password"
            label="Password"
            className="w-full"
            {...register('password')}
            error={!!errors.password}
            helperText={errors.password ? errors.password.message?.toString() : ''}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: '20px',
              },
            }}
          />
        </div>

        <div className="my-5">

          <TextField
            type="password"
            label="Confirm Password"
            className="w-full "
            {...register('confirm_password')}
            error={!!errors.confirm_password}
            helperText={errors.confirm_password ? errors.confirm_password.message?.toString() : ''}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: '20px',
              },
            }}
          />
        </div>
        <Button type="submit" varient={'primary-full'} size={"lg"} >Submit</Button>
        <p className="mt-3">Already have an account? <b className="cursor-pointer" onClick={() => navigate('/signin')}>signin</b></p>
      </form>
      <DevTool control={control} />
    </div>
  )
}
export default SignUpForm
