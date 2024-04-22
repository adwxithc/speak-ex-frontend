
import { PostData } from "./CreatePost";
import FileInput from "../../../components/custom/FileInput/FileInput";
import { Dispatch, SetStateAction, useState } from 'react';
import ImageCroper, { ICropArea } from '../../../components/custom/ImageCroper/ImageCroper';
import CroppedImage from "../../../components/custom/ImageCroper/CroppedImage";


const dataURLtoFile = (dataurl:string, filename:string) => {
    const arr = dataurl.split(',')
        const mimeMatch = arr[0].match(/:(.*?);/);
        if(!mimeMatch)return
        const mime=mimeMatch[1]
        const bstr = atob(arr[1])
        let n = bstr.length
        const u8arr = new Uint8Array(n)
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n)
    }
    return new File([u8arr], filename, { type: mime })
}

interface IUploadImage {
    updateFields: (fields: Partial<PostData>) => void;
    image: File | null;
    setShowNext:Dispatch<SetStateAction<boolean>>
}

function UploadImage({ image, updateFields,setShowNext }: IUploadImage) {

    const [pic, setpic] = useState('')
    const [currentPage, setCurrentPage] = useState((image?'image-cropped':'choose-img'))
    const [imageAfterCrop, setImageAfterCrop] = useState<string>(image?URL.createObjectURL(image):'')

    const handleImageSelected = (selectedImage: string) => {
      
        
        setpic(selectedImage)
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
        imageObj.src = pic;
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
          
            
            updateFields({image:blob})
            setShowNext(true)
        }
    }

    const handleCropCanceled = () => {
        setCurrentPage('choose-img')
    }
 

    return (
        <div className=" w-full  p-3 flex justify-center items-center ">
            <div className="pb-5 px-3">
            {

                
            currentPage == 'choose-img' ? <FileInput onImageSelected={handleImageSelected} />
            : (currentPage == 'crop-img' ?
                <ImageCroper
                    onCropDone={handleCropDone}
                    onCropCancel={handleCropCanceled}
                    image={pic} />
                :<CroppedImage setShowNext={setShowNext} imageAfterCrop={imageAfterCrop}  setpic={setpic} setCurrentPage={setCurrentPage}/>)
            }
            </div>

            
        </div>

    )
}
export default UploadImage
