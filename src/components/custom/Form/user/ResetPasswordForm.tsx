import { zodResolver } from "@hookform/resolvers/zod";
import { Dispatch, SetStateAction } from "react"
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import { useResetPasswordMutation } from "../../../../redux/features/user/user/userApiSlice";
import Button from "../../../ui/button/Button";
import { IformValue, schema } from './Schema/ResetPasswordSchema'
import { Input } from "../../../ui/input/Input";



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
        <div className="w-full text-center">
            <h1 className='text-2xl font-serif font-semibold mb-5'>Reset New Password</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="max-w-[500px] mx-auto">
                <p className='mb-5 text-sm text-gray-600'>Please provide a new strong password for you account.</p>

                <div className="my-3">

                 

                    <label htmlFor="password" className={`flex  ml-4 ${errors.password ? 'text-red-600 ' : 'text-black/60 '} `}>Password</label>
                    <Input id="password" {...register('password')} error={errors?.password?.message?.toString()} className="rounded-3xl py-7 hover:border-black " placeholder="password" />

                </div>

                <div className="my-3 mb-5">

                  

                    <label htmlFor="confirm_password" className={`flex  ml-4 ${errors.confirm_password ? 'text-red-600 ' : 'text-black/60 '} `}>Confirm Password</label>
                    <Input id="confirm_password" {...register('confirm_password')} error={errors?.confirm_password?.message?.toString()} className="rounded-3xl py-7 hover:border-black " placeholder="Confirm Password" />


                </div>

                <Button type="submit" varient={'primary-full'} size={"lg"} >Submit</Button>
                <p>don't have an account.! <b className="cursor-pointer text-primary" onClick={() => navigate('/signup')}>Create one</b></p>
            </form>
        </div>
    )
}

export default ResetPasswordForm
