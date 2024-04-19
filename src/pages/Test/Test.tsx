
import { useState } from "react";
import Button from "../../components/ui/Button/Button";
import Modal from "../../components/custom/Modal/Modal";
import { AnimatePresence } from "framer-motion";



function Test() {

const [modalOpen, setModalOpen ] = useState(false)

  return (
    <>
      <div className="h-screen">
      <Button onClick={()=>setModalOpen(cur=>!cur)} >open</Button>
    
      lorem*300
      
    </div>
  <AnimatePresence
  initial={false}
  mode="wait"
  >
  {modalOpen && <Modal  handleClose={()=>{setModalOpen(false)}} ><div className="h-[90vh] w-[90vw]">ff</div></Modal>}
  </AnimatePresence>
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
//     <div className="h-full min-w-[500px] p-3 ">
        
//             <label htmlFor="image">
//             <div className='h-1/2 w-2/3 mx-auto mt-10  rounded-md border-2  border-dashed flex justify-center items-center'>
//                 <Input id="image" className="hidden " type="file" onChange={handleImageChange} accept="image/*" />
//                 <img className="object-cover " src={imageSrc} alt="" />
//             </div>
//             </label>

// </div>

            
    
//   )
// }

// export default UploadImage


export default Test
