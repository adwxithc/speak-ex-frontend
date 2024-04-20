
import { useMultistepForm } from "../../../hooks/useMultistepForm";
import UploadImage from "./UploadImage";
import EnterDatas from "./EnterDatas";
import Button from "../../../components/ui/Button/Button";
import { FormEvent, useState } from "react";
import PreviewPost from "./PreviewPost";


export type PostData = {
  title:string,
  description:string,
  image:File|null
}

const INITIAL_DATA: PostData = {
  title:'',
  description:'',
  image:null
}

function CreatePost() {

  const [data, setData] = useState(INITIAL_DATA)
  const [showNext,setShowNext]=useState(false)
  const updateFields = (fields: Partial<PostData>)=> {
    setData(prev => {
      return { ...prev, ...fields }
    })
  }

  const {
    step,
    isFirstStep,
    isLastStep,
    
    next,
    prev,
  } = useMultistepForm({steps:[<UploadImage setShowNext={setShowNext} {...data} updateFields={updateFields} />,<EnterDatas setShowNext={setShowNext} {...data} updateFields={updateFields} />,<PreviewPost data={data}/>]})

 const handleSubmit=(e:FormEvent)=>{
    e.preventDefault;
    if (!isLastStep) return next()
      alert('form submited')
 }

 

  return (

    <div className="h-full ">
     
      <div className="flex justify-end text-primary ">
       
        {!isFirstStep && <Button  onClick={()=>{setShowNext(true);prev()}} >Previous</Button>}
        {showNext && <Button type="submit"  onClick={()=>{setShowNext(false);next()}}>{isLastStep?'Share':'Next'}</Button>}
        
      </div>
      <form onSubmit={handleSubmit} className="h-full w-full ">
      {step}
      
      </form>
      
    </div>

  )

}

export default CreatePost
