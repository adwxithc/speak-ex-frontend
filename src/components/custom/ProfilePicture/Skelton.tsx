import { HTMLAttributes } from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'
import { cn } from '../../../utils/style-utils';

interface profilePictureSkeltonProp extends HTMLAttributes<HTMLDivElement>{

}

function Skelton({className}:profilePictureSkeltonProp) {
  return (
    <div className={cn(`h-full`,className)}>
      <Skeleton baseColor="#a7a6a6" highlightColor="#969595" className='h-full w-full text-[#a7a6a6]' />
    </div>
  )
}

export default Skelton
