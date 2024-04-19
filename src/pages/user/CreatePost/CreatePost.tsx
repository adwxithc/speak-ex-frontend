
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
  } = useMultistepForm({steps:[<UploadImage {...data} updateFields={updateFields} />,<EnterDatas {...data} updateFields={updateFields} />,<PreviewPost data={data}/>]})

 const handleSubmit=(e:FormEvent)=>{
    e.preventDefault;
    if (!isLastStep) return next()
      alert('form submited')
 }

 

  return (

    <div className="h-[90vh]">
     
      <div className="flex justify-end text-primary ">
       
        {!isFirstStep && <Button size={"md"} onClick={()=>prev()} >previous</Button>}
        <Button type="submit" size={"md"} onClick={()=>next()}>{isLastStep?'share':'next'}</Button>
      </div>
      <form onSubmit={handleSubmit} className="h-full w-full ">
      {step}
      </form>
      
    </div>

  )

}

export default CreatePost
