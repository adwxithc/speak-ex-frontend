import { RectangleHorizontal, RectangleVertical, Square } from "lucide-react";
import { Dispatch, SetStateAction, useMemo, useState } from 'react';

import ImageCroper, { ICropArea } from '../../../components/custom/ImageCroper/ImageCroper';
import CroppedImage from "../../../components/custom/ImageCroper/CroppedImage";
import { PostData } from "./CreatePost";
import FileInput from "../../../components/custom/FileInput/FileInput";
import { dataURLtoFile } from "../../../services/dataURLtoFile";

interface IUploadImage {
    updateFields: (fields: Partial<PostData>) => void;
    image: File | null;
    setShowNext:Dispatch<SetStateAction<boolean>>
}

function UploadImage({ image, updateFields,setShowNext }: IUploadImage) {

    const aspectRatios=useMemo(()=>[
        {ratio:1 / 1,label:'1:1',icon:Square},
        {ratio:4 / 3,label:'4:3',icon:RectangleVertical},
        {ratio:16 / 9,label:'16:9',icon:RectangleHorizontal}
    ],[])

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
            setShowNext(true)
            const blob = dataURLtoFile(dataURL,'jbrish')
          
            
            updateFields({image:blob})
            setShowNext(true)
        }
    }

    const handleCropCanceled = () => {
        setCurrentPage('choose-img')
    }
 

    return (
        <div className="w-full py-2">
            <div className="max-w-4xl mx-auto">
                {/* Header Section */}
                <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm mb-6">
                    <div className="flex items-start gap-3 mb-4">
                        <div className="text-3xl">
                            🖼️
                        </div>
                        <div className="flex-1">
                            <h3 className="text-xl font-bold text-gray-800 mb-2">Upload Your Cover Image</h3>
                            <p className="text-sm text-gray-600 leading-relaxed">
                                Choose an eye-catching, high-quality image that represents your blog post. 
                                The cover image is the first thing readers will see!
                            </p>
                        </div>
                    </div>

                    {/* Image Tips */}
                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4 border border-indigo-100">
                        <h4 className="font-semibold text-gray-800 text-sm mb-2 flex items-center gap-2">
                            <span className="text-primary">
                                💡
                            </span>
                            <span>Tips for best results:</span>
                        </h4>
                        <ul className="text-xs text-gray-600 space-y-1.5 ml-6">
                            <li className="flex items-start gap-2">
                                <span className="text-primary mt-0.5">•</span>
                                <span>Use high-quality, clear images that represent your content</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-primary mt-0.5">•</span>
                                <span>Choose images that are visually appealing and relevant to your topic</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-primary mt-0.5">•</span>
                                <span>Crop your image to focus on the most important elements</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Image Upload/Crop Area */}
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                    {currentPage === 'choose-img' && (
                        <div className="p-8">
                            <FileInput onImageSelected={handleImageSelected} />
                        </div>
                    )}
                    
                    {currentPage === 'crop-img' && (
                        <div className="p-6">
                            <div className="mb-4">
                                <h4 className="font-bold text-gray-800 text-base mb-1">Adjust Your Image</h4>
                                <p className="text-sm text-gray-600">
                                    Crop and adjust your image to fit perfectly. Choose an aspect ratio that works best for your content.
                                </p>
                            </div>
                            <ImageCroper
                                aspectRatios={aspectRatios}
                                onCropDone={handleCropDone}
                                onCropCancel={handleCropCanceled}
                                image={pic} 
                            />
                        </div>
                    )}
                    
                    {currentPage === 'image-cropped' && (
                        <div className="p-6">
                            <div className="mb-4 text-center">
                                <div className="inline-flex items-center gap-2 bg-green-50 text-green-700 px-4 py-2 rounded-full border border-green-200 mb-2">
                                    <span className="text-lg">
                                        ✓
                                    </span>
                                    <span className="font-semibold text-sm">Image Ready!</span>
                                </div>
                                <p className="text-sm text-gray-600">
                                    Your cover image looks great. You can change it if needed.
                                </p>
                            </div>
                            <CroppedImage 
                                setShowNext={setShowNext} 
                                imageAfterCrop={imageAfterCrop} 
                                setpic={setpic} 
                                setCurrentPage={setCurrentPage}
                            />
                        </div>
                    )}
                </div>
            </div>
        </div>

    )
}
export default UploadImage
