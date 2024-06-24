import React, { useState } from 'react';
import { cn } from '../../../utils/style-utils';
import Skeleton from 'react-loading-skeleton';

export interface AvatarProps {
  src?: string;
  initials?: string;
  size?: number;
  className?: string;
}

const Avatar: React.FC<AvatarProps> = ({ src, initials, size = 24, className }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  if (src) {
    // Render image avatar
    return (
      <>
        {!imageLoaded && (

          <Skeleton
            width={size}
            height={size}
            className={cn(className)}
          />)
        }
        <img
          src={src}
          alt="Avatar"
          className={cn(`w-24 h-24 rounded-full object-cover `, className)}
          onLoad={() => setImageLoaded(true)}
          style={{ display: imageLoaded ? "inline" : "none" }}
        />
      </>
    );
  }

  // Render initials avatar as fallback
  return (
    <div
      className={cn(`w-${size} h-${size} rounded-full bg-gray-300 text-white text-lg font-bold flex justify-center items-center`, className)}
    >
      {initials}
    </div>
  );
};

export default Avatar;
