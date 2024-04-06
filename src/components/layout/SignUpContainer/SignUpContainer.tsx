import { ReactNode } from "react"
import { cn } from "../../../utils/style-utils";
// import '../../../assets/Images/language/english-language.avif'

interface SignUpProps{
    children:ReactNode;
    className?:string;
    title?:string;
    description?:string
}
function SignUpContainer({children,className, title, description}:SignUpProps) {
  return (
   
      <div className={cn("flex flex-col md:flex-row items-center  bg-primary h-[100vh]",className)}>
        <div className="md:w-1/2  order-1 md:order-1 h-1/3 w-full md:h-full p-8 md:p-20 md:pt-[10%]  text-white font-serif">
        
        <h1 className="text-6xl font-semibold mb-5   drop-shadow-md">{title}</h1>
        <p className="text-sm ms:text-md ">{description}</p>
        
        </div>
        <div className="w-full h-full md:w-2/3  md:h-[100vh] order-1 md:order-2  md:overflow-y-scroll hide-scrollbar p-5 pt-10 md:pl-20  rounded-t-[70px] md:rounded-none  md:rounded-l-full bg-white flex items-center">
          <div className="w-full">
          {children}
          
          </div> 
       
        </div>
       
    </div>
    
  )
}

export default SignUpContainer
