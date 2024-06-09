
import { useMultistepForm } from "../../../hooks/useMultistepForm";
import UploadImage from "./UploadImage";
import EnterDatas from "./EnterDatas";
import Button from "../../../components/ui/button/Button";
import { Dispatch, FormEvent, SetStateAction, useState } from "react";
import PreviewPost from "./PreviewPost";
import { useCreatePostMutation } from "../../../redux/features/user/post/postApiSlice";
import { IPost } from "../../../types/database";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export type PostData = {
  title:string,
  content:string,
  tags:string,
  image:File|null
}

const INITIAL_DATA: PostData = {
  title:'',
  content:'',
  tags:'',
  image:null
}

interface ICreatePostProps{
  setPosts:Dispatch<SetStateAction<Partial<IPost>[]>>;
  setLoading:Dispatch<SetStateAction<Partial<boolean>>>;
  setModalOpen:Dispatch<SetStateAction<Partial<boolean>>>
}

function CreatePost({setPosts,setLoading,setModalOpen}:ICreatePostProps) {

  const [data, setData] = useState(INITIAL_DATA)
  const [showNext,setShowNext]=useState(false)
  const navigate = useNavigate()
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
  } = useMultistepForm({steps:[<UploadImage setShowNext={setShowNext} {...data} updateFields={updateFields} />,<EnterDatas setShowNext={setShowNext} {...data} updateFields={updateFields} />,<PreviewPost data={data} setShowNext={setShowNext}/>]})

  const [upload]=useCreatePostMutation()

 const handleSubmit= async(e:FormEvent)=>{
    e.preventDefault();
   
    if (!isLastStep) return next()
      if(!data.title || !data.content) return 
      try {

        const formData= new FormData()
        formData.append('image',data.image as Blob)
        formData.append('title',data.title)
        formData.append('content',data.content)
        formData.append('tags',data.tags)

        setLoading(true)
        const res= await upload(formData).unwrap()
       
        const {image,title,id} = res.data as IPost;
        setPosts(prev=>([...prev,{image,title,id}]))
        setLoading(false)
        setModalOpen(false)
       toast('new post created',{
        position:'top-center'
       })
       navigate(`/post/${id}`)

    } catch (error) {
        console.log(error);
        
    }
 }




  return (

    <div className="h-full">
     
      <div className="flex justify-end text-primary ">
        {!isFirstStep && <Button  onClick={()=>{setShowNext(true);prev()}} >Previous</Button>}
        {(showNext && !isLastStep) && <Button type="submit"  onClick={()=>{setShowNext(false);next()}}>Next</Button>}
        
      </div>
 
      <form onSubmit={handleSubmit} className="h-full w-full ">
      {step}
      
      </form>
    
      
      
    </div>

  )

}

export default CreatePost
