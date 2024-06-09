import React, { useRef } from 'react'
import { Input } from '../../ui/input/Input'
import Button from '../../ui/button/Button';


interface IFileInputProps{
   onImageSelected:(image:string)=>void
}

function FileInput({onImageSelected}:IFileInputProps) {

    const inputRef= useRef<HTMLInputElement>(null)

    const handleImageChange = async(e: React.ChangeEvent<HTMLInputElement>) => {

        const selectedFile = e.target.files?.[0];
       
       
        if (!selectedFile) return;
      
        const reader = new FileReader();
        
        reader.onload = () => {

            if (typeof reader.result === "string") {
                onImageSelected(reader.result.toString())
            }
        };
        reader.readAsDataURL(selectedFile);
      
    };
  return (
    <div className=" h-52 px-16 my-4 overflow-hidden rounded-md  border-2 border-dashed flex justify-center items-center p-3">
        
    <label  htmlFor="image"  >
    <div className=' flex flex-col items-center'>
        <img className='object-contain max-w-[100px]' src="./src/assets/Images/extras/uploadImg.png" alt="upload image" />
        <p className='text-gray-500 my-1'>drage and drop image here</p>
        <Button type='button' varient={'primary-outline'} size={'sm'} onClick={()=>inputRef.current?.click()} >Browse File</Button>
        <Input id="image" className="hidden " type="file" ref={inputRef} onChange={handleImageChange} accept="image/*"  />
        
    </div>
    </label>

</div>
  )
}

export default FileInput
