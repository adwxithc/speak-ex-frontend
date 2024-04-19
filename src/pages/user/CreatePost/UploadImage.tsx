
import 'react-image-crop/dist/ReactCrop.css'

import { PostData } from "./CreatePost";
import FileInput from "../../../components/custom/FileInput/FileInput";
import { useState } from 'react';
import ImageCroper from '../../../components/custom/ImageCroper/ImageCroper';


interface IUploadImage{
    updateFields: (fields: Partial<PostData>) => void;
    image:File|null;
}

function UploadImage({image, updateFields}:IUploadImage) {

const [pic, setpic] = useState('')
const [currentPage,setCurrentPage] = useState('choose-img')

    const handleImageSelected = (selectedImage:string)=>{
        setpic(selectedImage)
        setCurrentPage('crop-img')
    }

    const handleCropDone=()=>{

    }

    const handleCropCanceled=()=>{

    }


  return (
    <div className="h-full w-full min-w-[500px] p-3 ">
        {
            currentPage=='choose-img' ? <FileInput onImageSelected={handleImageSelected} />
            : (currentPage =='crop-img'?
             <ImageCroper
             onCropDone={handleCropDone}
             onCropCancel={handleCropCanceled}
             image={pic} />
            : <div></div>)
            
        }


</div>

            
    
  )
}

export default UploadImage
