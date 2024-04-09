import { FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField } from "@mui/material"
import { useForm } from 'react-hook-form';
import {Dispatch,SetStateAction} from 'react'
import Button from "../../ui/Button/Button";
import { DevTool } from "@hookform/devtools";
import { zodResolver } from "@hookform/resolvers/zod";
import {  z } from 'zod';
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useState } from "react";
import { useDispatch} from "react-redux";

import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Ierror } from "../../../types/error";
import { useAdminLoginMutation } from "../../../redux/features/admin/adminApiSlice";
import { logAdmin } from "../../../redux/features/admin/adminSlice";

interface formValue {
    email: string;
    password: string;
}

const schema = z.object({
    email: z.string().email({ message: 'Invalid email' }),
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

});

function AdminSignInForm({setLoading}:{setLoading:Dispatch<SetStateAction<boolean>>}) {
  
    const navigate = useNavigate()
    const dispatch =useDispatch()
  
    const [login] = useAdminLoginMutation()
    

    const methods = useForm<formValue>({
        mode: 'onChange',
        resolver: zodResolver(schema), // zod resolver for form validation
    });

    const { register, control, handleSubmit, formState } = methods;
    const { errors } = formState

    const [showPassword, setShowPassword] = useState<boolean>(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const onSubmit = async(data: formValue) => {
        
        try {
            setLoading(true)
            const res = await login({...data}).unwrap()
            dispatch(logAdmin({...res.data}));
            
            setLoading(false)
            navigate('/admin')
        } catch (error) {
            setLoading(false)
            
            
            // let message:string[];
            // if( error.status>=400){
            //     const err= error as Ierror
            //     message=err.data.errors.map(item=>item.message) 
            // }

            

            // toast.custom(() => (
            //     <div className="px-6 bg-white py-3 border drop-shadow-2xl rounded-md ">
            //       <b className="text-red-600">Error</b>
            //       <ul>
            //         {message.map((message) => (
            //           <li key={message}>{message}</li>
            //         ))}
            //       </ul>
            //     </div>
            //   ),{
            //     duration: 6000,
            // });
            
            console.log(error);
            
            
           
        }
    }
    return (
        <div className="w-full p-5 text-center max-w-[500px] mx-auto">
            <h2 className='text-2xl font-serif font-semibold mb-10'>Admin Login</h2>

            <form onSubmit={handleSubmit(onSubmit)}>


                <div className="my-3">

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

                <div className="my-5">



                    <FormControl sx={{
                         width: '100%', '& .MuiOutlinedInput-root': {
                            borderRadius: '25px', // Adjust the value for your desired roundness
                            paddingRight:4
                        },
                        
                    }}

                        variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-password" error={!!errors.password} >Password</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-password"
                            type={showPassword ? 'text' : 'password'}
                            {...register('password')}
                            error={!!errors.password}
                        
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                        sx={{color:errors.password &&'red'}}
                                    >

                                        {showPassword ? <VisibilityOff  /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                            label="Password"
                        />
                        {errors.password && (
                            <span className="text-red-500 text-xs ml-4 flex flex-1">{errors.password.message}</span>
                        )}

                    </FormControl>


                </div>
                    
             
                
                <Button type="submit" varient={'primary-full'} size={"lg"} >Submit</Button>
                

                

                
                
            </form>
            <DevTool control={control} />
        </div>
    )
}

export default AdminSignInForm
