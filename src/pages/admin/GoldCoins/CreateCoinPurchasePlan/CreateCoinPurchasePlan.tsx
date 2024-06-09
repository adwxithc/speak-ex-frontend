
import Button from "../../../../components/ui/button/Button"
import { Input } from "../../../../components/ui/input/Input"

import { MoonLoader } from "react-spinners";
import { IformValue } from "./CreateCoinPurchasePlanLogic";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { BaseSyntheticEvent, ChangeEvent } from "react";
import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface ICreateCoinPurchasePlanProps {
    handleSubmit: (e?: BaseSyntheticEvent<object, unknown, unknown> | undefined) => Promise<void>
    errors: FieldErrors<IformValue>;
    register: UseFormRegister<IformValue>;
    preview: string;
    handleImageChange: (e: ChangeEvent<HTMLInputElement>) => void;
    isValid: boolean;
    isLoading: boolean;
}

function CreateCoinPurchasePlan({ errors, handleImageChange, handleSubmit, isLoading, isValid, preview, register }: ICreateCoinPurchasePlanProps) {

    const navigate = useNavigate()


    return (
        <div className="max-w-4xl min-w-[700px]  mx-auto overflow-x-auto">
             <div >
                <Button onClick={()=>navigate('/admin/gold-coins')} varient={'primary-square'} size={'sm'}><ChevronLeft />Back </Button>
            </div>
            <h2 className="text-2xl font-medium my-5 text-black/80">Create Plan</h2>
           
            <p className="mb-4 text-black/60 font-medium text-sm">Create gold coin purchase plan for  users </p>
            <form onSubmit={handleSubmit}>
                <div className="bg-white p-5 rounded shadow mb-5 text-sm">
                    <label htmlFor="title" className=" font-medium text-black/70" >Plan title</label>
                    <Input placeholder="Title" id="title" {...register('title')} />
                    <span className="text-xs text-red-500">{errors.title?.message?.toString()}</span>

                </div>
                <div className="bg-white p-5 rounded shadow mb-5  text-sm">

                    <div className="flex gap-3 mb-5">
                        <div className="flex-1">
                            <label className=" font-medium text-black/70" htmlFor="coins">No.fo coins</label>
                            <Input type="number" id="coins" placeholder="No.of coins" {...register('count', { valueAsNumber: true })} />
                            <span className="text-xs text-red-500">{errors.count?.message?.toString()}</span>

                        </div>
                        <div className="flex-1">
                            <label className=" font-medium text-black/70" htmlFor="coins">Price</label>
                            <Input type="number" id="coins" placeholder="Price" {...register('price', { valueAsNumber: true })} />
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
                            <Input onChange={handleImageChange} id="image" type="file" />
                        </label>
                    </div>

                </div>
                <div className="flex justify-end">
                    <Button disabled={!isValid || !preview} varient={'primary-square'} size={'md'} >{isLoading ? <MoonLoader size={16} color="white" /> : 'Create'}</Button>

                </div>
            </form>
        </div>
    )
}

export default CreateCoinPurchasePlan
