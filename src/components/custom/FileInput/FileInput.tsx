import React from 'react'
import { Input } from '../../ui/Input/Input'

interface IFileInputProps{
   onImageSelected:(image:string)=>void
}

function FileInput({onImageSelected}:IFileInputProps) {

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {

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
    <div className=" p-3 ">
        
    <label htmlFor="image">
    <div className='h-10 w-20 bg-primary'>
        <Input id="image" className="hidden " type="file" onChange={handleImageChange} accept="image/*" />
        
    </div>
    </label>

</div>
  )
}

export default FileInput
