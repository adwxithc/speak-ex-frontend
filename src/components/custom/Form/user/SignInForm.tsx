import { FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField } from "@mui/material"
import { useForm } from 'react-hook-form';
import { Dispatch, SetStateAction } from 'react'
import { DevTool } from "@hookform/devtools";
import { zodResolver } from "@hookform/resolvers/zod";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { IformValue, schema } from './Schema/SignInSchema'
import Button from "../../../ui/Button/Button";
import { logUser } from "../../../../redux/features/user/auth/userSlice";
import { useLoginMutation } from "../../../../redux/features/user/auth/userApiSlice";
import { Trans, useTranslation } from "react-i18next";





function SignInForm({ setLoading }: { setLoading: Dispatch<SetStateAction<boolean>> }) {
    const {t} = useTranslation(['common','auth'])

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [login] = useLoginMutation()


    const methods = useForm<IformValue>({
        mode: 'onChange',
        resolver: zodResolver(schema), // zod resolver for form validation
    });

    const { register, control, handleSubmit, formState, setError } = methods;
    const { errors } = formState

    const [showPassword, setShowPassword] = useState<boolean>(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);


    const onSubmit = async (data: IformValue) => {

        try {
            setLoading(true)
            const res = await login({ ...data }).unwrap()
            dispatch(logUser({ ...res.data }));

            setLoading(false)
            navigate('/')
            
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
            <h2 className='text-2xl font-serif font-semibold mb-10'>{t('SignInHeader',{ns:'auth'})}</h2>

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

                <div className="flex justify-end px-5">
                    <NavLink className="text-primary mb-3" to={'/forgot-password'}>{t('forgotPassword',{ns:'auth'})}</NavLink>
                </div>

                <Button type="submit" varient={'primary-full'} size={"lg"} >Submit</Button>


                {/* <p>{t('createAccountDescription',{ns:'auth'})}<b className="cursor-pointer text-primary" onClick={() => navigate('/signup')}>{t('createOne',{ns:'auth'})}</b></p> */}
                <Trans
                ns={'auth'}
                i18nKey={"createAccountDescription"}
                components={{1:<b className="cursor-pointer text-primary" onClick={() => navigate('/signup')} />}}
                />


            </form>
            <DevTool control={control} />
        </div>
    )
}

export default SignInForm
