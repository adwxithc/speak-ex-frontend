import { ReactNode } from "react"
import { cn } from "../../../utils/style-utils";


interface SignUpProps{
    children:ReactNode;
    className?:string;
    title?:string;
    description?:string
}
function SignUpContainer({children,className, title, description}:SignUpProps) {
  return (
   
      <div className={cn("flex flex-col md:flex-row items-center  h-[100vh]",className)}>
        <div className="md:w-1/3  order-1 md:order-1 h-1/3 w-full md:h-full p-8 md:p-20 md:pt-[10%] bg-[url(https://snapdoc.vnress.in/assets/images/login-side-img.png)] bg-no-repeat bg-cover ">
        
        <h1 className="text-4xl font-semibold mb-5   drop-shadow-md">{title}</h1>
        <p className="text-sm ms:text-md text-gray-400">{description}</p>
        
        </div>
        <div className="w-full h-full md:w-1/2 md:h-[100vh] order-1 md:order-2  md:overflow-y-scroll hide-scrollbar p-10 md:pt-20 ">
        {children}
        </div>
       
    </div>
    
  )
}

export default SignUpContainer
