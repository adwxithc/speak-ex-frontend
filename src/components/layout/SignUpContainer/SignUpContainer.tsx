import { ReactNode } from "react"
import { cn } from "../../../utils/style-utils";
import { RiseLoader } from 'react-spinners';
import i18n from 'i18next';


interface SignUpProps {
  children: ReactNode;
  className?: string;
  title?: string;
  description?: string
  loading?: boolean

}
function SignUpContainer({ children, className, title, description, loading = false }: SignUpProps) {
const dir =i18n.dir()

  return (

    <div className={cn("flex flex-col md:flex-row items-center bg-gradient-to-br from-primary via-primary to-blue-900 min-h-screen md:h-screen relative overflow-hidden", className)}>

      <>
        {/* Left side - Brand section with enhanced styling */}
        <div className="md:w-2/5 order-1 h-1/3 w-full md:h-full p-6 sm:p-8 md:p-20 md:pt-[10%] text-white font-serif relative z-10">
          <div className="space-y-4 md:space-y-6">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 drop-shadow-lg leading-tight tracking-tight">{title}</h1>
            <p className="text-sm md:text-base lg:text-lg text-white/90 leading-relaxed max-w-md">{description}</p>
          </div>

          <div className="w-48 sm:w-64 hidden sm:block mt-8 md:mt-12 opacity-90 hover:opacity-100 transition-opacity duration-300 absolute">
            <img loading="lazy" src="/Images/background/glob.webp" className="drop-shadow-2xl" alt="Globe illustration" />
          </div>

        </div>

        {/* Right side - Form section with enhanced styling */}
        <div className={`w-full flex-1 md:w-3/5 md:h-screen order-2 md:overflow-y-scroll hide-scrollbar pt-8 sm:pt-10 md:pt-0 rounded-t-[70px] md:rounded-none ${dir=='ltr'?'md:rounded-l-full md:pl-20':'md:rounded-r-full md:pr-20'} bg-white flex items-center shadow-2xl relative`}>
          {/* Subtle gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-blue-50/30 to-transparent pointer-events-none rounded-t-[70px] md:rounded-none"></div>
          
          <div className={`w-full ${dir=='ltr'?'md:ml-5':'md:mr-5'} relative z-10 pb-8 md:pb-0`}>
            {children}
          </div>
        </div>
      </>

      {
        loading &&
        <div className="absolute top-0 h-full w-full text-center content-center bg-gradient-to-br from-black/90 to-black/80 backdrop-blur-sm z-40">
          <RiseLoader color="#fff" />
        </div>
      }
    </div>

  )
}

export default SignUpContainer
