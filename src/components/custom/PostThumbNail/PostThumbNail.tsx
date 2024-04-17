import { HTMLAttributes, forwardRef } from 'react'
import { cn } from '../../../utils/style-utils';
interface PostThumbNailProps extends HTMLAttributes<HTMLDivElement> {
    imageUrl:string,
    title:string
}


const  PostThumbNail=forwardRef<HTMLDivElement, PostThumbNailProps>(({ className,title, imageUrl, ...props }, ref)=> {
  return (
    
        
    <div className={cn(" h-56 overflow-hidden relative rounded-sm",className)} {...props} ref={ref}>
        <img src={imageUrl} className='object-cover h-full w-full' alt="post image" />
        <h1 className="absolute bottom-5 left-8 text-white z-10">{title}</h1>
        <div className='bg-gradient-to-t from-[#000000b5] to-transparent w-full absolute top-0 left-0 bottom-0'></div>
    </div>
   
  )
});

export default PostThumbNail


// <div className={cn( `bg-[url('${imageUrl}')] bg-cover h-56 relative rounded-sm`,className)} {...props} ref={ref}>
        
// <div className="bg-gradient-to-t from-[#000000b5] to-transparent w-full h-full">
// <h1 className="absolute bottom-5 left-8 text-white">Lorem ipsum dolor sit amet.</h1>
// </div>
// </div>