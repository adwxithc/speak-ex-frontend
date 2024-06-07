import { zodResolver } from '@hookform/resolvers/zod';
// import { Box, Button, TextField, Typography } from '@mui/material'
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { useAddLanguageMutation } from '../../../../redux/features/admin/languages/languagesApiSlice';
import toast from 'react-hot-toast';
import { Ierror } from '../../../../types/error';
import { Input } from '../../../../components/ui/Input/Input';
import Button from '../../../../components/ui/Button/Button';




interface formValue {
    name: string,
    basePrice: number
}

const schema = z.object({
    name: z.string().min(3, 'language name must be minimum 3 character long'),
    basePrice: z.number().min(0, 'base price should be a positive number')
})



function AddNewLanguage() {

    const [addLanguage] = useAddLanguageMutation()

    const onSubmit = async (data: formValue) => {

        try {
            const res = await addLanguage(data).unwrap()
            console.log(res);

            reset()
            toast.success('new language created', {
                position: 'top-center'
            })


        } catch (error) {
            console.log(error);
            let message = ''
            if (error.status >= 400) {
                const err = error as Ierror
                message = err.data.errors.map(item => item.message)

            } else {
                message = error.message
            }
            toast.error(message, {
                position: 'top-center'
            })

        }

    }

    const methods = useForm<formValue>({
        mode: 'onChange',
        resolver: zodResolver(schema), // zod resolver for form validation
    });

    const { register, handleSubmit, formState, reset } = methods;
    const { errors } = formState
    return (
        <div className=''>

            <form onSubmit={handleSubmit(onSubmit)}>
                
                    <div className="my-2">

                        <label htmlFor="name" className={`flex  ml-4 ${errors.name ? 'text-red-600 ' : 'text-black/60 '} `}>name</label>
                        <Input id="name" {...register('name')} error={errors?.name?.message?.toString()} className="rounded-3xl py-7 hover:border-black " placeholder="name" />
                    </div>
                   
                    <div className="my-2">

                        <label htmlFor="basePrice" className={`flex  ml-4 ${errors.basePrice ? 'text-red-600 ' : 'text-black/60 '} `}>basePrice</label>
                        <Input id="basePrice"    {...register('basePrice', { valueAsNumber: true })} error={errors?.basePrice?.message?.toString()} className="rounded-3xl py-7 hover:border-black " placeholder="basePrice" />
                    </div>
                    <div className='flex justify-end mt-5'>
                        <Button>Submit</Button>
                    </div>
                 
             




            </form>
        </div>
    )
}

export default AddNewLanguage
