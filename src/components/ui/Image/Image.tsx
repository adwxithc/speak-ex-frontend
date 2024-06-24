import { useState } from "react";
import { cn } from "../../../utils/style-utils";
import Skeleton from "react-loading-skeleton";


interface IImageProps {
  src: string;
  width?: number;
  height?: number;
  alt?: string;
  className?: string;
}

function Image({ src, width = 100, height = 100, alt = "", className = "" }: IImageProps) {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <>
      {!imageLoaded && (
          <Skeleton
          className={cn('rounded-none',className)}
          />
        
      )}
      <img
        width={width}
        height={height}
        className={cn(className)}
        src={src}
        alt={alt}
        onLoad={() => setImageLoaded(true)}
        style={{ display: imageLoaded ? "inline" : "none" }}
      />
    </>
  );
}

export default Image;
