import { use } from "i18next";
import { useState } from "react";

    interface ImageCrperProps{
    image:string;
    onCropDone:()=>void;
    onCropCancel:()=>void
    }

function ImageCroper({image,onCropDone,onCropCancel}:ImageCrperProps) {
    const [crop, setCrop] = useState({x:0,y:0});
    const [zoom, setZoom] = useState(1)
    const [croppedArea, SetCroppedArea] = useState(null)
    const [setAspectRatio, SetAspectRatio] = useState(4/3)
  return (
    <div>
      ImageCroper
    </div>
  )
}

export default ImageCroper
