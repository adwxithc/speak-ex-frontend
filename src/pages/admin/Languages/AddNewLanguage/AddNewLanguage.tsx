import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { useAddLanguageMutation } from '../../../../redux/features/admin/languages/languagesApiSlice';
import toast from 'react-hot-toast';
import { Input } from '../../../../components/ui/input/Input';
import Button from '../../../../components/ui/button/Button';
import { isHttpError } from '../../../../utils/isHttpError';




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
            await addLanguage(data).unwrap()
            reset()
            toast.success('new language created', {
                position: 'top-center'
            })

        } catch (error) {
            let message = ''
            if (isHttpError(error) && error.status >= 400) {
                message = error.data.errors.map(item => item.message).join(',');
            } else {
                message = 'something went wrong';
            }
            toast.error(message, {
                position: 'top-center'
            });
        }

    }



    const methods = useForm<formValue>({
        mode: 'onChange',
        resolver: zodResolver(schema), // zod resolver for form validation
    });

    const { register, handleSubmit, formState, reset } = methods;
    const { errors } = formState
    return (
        <div className='overflow-x-auto w-full p-5'>
            <div className='max-w-xl min-w-[500px] m-auto py-5  '>

                <div className='font-semibold my-5'>
                    <h2 className='text-black/80 text-2xl mb-2'>Add new Language</h2>
                    <p className='text-black/50 text-sm '>add a new language with a base price  to the platform</p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)}>

                    <div className="my-2">

                        <label htmlFor="name" className={`flex  ${errors.name ? 'text-red-600 ' : 'text-black/60 '} `}>name</label>
                        <Input id="name" {...register('name')} error={errors?.name?.message?.toString()} className=" hover:border-black " placeholder="name" />
                    </div>

                    <div className="my-2">

                        <label htmlFor="basePrice" className={`flex  ${errors.basePrice ? 'text-red-600 ' : 'text-black/60 '} `}>basePrice</label>
                        <Input id="basePrice"    {...register('basePrice', { valueAsNumber: true })} error={errors?.basePrice?.message?.toString()} className=" hover:border-black " placeholder="basePrice" />
                    </div>
                    <div className='flex justify-end mt-5'>
                        <Button varient={'primary-square'} size={'md'} >Submit</Button>
                    </div>

                </form>
            </div>
        </div>

    )
}

export default AddNewLanguage
