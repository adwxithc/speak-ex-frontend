import Cropper, { Area } from 'react-easy-crop'
import React, { useState } from "react";
import { LucideIcon} from 'lucide-react';
import Button from '../../ui/Button/Button';


interface ImageCrperProps {
    image: string;
    onCropDone: (imgCroppedArea: ICropArea) => void;
    onCropCancel: () => void,
    aspectRatios:{
        ratio: number;
        label: string;
        icon: LucideIcon;
    }[];
    rounded?:boolean

}

export interface ICropArea {
    width: number;
    height: number;
    x: number;
    y: number;
}

function ImageCroper({ image, onCropDone, onCropCancel,aspectRatios,rounded=false }: ImageCrperProps) {
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1)
    const [croppedArea, setCroppedArea] = useState<ICropArea | null>(null)
    const [aspectRatio, setAspectRatio] = useState(aspectRatios[0].ratio)


    const handleCropComplete = (_: Area, CroppedAredPixels: Area) => {
        //store cropped area in pixels
        setCroppedArea(CroppedAredPixels)
    }

    const onAspectRationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAspectRatio(parseFloat(e.target.value))
    }
    return (
        <>
            <div className='relative h-[50vh] sm:w-[50vw] border rounded-t-md overflow-hidden flex items-center justify-center'>

                {/* image cropper component */}
                <Cropper
                    image={image}
                    aspect={aspectRatio}
                    crop={crop}
                    zoom={zoom}
                    onCropChange={setCrop}
                    onZoomChange={setZoom}
                    onCropComplete={handleCropComplete}
                    cropShape={ rounded ?'round': 'rect'}
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
                    
                    {
                        aspectRatios.map(ratio=>(<div key={ratio.ratio}> <input className='hidden' id={ratio.label} type="radio" value={ratio.ratio} name="ratio" /><label htmlFor={ratio.label}><span className='flex flex-col items-center'>{<ratio.icon />} {ratio.label}</span>  </label></div>))
                    }
                 
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
