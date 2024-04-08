import { zodResolver } from "@hookform/resolvers/zod";
import { TextField } from "@mui/material";
import { Dispatch, SetStateAction } from "react"
import { useForm } from "react-hook-form";
import {  z } from 'zod';
import Button from "../../ui/Button/Button";
import { useNavigate } from "react-router-dom";
import { useResetPasswordMutation } from "../../../redux/features/user/userApiSlice";
import toast from "react-hot-toast";
import { Ierror } from "../../../types/error";

interface formValue {
   
    password: string;
    confirm_password:string;
}

const schema = z.object({
    
    password: z.string().min(4, 'password must be min 4 character long').max(20, 'password must be maximum 20 character long')
        .refine((s) => /[a-zA-Z]/.test(s), {
            message: "Password must contain letters.",
        })
        .refine((s) => /\d/.test(s), {
            message: "Password must contain numbers.",
        })
        .refine((s) => /[!@#$%^&*(),.?":{}|<>]/.test(s), {
            message: "Password must contain special characters.",
        }),
        confirm_password: z.string()
})
.refine((schema)=>{
    return schema.password==schema.confirm_password
},{
message: "Passwords must match",
path: ['confirm_password']
});


function ResetPasswordForm({setLoading}:{setLoading:Dispatch<SetStateAction<boolean>>}) {

    const [resetPassword] =  useResetPasswordMutation()
    const navigate= useNavigate()
    const methods = useForm<formValue>({
        mode:'onChange',
        resolver: zodResolver(schema), // zod resolver for form validation
      });

      const onSubmit = async(data:formValue)=>{
        try {
            setLoading(true)
            
            const res = await resetPassword({password:data.password}).unwrap()
            navigate('/signin')
            toast(res.message,{
                position:'top-center'
            })
            setLoading(false)
        } catch (error) {
            setLoading(false)
            let message:string[];
            if( error.status >=400){
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

      const {register, handleSubmit,formState}=methods;
      const {errors} = formState
  return (
    <div className="w-full text-center">
        <h1 className='text-2xl font-serif font-semibold mb-5'>Reset New Password</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="max-w-[500px] mx-auto">
        <p className='mb-5 text-sm text-gray-600'>Please provide a new strong password for you account.</p>

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
                    borderRadius: '25px', 
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
                    borderRadius: '25px', 
                    },
                }}
            />


            </div>

            <Button type="submit"  varient={'primary-full'} size={"lg"} >Submit</Button>
            <p>don't have an account.! <b className="cursor-pointer text-primary" onClick={()=>navigate('/signup')}>Create one</b></p>
        </form>
    </div>
  )
}

export default ResetPasswordForm
