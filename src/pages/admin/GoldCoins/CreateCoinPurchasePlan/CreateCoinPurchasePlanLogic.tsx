import { z } from 'zod'
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChangeEvent, useState } from "react";
import { useCreatePurchasePlanMutation } from "../../../../redux/features/admin/coinPurchase/coinPurchasePlanApiSlice";
import toast from "react-hot-toast";
import CreateCoinPurchasePlan from './CreateCoinPurchasePlan';


export interface IformValue {
    title: string,
    count: number,
    price: number
}

function CreateCoinPurchasePlanLogic() {
    const schema = z.object({
        title: z.string().min(3, 'title must be minimum 3 character long'),
        count: z.number().min(1, 'No. of coins  should be more than zero'),
        price: z.number().min(1, 'price  should be more than zero'),

    });

    const methods = useForm<IformValue>({
        mode: 'onChange',
        resolver: zodResolver(schema), // zod resolver for form validation
    });

    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [preview, setPreview] = useState<string >('');

    const { register, handleSubmit, formState, reset } = methods;
    const { errors, isValid } = formState

    const [createPurchasePlan, { isLoading }] = useCreatePurchasePlanMutation();
   

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return;

        const file = e.target.files[0];
        if (file) {
            setSelectedImage(file);

            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result?.toString() || '');
            };
            reader.readAsDataURL(file);
        }
    };

    const onSubmit = async (data: IformValue) => {
        if (!selectedImage) return
        const formData = new FormData()

        formData.append('image', selectedImage);
        formData.append('count', data.count.toString())
        formData.append('price', data.price.toString());
        formData.append('title', data.title);

        try {
            await createPurchasePlan(formData).unwrap();

            toast.success('Purchase plan created successfully', { position: 'top-center' });
            reset()
            setPreview('')
            setSelectedImage(null)
        } catch (error) {
            toast.error('something went wrong')
        }
    }
  return (
    <CreateCoinPurchasePlan {...{errors,handleImageChange,handleSubmit:handleSubmit(onSubmit),isLoading,isValid,preview,register}} />
  )
}

export default CreateCoinPurchasePlanLogic
