import { FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField } from "@mui/material"
import { useForm } from 'react-hook-form';
import { Dispatch, SetStateAction } from 'react'
import { DevTool } from "@hookform/devtools";
import { zodResolver } from "@hookform/resolvers/zod";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import Button from "../../../ui/Button/Button";
import { useAdminLoginMutation } from "../../../../redux/features/admin/auth/adminApiSlice";
import { logAdmin } from "../../../../redux/features/admin/auth/adminSlice";
import { IformValue, schema } from '../user/Schema/SignInSchema'

function AdminSignInForm({ setLoading }: { setLoading: Dispatch<SetStateAction<boolean>> }) {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [login] = useAdminLoginMutation()


    const methods = useForm<IformValue>({
        mode: 'onChange',
        resolver: zodResolver(schema), // zod resolver for form validation
    });

    const { register, control, handleSubmit, formState, setError } = methods;
    const { errors } = formState

    const [showPassword, setShowPassword] = useState<boolean>(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const onSubmit = async (data: IformValue) => {

        try {
            setLoading(true)
            const res = await login({ ...data }).unwrap()
            dispatch(logAdmin({ ...res.data }));

            setLoading(false)
            navigate('/admin')
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            setLoading(false)

            const errorInfo = error.data.errors;
            if (error.status == 400) {
                setError('email', { message: errorInfo[0].message })
                setError('password', { message: errorInfo[0].message })
            } else {
                toast.error(errorInfo[0].message)
            }

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
                                borderRadius: '20px', 
                            },
                        }}
                    />
                </div>

                <div className="my-5">



                    <FormControl sx={{
                        width: '100%', '& .MuiOutlinedInput-root': {
                            borderRadius: '20px', 
                            paddingRight: 4
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
                                        sx={{ color: errors.password && 'red' }}
                                    >

                                        {showPassword ? <VisibilityOff /> : <Visibility />}
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
