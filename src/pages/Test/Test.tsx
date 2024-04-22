import PostWraper from "../../components/layout/PostWraper/PostWraper"
import Avatar from "../../components/ui/Avatar/Avatar"
import parse from 'html-react-parser'
import Button from "../../components/ui/Button/Button"
import { MessageCircle, Plus, ThumbsUp } from "lucide-react"


function Test() {

 

  return (
    <>
      <div className={`h-full my-5 `}>
            
      <PostWraper>
        
          <div className="  border-b w-full flex justify-center">
            
                
            <img className="w-full h-full" src={'https://language-learning-platform.s3.eu-north-1.amazonaws.com/80d4386dd679437295bacef5cdc052e6dbc6333c0094de554cad04533bf90f5f'} alt="" />
                
                
            </div>

            <div className="px-2 mt-14 ">
                
                
          <div className=" py-8 text-left">
            <h1 className="text-4xl md:text-5xl font-semibold leading-normal ">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Labore rem accusamu</h1>
        
          </div>

          <div className=" my-8 flex items-center justify-between w-full">
            <div className="flex items-center">
            <Avatar className="h-16 w-16" src="https://marketplace.canva.com/EAFHfL_zPBk/1/0/1600w/canva-yellow-inspiration-modern-instagram-profile-picture-kpZhUIzCx_w.jpg" />
            <div className="ml-2">
            <h3 className="text-gray-800 font-semibold">Adwaith</h3>
            <p className="text-sm text-gray-500 truncate w-full">adwaithjanardhanan0@gmail.com </p>
            
            </div>

          
            </div>
          
            <div>
              <Button varient={'primary-outline'} size={'md'}> <Plus /> Follow</Button>
            </div>
          </div>

          <div className="mb-2">
          <p className="text-gray-400 text-sm">December 8, 2021</p>
          </div>
          

          <div className="my-8">
          <div className="tiptap w-full">
          {parse(`<h1>Be better very day</h1><h2><strong>Today i started to learn new language</strong> </h2><h2>What is Lorem Ipsum?</h2><p style="text-align: justify"><strong>Lorem Ipsum</strong> is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p><p style="text-align: justify"><br><strong><em>What is Lorem Ipsum?</em></strong></p><blockquote><p style="text-align: justify"><strong>Lorem Ipsum</strong> is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining </p></blockquote>`)}
          </div>
          </div>
          </div>
      </PostWraper>
    
           
      <div className="w-full bg-white border sticky  bottom-0">
        <PostWraper>
          <div className=" flex justify-between text-gray-600">
           <div className="flex">
           <div className="flex mr-8">
            <ThumbsUp />
            Like
            </div >
            <div className="flex">
            <MessageCircle />
            comment
            </div>
           </div>
           <div>
            22 comments
           </div>
          </div>

          
        </PostWraper>
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
