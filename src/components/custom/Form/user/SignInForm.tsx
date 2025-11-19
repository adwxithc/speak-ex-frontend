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
import { isHttpError } from '../../../../utils/isHttpError';





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

            
        } catch (error) {
            setLoading(false)
            if(isHttpError(error) && error.status == 400){
                setError('email', { message: error.data.errors[0].message })
                setError('password', { message: error.data.errors[0].message })
            }else{
                toast.error('something went wrong');
            }
        
        }
    }
    return (
        <div className="w-full p-5 sm:p-8 md:p-12 text-center max-w-[540px] mx-auto">
            <div className="mb-6 md:mb-10">
                <h2 className='text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-2 md:mb-3'>{t('SignInHeader', { ns: 'auth' })}</h2>
                <p className="text-gray-500 text-sm">Welcome back! Please enter your details</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 md:space-y-6">

                {/* Email Input */}
                <div className="text-left">
                    <label htmlFor="email" className={`block mb-2 ml-1 font-medium text-sm transition-colors ${errors.email ? 'text-red-600' : 'text-gray-700'}`}>
                        Email Address
                    </label>
                    <Input 
                        id="email" 
                        {...register('email')} 
                        error={errors?.email?.message?.toString()} 
                        placeholder="Enter your email" 
                    />
                </div>

                {/* Password Input */}
                <div className="text-left">
                    <label htmlFor="password" className={`block mb-2 ml-1 font-medium text-sm transition-colors ${errors.password ? 'text-red-600' : 'text-gray-700'}`}>
                        Password
                    </label>
                    <div className={`border-2 rounded-xl flex overflow-hidden items-center pr-3 transition-all duration-200 ${errors.password ? 'border-red-500 focus-within:border-red-600' : 'border-gray-300 hover:border-gray-400 focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20'}`}>
                        <input 
                            {...register('password')} 
                            placeholder="Enter your password" 
                            id="password" 
                            type={showPassword ? 'text' : 'password'} 
                            className="h-full w-full flex-1 outline-none py-4 px-5 text-base bg-transparent" 
                        />
                        <Button 
                            type='button' 
                            size={'icon'} 
                            className={`${errors.password ? 'text-red-600 hover:bg-red-50' : 'text-gray-600 hover:bg-gray-100'} transition-all duration-200 rounded-lg`} 
                            onClick={handleClickShowPassword}
                        >
                            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </Button>
                    </div>
                    {errors.password && (
                        <span className="text-red-500 text-xs ml-1 flex flex-1 mt-1">{errors.password.message}</span>
                    )}
                </div>

                {/* Forgot Password Link */}
                <div className="flex justify-end">
                    <NavLink 
                        className="text-primary hover:text-primary/80 font-medium text-sm transition-colors duration-200 hover:underline" 
                        to={'/forgot-password'}
                    >
                        {t('forgotPassword', { ns: 'auth' })}
                    </NavLink>
                </div>

                {/* Submit Button */}
                <Button 
                    type="submit" 
                    varient={'primary-full'} 
                    size={"lg"}
                >
                    Sign In
                </Button>

                {/* Sign Up Link */}
                <div className="text-gray-600 text-sm pt-2">
                    <Trans
                        ns={'auth'}
                        i18nKey={"createAccountDescription"}
                        components={{ 1: <b className="cursor-pointer text-primary hover:text-primary/80 font-semibold transition-colors duration-200" onClick={() => navigate('/signup')} /> }}
                    />
                </div>

            </form>
            <DevTool control={control} />
        </div>
    )
}

export default SignInForm
