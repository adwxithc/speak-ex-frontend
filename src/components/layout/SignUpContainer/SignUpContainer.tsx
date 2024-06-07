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

    <div className={cn("flex flex-col md:flex-row items-center  bg-primary h-[100vh] relative", className)}>

      <>
        <div className="md:w-2/5  order-1  h-1/3 w-full md:h-full p-8 md:p-20 md:pt-[10%]  text-white font-serif">

          <h1 className="text-3xl font-semibold mb-10   drop-shadow-md ">{title}</h1>
          <p className="text-sm ms:text-md ">{description}</p>

          <div className=" w-64 hidden sm:block">
            <img loading="lazy" src="/Images/background/glob.webp" className="mt-10" />
          </div>


        </div>
        <div className={`w-full h-full md:w-3/5  md:h-[100vh] order-2  md:overflow-y-scroll hide-scrollbar  pt-10    rounded-t-[70px] md:rounded-none ${dir=='ltr'?'md:rounded-l-full md:pl-20':'md:rounded-r-full md:pr-20'}   bg-white flex items-center`}>
          <div className={`w-full ${dir=='ltr'?'md:ml-5':'md:mr-5'} `}>
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
