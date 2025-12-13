import { zodResolver } from "@hookform/resolvers/zod";
import { Dispatch, SetStateAction } from "react"
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import { useResetPasswordMutation } from "../../../../redux/features/user/user/userApiSlice";
import Button from "../../../ui/Button/Button";
import { IformValue, schema } from './Schema/ResetPasswordSchema'
import { Input } from "../../../ui/Input/Input";



function ResetPasswordForm({ setLoading }: { setLoading: Dispatch<SetStateAction<boolean>> }) {

    const [resetPassword] = useResetPasswordMutation()
    const navigate = useNavigate()
    const methods = useForm<IformValue>({
        mode: 'onChange',
        resolver: zodResolver(schema), // zod resolver for form validation
    });
    const { register, handleSubmit, formState } = methods;
    const { errors } = formState

    const onSubmit = async (data: IformValue) => {
        try {
            setLoading(true)

            const res = await resetPassword({ password: data.password }).unwrap()
            navigate('/signin')
            toast(res.message, {
                position: 'top-center'
            })
            setLoading(false)
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            setLoading(false)
            const errorInfo = error.data.errors;

            toast.error(errorInfo[0].message)
        }
    }



    return (
        <div className="w-full p-5 sm:p-8 md:p-12 text-center max-w-[580px] mx-auto">
            <div className="mb-6 md:mb-10">
                <h1 className='text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-3 md:mb-4'>Reset Your Password</h1>
                <p className='text-gray-600 leading-relaxed text-sm md:text-base'>
                    Please provide a new strong password for your account.
                </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 md:space-y-6">

                {/* Password Field */}
                <div className="text-left">
                    <label htmlFor="password" className={`block mb-2 ml-1 font-medium text-sm transition-colors ${
                        errors.password ? 'text-red-600' : 'text-gray-700'
                    }`}>
                        New Password
                    </label>
                    <Input 
                        type="password" 
                        id="password" 
                        {...register('password')} 
                        error={errors?.password?.message?.toString()} 
                        placeholder="Create a strong password" 
                    />
                </div>

                {/* Confirm Password Field */}
                <div className="text-left">
                    <label htmlFor="confirm_password" className={`block mb-2 ml-1 font-medium text-sm transition-colors ${
                        errors.confirm_password ? 'text-red-600' : 'text-gray-700'
                    }`}>
                        Confirm Password
                    </label>
                    <Input 
                        type="password" 
                        id="confirm_password" 
                        {...register('confirm_password')} 
                        error={errors?.confirm_password?.message?.toString()} 
                        placeholder="Re-enter your password" 
                    />
                </div>

                {/* Submit Button */}
                <Button 
                    type="submit" 
                    varient={'primary-full'} 
                    size={"lg"}
                >
                    Reset Password
                </Button>

                {/* Sign Up Link */}
                <div className="text-center pt-2">
                    <p className="text-gray-600 text-sm">
                        Don't have an account? <b className="cursor-pointer text-primary hover:text-primary/80 font-semibold transition-colors duration-200" onClick={() => navigate('/signup')}>Create one</b>
                    </p>
                </div>
            </form>
        </div>
    )
}

export default ResetPasswordForm
