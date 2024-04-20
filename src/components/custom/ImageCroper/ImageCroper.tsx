import Cropper, { Area } from 'react-easy-crop'
import React, { useState } from "react";
import { RectangleHorizontal, RectangleVertical, Square } from 'lucide-react';
import Button from '../../ui/Button/Button';


interface ImageCrperProps {
    image: string;
    onCropDone: (imgCroppedArea: ICropArea) => void;
    onCropCancel: () => void
}

export interface ICropArea {
    width: number;
    height: number;
    x: number;
    y: number;
}

function ImageCroper({ image, onCropDone, onCropCancel }: ImageCrperProps) {
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1)
    const [croppedArea, setCroppedArea] = useState<ICropArea | null>(null)
    const [aspectRatio, setAspectRatio] = useState(4 / 3)


    const handleCropComplete = (_: Area, CroppedAredPixels: Area) => {
        //store cropped area in pixels
        setCroppedArea(CroppedAredPixels)
    }

    const onAspectRationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAspectRatio(parseFloat(e.target.value))
    }
    return (
        <>
            <div className='relative h-[50vh] w-[50vw] border rounded-t-md overflow-hidden flex items-center justify-center'>

                {/* image cropper component */}
                <Cropper
                    image={image}
                    aspect={aspectRatio}
                    crop={crop}
                    zoom={zoom}
                    onCropChange={setCrop}
                    onZoomChange={setZoom}
                    onCropComplete={handleCropComplete}
                    style={{
                        containerStyle: {
                            width: "100%",
                            height: "80%",
                            backgroundColor: '#fff'
                        }
                    }}
                />



            </div>
            <div className=''>
                <div onChange={onAspectRationChange} className='flex gap-5 justify-center p-3  border border-t-0'>
                    
                    <input className='hidden' id='11' type="radio" value={1 / 1} name="ratio" /><label htmlFor="11"><span className='flex flex-col items-center'><Square /> 1:1</span>  </label>
                    
                    <input className='hidden' id='43' type="radio" value={4 / 3} name="ratio" /><label htmlFor="43"><span className='flex flex-col items-center'><RectangleVertical /> 4:3</span> </label>
                   
                    <input className='hidden' id='69' type="radio" value={16 / 9} name="ratio" /><label htmlFor="69"> <span className='flex flex-col items-center'><RectangleHorizontal /> 6:9</span> </label>
                </div>

                <div className='flex justify-center mt-2 rounded-b-md'>

                    <Button varient={'primary-outline'} size={'md'} type='button' onClick={onCropCancel} >Cancel</Button>
                    <Button varient={'primary'} size={'md'} type='button' onClick={() => onCropDone(croppedArea as ICropArea)} >Apply</Button>
                    
                </div>
            </div>
        </>
    )
}

export default ImageCroper
