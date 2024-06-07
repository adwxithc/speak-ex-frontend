import { useForm } from 'react-hook-form';
import { Dispatch, SetStateAction } from 'react'
import { DevTool } from "@hookform/devtools";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { IformValue, schema } from './Schema/SignInSchema'
import Button from "../../../ui/Button/Button";
import { setCridentials } from "../../../../redux/features/user/user/userSlice";
import { useLoginMutation } from "../../../../redux/features/user/user/userApiSlice";
import { Trans, useTranslation } from "react-i18next";
import { Input } from "../../../ui/Input/Input";
import { Eye, EyeOff } from "lucide-react";





function SignInForm({ setLoading }: { setLoading: Dispatch<SetStateAction<boolean>> }) {
    const { t } = useTranslation(['common', 'auth'])

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
            dispatch(setCridentials({ ...res.data }));

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
            <h2 className='text-2xl font-serif font-semibold mb-10'>{t('SignInHeader', { ns: 'auth' })}</h2>

            <form onSubmit={handleSubmit(onSubmit)}>


                <div className="my-2">

                    <label htmlFor="email" className={`flex  ml-4 ${errors.email ? 'text-red-600 ' : 'text-black/60 '} `}>email</label>
                    <Input id="email" {...register('email')} error={errors?.email?.message?.toString()} className="rounded-3xl py-7 hover:border-black " placeholder="email" />
                </div>

                <div className="my-2">


                    <label htmlFor="password" className={`flex  ml-4 ${errors.password ? 'text-red-600 ' : 'text-black/60 '} `}>password</label>
                    <div className={`border rounded-3xl  flex overflow-hidden items-center pr-4 focus:border-2  ${errors.password ? 'border-red-600' : 'border-black/30 hover:border-black'}`}>
                        <input {...register('password')} placeholder="Password" id="password" type={showPassword ? 'text' : 'password'} className="h-full w-full flex-1 outline-none py-4 px-5" />
                        <Button type='button' size={'icon'} className={`${errors.password ? 'text-red-600' : 'text-black/70'} hover:bg-black/5 transition-colors duration-500`} onClick={handleClickShowPassword}>
                            {
                                showPassword ? <EyeOff /> : <Eye />
                            }


                        </Button>

                    </div>
                    {errors.password && (
                        <span className="text-red-500 text-xs ml-4 flex flex-1">{errors.password.message}</span>
                    )}
                </div>

                <div className="flex justify-end px-5">
                    <NavLink className="text-primary mb-3" to={'/forgot-password'}>{t('forgotPassword', { ns: 'auth' })}</NavLink>
                </div>

                <Button type="submit" varient={'primary-full'} size={"lg"} >Submit</Button>


                <Trans
                    ns={'auth'}
                    i18nKey={"createAccountDescription"}
                    components={{ 1: <b className="cursor-pointer text-primary" onClick={() => navigate('/signup')} /> }}
                />


            </form>
            <DevTool control={control} />
        </div>
    )
}

export default SignInForm
