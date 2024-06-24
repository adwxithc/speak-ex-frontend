import React, { useState } from 'react';
import { cn } from '../../../utils/style-utils';
import Skeleton from 'react-loading-skeleton';

export interface AvatarProps {
  src?: string;
  size?: number;
  className?: string;
}

const Avatar: React.FC<AvatarProps> = ({ src, size = 24, className }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  if (src) {
    // Render image avatar
    return (
      <>
        {!imageLoaded && (

          <Skeleton
           
            className={cn(className)}
          />)
        }
        <img
          src={src||'src/assets/Images/placeholder/nopic.jpg'}
          alt="Avatar"
          className={cn(`w-24 h-24 rounded-full object-cover `, className)}
          onLoad={() => setImageLoaded(true)}
          style={{ display: imageLoaded ? "inline" : "none" }}
        />
      </>
    );
  }


};

export default Avatar;
