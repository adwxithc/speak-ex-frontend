import { useMemo, useState } from 'react'
import FileInput from '../FileInput/FileInput'
import ImageCroper, { ICropArea } from '../ImageCroper/ImageCroper';
import { Square } from 'lucide-react';
import CroppedImage from '../ImageCroper/CroppedImage';
import { dataURLtoFile } from '../../../services/dataURLtoFile';
import Button from '../../ui/Button/Button';


function UploadProfile() {
    const [currentPage,setCurrentPage] = useState('choose-img')
    const [newProfile, setNewProfile] = useState('')
    const [imageAfterCrop, setImageAfterCrop] = useState<string>('')
    const [imageFile, setImageFile] = useState<File | null>(null)
    const aspectRatios=useMemo(()=>[
        {ratio:1 / 1,label:'1:1',icon:Square},
    ],[])
    const handleImageSelect = (selectedImage: string)=>{
        setNewProfile(selectedImage);
        setCurrentPage('crop-img')
        
    }

    const handleCropDone = (imgCroppedArea: ICropArea) => {
         //create a canvace to crop
         const canvasElem = document.createElement('canvas');
         canvasElem.width = imgCroppedArea.width;
         canvasElem.height = imgCroppedArea.height;
 
         const ctx = canvasElem.getContext("2d")
         if (!ctx) return
         //load selected image
 
         const imageObj = new Image();
         imageObj.src = newProfile;
         imageObj.onload = () => {
             //drow croped portion of image on canvase
             ctx.drawImage(
                 imageObj,
                 imgCroppedArea.x,
                 imgCroppedArea.y,
                 imgCroppedArea.width,
                 imgCroppedArea.height,
                 0,
                 0,
                 imgCroppedArea.width,
                 imgCroppedArea.height
             );
             // convert canvase content to data url
             const dataURL = canvasElem.toDataURL("image/jpeg");
 
             setImageAfterCrop(dataURL)
             setCurrentPage('image-cropped')
             const blob = dataURLtoFile(dataURL,'jbrish')
             if(blob)
             setImageFile(blob)
         }

    }

    const handleImageUpload=()=>{
        alert('api call')
    }
    

    const handleCropCanceled = () => {
        setCurrentPage('choose-img')
    }

  return (
    <div>
        
       
      {
        currentPage=='choose-img'?
        <FileInput onImageSelected={handleImageSelect} />
        :currentPage=='crop-img'
        ?<ImageCroper
        // rounded
        aspectRatios={aspectRatios}
            onCropDone={handleCropDone}
            onCropCancel={handleCropCanceled}
            image={newProfile} />
        :<div>
             <div className='flex justify-end'> <Button onClick={handleImageUpload} className='text-primary' size={'md'}>Share</Button> </div>
            <CroppedImage imageAfterCrop={imageAfterCrop}  setpic={setNewProfile} setCurrentPage={setCurrentPage}/>
        </div>
        
      }
    </div>
  )
}

export default UploadProfile
