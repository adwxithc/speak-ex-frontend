import { TextField } from '@mui/material'
import { zodResolver } from "@hookform/resolvers/zod";
import {  z } from 'zod';
import { useForm } from 'react-hook-form';
import Button from '../../ui/Button/Button';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useForgotPasswordMutation } from '../../../redux/features/user/userApiSlice';
import { Ierror } from '../../../types/error';
import toast from 'react-hot-toast';
import { Dispatch, SetStateAction } from 'react';

interface formValue {
    email: string;
    password: string;
}

const schema = z.object({
    email: z.string().email({ message: 'Invalid email' }),

});

function ForgotPasswordForm({setLoading}:{setLoading:Dispatch<SetStateAction<boolean>>}) {

    const navigate = useNavigate()
    const dispatch =useDispatch()
  
    const [forgotPassword] = useForgotPasswordMutation()

    const methods = useForm<formValue>({
        mode: 'onChange',
        resolver: zodResolver(schema), // zod resolver for form validation
    });
    const { register,  handleSubmit, formState } = methods;
    const { errors } = formState

    const onSubmit = async(data:formValue):Promise<void>=>{
        try {
            setLoading(true)
            await forgotPassword({...data}).unwrap()
            setLoading(false)
            navigate('/verify-otp')
        } catch (error) {
            
            setLoading(false)
         
            let message:string[];
            if( error.status>=400){
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
    <div className='p-8 '>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1 className='text-2xl font-serif font-semibold mb-5'>Trouble with logging in?</h1>
        <p className='text-pretty text-gray-500 mb-8 text-sm'>Enter your email address, and we'll send you an OTP  to get back into your account</p>
      <div className="my-3 max-w-[450px]">

        <TextField
            type="text"
            label="email"
            className="w-full"
            {...register('email')}
            error={!!errors.email}
            helperText={errors.email ? errors.email.message?.toString() : ''}
            sx={{
                '& .MuiOutlinedInput-root': {
                    borderRadius: '25px', // Adjust the value for your desired roundness
                },
            }}
        />
      </div>
      <Button className='mt-2' varient={'primary'} size={'md'} >Send Verification email</Button>
      <div className='flex justify-center '>
      <p>don't have an account.! <b className="cursor-pointer text-primary" onClick={()=>navigate('/signup')}>Create one</b></p>
      </div>
      
      </form>
    </div>
  )
}

export default ForgotPasswordForm
