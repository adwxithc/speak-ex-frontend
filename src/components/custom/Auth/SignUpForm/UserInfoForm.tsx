import { TextField } from "@mui/material"
import { useFormContext } from 'react-hook-form';
import Button from "../../../ui/Button/Button";
import { DevTool } from "@hookform/devtools";


function UserInfoForm() {
    const { register, handleSubmit,control, formState: { errors } } = useFormContext();
    const onSubmit=(data:any)=>{
        //logic for implementing submit
        console.log(data,'hjgjhghj')
    }
    return (
        <div className="w-full p-5 ">
            <h2 className='text-2xl font-semibold mb-8'>Set  Personal info</h2>

            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="sm:flex gap-1  ">
                    <TextField
                        className=" w-full my-3"
                        label="First Name"
                        {...register('fname')}
                        error={!!errors.fname}
                        helperText={errors.fname ? errors.fname.message?.toString() : ''}
                    />
                    <TextField
                        className=" w-full my-3"
                        label="Last Name"
                        {...register('lname')}
                        error={!!errors.lname}
                        helperText={errors.lname ? errors.lname.message?.toString() : ''}
                    />
                </div>

                <div className="sm:flex gap-1   ">
                    <TextField
                        className=" w-full my-3"
                        label="Email"
                        {...register('email')}
                        error={!!errors.email}
                        helperText={errors.email ? errors.email.message?.toString() : ''}
                    />
                    <TextField
                        className=" w-full my-3"
                        label="Phone Number"
                        {...register('phone')}
                        error={!!errors.phone}
                        helperText={errors.phone ? errors.phone.message?.toString() : ''}
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
                    />
                </div>

                <div className="my-3">

                    <TextField
                        type="password"
                        label="Confirm Password"
                        className="w-full "
                        {...register('confirm_password')}
                        error={!!errors.confirm_password}
                        helperText={errors.confirm_password ? errors.confirm_password.message?.toString() : ''}
                    />

                </div>
                <Button type="submit"  varient={'primary'} size={'md'} >Submit</Button> : 
            </form>
            <DevTool control={control} />
        </div>
    )
}

export default UserInfoForm
