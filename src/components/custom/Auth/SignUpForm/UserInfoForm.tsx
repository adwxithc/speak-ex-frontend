import { TextField } from "@mui/material"
import { useForm } from 'react-hook-form';
import Button from "../../../ui/Button/Button";
import { DevTool } from "@hookform/devtools";
import { zodResolver } from "@hookform/resolvers/zod";
import {z} from 'zod';


interface formValue{
    firstName:string;
    lastName:string;
    userName:string;
    email:string;
    password:string;
    confirm_password:string;
}

const schema = z.object({
    firstName: z.string().min(3,'first name must be minimum 3 character long'),
    lastName: z.string(),
    userName: z.string().min(3,'userName must be minimum 3 character long'),
    email: z.string().email({ message: 'Invalid email' }),
    password: z.string().min(4,'password must be min 4 character long').max(20,'password must be maximum 20 character long')
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




function UserInfoForm() {

    const methods = useForm<formValue>({
        mode:'onChange',
        resolver: zodResolver(schema), // zod resolver for form validation
      });

      const {register,control, handleSubmit,formState}=methods;
      const {errors} = formState

    const onSubmit=(data:any)=>{
        //logic for implementing submit
        console.log(data,'hjgjhghj')
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
                              borderRadius: '25px', // Adjust the value for your desired roundness
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
                              borderRadius: '25px', // Adjust the value for your desired roundness
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
                              borderRadius: '25px', // Adjust the value for your desired roundness
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
                              borderRadius: '25px', // Adjust the value for your desired roundness
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
                              borderRadius: '25px', // Adjust the value for your desired roundness
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
                              borderRadius: '25px', // Adjust the value for your desired roundness
                            },
                          }}
                    />
                

                </div>
                <Button type="submit"  varient={'primary-full'} size={"lg"} >Submit</Button>
            </form>
            <DevTool control={control} />
        </div>
    )
}

export default UserInfoForm
