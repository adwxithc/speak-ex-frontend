import { useEffect, useState } from "react";
import VideoCallChat from "../user/VideoSession/VideoCallChat"
import VideoChatArea from "../user/VideoSession/VideoChatArea"



function Test() {
  const [isMobile, setIsMobile] = useState(true);
  const [chating, setChating] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setIsMobile(width <= 768); // Adjust breakpoint as needed
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (

    <div className="flex">

      {
        isMobile?(
          chating?(
            <div className="w-96 border-l dark:border-l-[#091220]">
              <VideoCallChat />
            </div>
          )
          :(
            <div className="flex-1">
              <VideoChatArea />
            </div>
          )
        )
        :(
          <>
          <div className="flex-1">
            <VideoChatArea />
          </div>
        
          <div className="w-96 border-l dark:border-l-[#091220]">
          <VideoCallChat />
          </div>
          </>
        )
      }


      
    </div>
    
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
