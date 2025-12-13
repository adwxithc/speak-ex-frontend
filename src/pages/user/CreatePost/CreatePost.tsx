
import { useMultistepForm } from "../../../hooks/useMultistepForm";
import UploadImage from "./UploadImage";
import EnterDatas from "./EnterDatas";
import Button from "../../../components/ui/Button/Button";
import { Dispatch, FormEvent, SetStateAction, useState } from "react";
import PreviewPost from "./PreviewPost";
import { useCreatePostMutation } from "../../../redux/features/user/post/postApiSlice";
import { IPost } from "../../../types/database";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { MoveLeft, MoveRight } from "lucide-react";

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




  const stepTitles = ['Upload Image', 'Write Content', 'Preview & Share'];
  
  let currentStep = 1;
  if (isFirstStep) {
    currentStep = 0;
  } else if (isLastStep) {
    currentStep = 2;
  }

  return (

    <div className="h-full flex flex-col bg-white">
     
      {/* Header with Progress */}
      <div className="px-6 py-5 border-b border-gray-200">
        <h2 className="font-bold text-2xl text-gray-800 mb-4 text-center"> 
          Create A Blog Post
        </h2>
        
        {/* Progress Steps */}
        <div className="flex items-center justify-center w-full">
          <div className="flex items-center justify-between w-full max-w-2xl">
            {stepTitles.map((title, index) => (
              <div key={title} className="flex items-center" style={{ flex: index < stepTitles.length - 1 ? '1' : '0 0 auto' }}>
                <div className="flex flex-col items-center min-w-[60px] sm:min-w-[80px]">
                  <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 ${
                    index <= currentStep 
                      ? 'bg-gradient-to-br from-indigo-500 to-purple-500 text-white shadow-md' 
                      : 'bg-gray-100 text-gray-400 border-2 border-gray-200'
                  }`}>
                    {index + 1}
                  </div>
                  <span className={`text-xs mt-2 font-medium transition-colors text-center ${
                    index <= currentStep ? 'text-indigo-600' : 'text-gray-400'
                  }`}>
                    {title}
                  </span>
                </div>
                {index < stepTitles.length - 1 && (
                  <div className={`flex-1 h-1 mx-3 rounded-full transition-all duration-300 min-w-[20px] ${
                    index < currentStep ? 'bg-gradient-to-r from-indigo-500 to-purple-500' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Content Area */}
      <form onSubmit={handleSubmit} className="flex-1 overflow-auto bg-gray-50">
        <div className="p-6">
          {step}
        </div>
      </form>

      {/* Navigation Footer */}
      <div className="flex justify-between items-center px-6 py-4 bg-white border-t border-gray-200">
        {isFirstStep ? (
          <div />
        ) : (
          <Button 
            varient={'secondary-square'} 
            size={'sm'} 
            className="hover:bg-gray-100 text-gray-700 transition-all" 
            onClick={()=>{setShowNext(true);prev()}}
          > 
            <MoveLeft size={18} className="mr-1" /> Previous
          </Button>
        )}
        
        {(showNext && !isLastStep) && (
          <Button 
            varient={'primary-square'} 
            size={'sm'} 
            className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white transition-all ml-auto" 
            type="submit" 
            onClick={()=>{setShowNext(false);next()}}
          >
            Next <MoveRight className="ml-1" size={18} />
          </Button>
        )}
      </div>
    
      
      
    </div>

  )

}

export default CreatePost
