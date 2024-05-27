import { useForm } from "react-hook-form";
import Button from "../../../components/ui/Button/Button"
import { Input } from "../../../components/ui/Input/Input"
import {z} from 'zod'
import { zodResolver } from "@hookform/resolvers/zod";
import { ChangeEvent, useState } from "react";

interface IformValue{
    title:string,
    coins:number,
    price:number
}

function CreateCoinPurchasePlan() {

    const schema = z.object({
        title: z.string().min(3,'title must be minimum 3 character long'),
        coins: z.number().min(1,'No. of coins  should be more than zero'),
        price: z.number().min(1,'price  should be more than zero'),
    
    });

    const methods = useForm<IformValue>({
        mode: 'onChange',
        resolver: zodResolver(schema), // zod resolver for form validation
      });

      const [selectedImage, setSelectedImage] = useState<File|null>(null);
      const [preview, setPreview] = useState<string|null>(null);

      const { register, handleSubmit, formState, } = methods;
      const { errors,isValid } = formState

      const handleImageChange = (e:ChangeEvent<HTMLInputElement>) => {
        if(!e.target.files) return;

        const file = e.target.files[0];
        if (file) {
          setSelectedImage(file);
    
          const reader = new FileReader();
          reader.onloadend = () => {
            setPreview(reader.result?.toString()||'');
          };
          reader.readAsDataURL(file);
        }
      };

      const onSubmit=(data:IformValue)=>{
        if(!selectedImage) return
        const formData= new FormData()
   
        formData.append('image',selectedImage);
        formData.append('coins',data.coins.toString())
        formData.append('price',data.price.toString());
        formData.append('title',data.title);

        console.log(formData);
        
      }


  return (
    <div className="max-w-4xl min-w-[700px]  mx-auto overflow-x-auto">
     <h2 className="text-2xl font-medium my-5 text-black/80">Create Plan</h2>
     <p className="mb-4 text-black/60 font-medium text-sm">Create gold coin purchase plan for  users </p>
     <form onSubmit={handleSubmit(onSubmit)}>
     <div className="bg-white p-5 rounded shadow mb-5 text-sm">
        <label htmlFor="title" className=" font-medium text-black/70" >Plan title</label>
        <Input placeholder="Title" id="title" {...register('title')} />
        <span className="text-xs text-red-500">{errors.title?.message?.toString()}</span>

     </div>
     <div className="bg-white p-5 rounded shadow mb-5  text-sm">
      
        <div className="flex gap-3 mb-5">
        <div className="flex-1">
            <label className=" font-medium text-black/70" htmlFor="coins">No.fo coins</label>
            <Input type="number" id="coins" placeholder="No.of coins" {...register('coins',{ valueAsNumber: true })} />
            <span className="text-xs text-red-500">{errors.coins?.message?.toString()}</span>

        </div>
        <div className="flex-1">
            <label className=" font-medium text-black/70" htmlFor="coins">Price</label>
            <Input type="number"  id="coins" placeholder="Price" {...register('price',{ valueAsNumber: true })} />
            <span className="text-xs text-red-500">{errors.price?.message?.toString()}</span>
        </div>
        </div>
        <div>
            {
                preview &&
                <div className="h-40 w-40 border border-dashed border-black/60 mb-5 ">
                <img className="h-full w-full object-cover" src={preview as string} alt="" />
                </div>
            }
            
            <label htmlFor="image">
                <Input onChange={handleImageChange} id="image" type="file"  />
            </label>
        </div>
        
     </div>
     <div className="flex justify-end">
        <Button disabled={!isValid || !preview} varient={'primary-square'} size={'md'} >Create</Button>
     </div>
     </form>
    </div>
  )
}

export default CreateCoinPurchasePlan
