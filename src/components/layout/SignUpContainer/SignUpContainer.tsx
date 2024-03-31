import { ReactNode } from "react"
import { cn } from "../../../utils/style-utils";
import Image from "../../ui/Image/Image";
import Container from "../Container/Container";

interface SignUpProps{
    children:ReactNode;
    className?:string
}
function SignUpContainer({children,className}:SignUpProps) {
  return (
    <Container className="p-0">
      <div className={cn("flex flex-col md:flex-row items-center  h-[100vh]",className)}>
        <div className="md:w-1/2  order-1 md:order-1 h-1/3 w-full md:h-full">
        
        <Image className="h-full w-full object-cover"  src="https://snapdoc.vnress.in/assets/images/login-side-img.png" blurHash="LEHV6nWB2yk8pyo0adR*.7kCMdnj" />
        
        </div>
        <div className="w-full h-full md:w-1/2 md:h-[100vh] order-1 md:order-2  md:overflow-y-scroll hide-scrollbar  flex items-center justify-center bg-blue-500">
        {children}
        </div>
       
    </div>
    </Container>
  )
}

export default SignUpContainer
