import { useState, useEffect } from "react";
import { Blurhash } from "react-blurhash";
import { cn } from "../../../utils/style-utils";
interface IImageProps{
    src:string;
    blurHash: string;
    width?: number;
    height?: number;
    alt?: string;
    className?:string;

}
function Image({src,blurHash, width, height,alt, className}:IImageProps) {
    const [imageLoaded, setImageLoaded] = useState(false)

    useEffect(()=>{
        const img = document.createElement('img');
        img.onload=()=>{
            setImageLoaded(true)
        }
        img.src=src
    },[src])
  return (
    <>
    <div style={{display:imageLoaded?'none':'inline'}}>
        <Blurhash
        hash={blurHash}
        width={width}
        height={height}
        resolutionX={32}
        resolutionY={32}
        punch={1}
        className={cn(className)}
         />
    </div>
    <img 
    width={width}
    height={height}
    className={cn(className)}
    src={src}
     alt={alt}
     style={{display:!imageLoaded?'none':'inline'}}
      />
    </>
  )
}

export default Image
