import { ReactNode } from "react"
import { cn } from "../../../utils/style-utils";
import Image from "../../ui/Image/Image";
import {RiseLoader} from 'react-spinners';



interface SignUpProps{
    children:ReactNode;
    className?:string;
    title?:string;
    description?:string
    loading?:boolean
    
}
function SignUpContainer({children,className, title, description,loading=false}:SignUpProps) {
  
  
  return (
   
      <div className={cn("flex flex-col md:flex-row items-center  bg-primary h-[100vh] relative",className)}>
       
        <>
        <div className="md:w-2/5  order-1  h-1/3 w-full md:h-full p-8 md:p-20 md:pt-[10%]  text-white font-serif">
        
        <h1 className="text-3xl font-semibold mb-10   drop-shadow-md ">{title}</h1>
        <p className="text-sm ms:text-md ">{description}</p>

        <Image blurHash="LAIYX;M{00xu~qt74.D%00j]?b%M" src="/src/assets/Images/signup.png" height={250} width={250} className="mt-10" />
        
        </div>
        <div className="w-full h-full md:w-3/5  md:h-[100vh] order-2  md:overflow-y-scroll hide-scrollbar  pt-10 md:pl-20  rounded-t-[70px] md:rounded-none  md:rounded-l-full bg-white flex items-center">
          <div className="w-full  md:ml-5">
          {children}
          
          </div> 
       
        </div>
        </>
    
    {
      loading &&
      <div className="absolute top-0 h-full w-full text-center content-center bg-[#000000e2] z-40"><RiseLoader color="#fff" /></div>
    }   
    </div>
    
  )
}

export default SignUpContainer
