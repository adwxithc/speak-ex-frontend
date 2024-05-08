import ReactPlayer from "react-player"
import Container from "../../../components/layout/Container/Container"
import Button from "../../../components/ui/Button/Button"
import { Mic, Video } from "lucide-react"
import { useEffect, useState } from "react"

function WaitForLearner() {
    const [localStream, setLocalStream] = useState<MediaStream | null >(null);

  useEffect(() => {
    const getLocalStream = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
          video: true
        });
        setLocalStream(stream);
      } catch (error) {
        console.error("Error accessing local media stream:", error);
      }
    };

    getLocalStream();

   
  }, []);
  return (
    
    <div className='h-full  bg-secondary  dark:bg-[#152B52] '>
    <div className="h-16 bg-white  dark:bg-[#0e1c34]"></div>
    <Container className="h-[calc(100vh-3rem)]">
       
        <div className="flex flex-col md:flex-row items-center justify-center h-full mx-5  md:gap-5">
            
        <div className="md:order-2 flex flex-col items-center justify-center w-full md:w-1/2">
          <iframe  src="https://lottie.host/embed/ce720426-7f3c-46ea-95b1-924e22564ae1/JMlzMCpwqN.json"></iframe>
          <div className=" mt-5 flex flex-col gap-5">
            <span className="sm:text-3xl  text-white font-bold ">Matching Chat Partners</span>
            <Button className="dark:hover:bg-white dark:hover:text-primary" varient={'secondary-outline'} size={'lg'} >Cancel</Button>
          </div>
        </div>

        <div className="relative aspect-video rounded-xl border dark:border-black overflow-hidden bg-black w-full md:w-1/2 ">
            <ReactPlayer className={'scale-150'}  playing url={localStream || ''}  style={{position:'absolute',top:'1',left:'1'}}   width={'100%'} height={'100%'} />
            <div className="absolute bottom-5  w-full  flex justify-center gap-2">
                <Button > <span className="border dark:border-white  hover:border-gray-400 hover:text-gray-400 p-2 rounded-full dark:text-white"><Mic /></span></Button>
                <Button > <span className="border dark:border-white  hover:border-gray-400 hover:text-gray-400  p-2 rounded-full dark:text-white"><Video /></span></Button>
            </div>
           
        </div>
         

        </div>
    </Container>
       
        
      
    </div>
  )
}

export default WaitForLearner
