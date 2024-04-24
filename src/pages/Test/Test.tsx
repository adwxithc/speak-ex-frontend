import { useState } from "react"
import AutoCompleteDropDown from "../../components/ui/AutoCompleteDropDown/AutoCompleteDropDown"

const language=[
  {
    label:'english',
    
    },
    {
      label:'malayalam'
    },
    {
      label:'japan'
    },
    {
      label:'german'
    },
    {
      label:'latin'
    },
    {
      label:'arbic'
    },
    {
      label:'french'
    },
    {
      label:'russian'
    }
]

function Test() {
  const [lang,setLang] = useState<{ label: string; value: string; } | null>(null)
  return (
    <>
    <div className="h-screen flex justify-center p-10">
      {JSON.stringify(lang)}
      <div className="w-72">
      <AutoCompleteDropDown list={language} onItemSelect={setLang} />
      </div>
    
    </div>
    </>
  ) 
}


// import { useState } from "react";
// import 'react-image-crop/dist/ReactCrop.css'

// import { PostData } from "./CreatePost";
// import { Input } from "../../../components/ui/Input/Input";


// interface IUploadImage{
//     updateFields: (fields: Partial<PostData>) => void;
//     image:File|null;
// }

// function UploadImage({image, updateFields}:IUploadImage) {


//     const [imageSrc, setImageSrc] = useState<string>((image?URL.createObjectURL(image): ""));
   
//     const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {

//         const selectedFile = e.target.files?.[0];
//         if (!selectedFile) return;
//         const reader = new FileReader();
        
//         reader.onload = () => {
          
//             if (typeof reader.result === "string") {
//                 setImageSrc(reader.result.toString());
             
//                 updateFields({ image: selectedFile });
//             }
//         };
//         reader.readAsDataURL(selectedFile);
      
//     };


//   return (
//     <div classlabel="h-full min-w-[500px] p-3 ">
        
//             <label htmlFor="image">
//             <div classlabel='h-1/2 w-2/3 mx-auto mt-10  rounded-md border-2  border-dashed flex justify-center items-center'>
//                 <Input id="image" classlabel="hidden " type="file" onChange={handleImageChange} accept="image/*" />
//                 <img classlabel="object-cover " src={imageSrc} alt="" />
//             </div>
//             </label>

// </div>

            
    
//   )
// }

// export default UploadImage


export default Test
