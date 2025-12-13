import { Dispatch, SetStateAction, useEffect } from "react";
import PostWraper from "../../../components/layout/PostWraper/PostWraper";
import Avatar from "../../../components/ui/Avatar/Avatar";
import { PostData } from "./CreatePost"
import parse from 'html-react-parser';
import Button from "../../../components/ui/Button/Button";


function PreviewPost({data:{image,title,content},setShowNext}:{data:PostData,setShowNext:Dispatch<SetStateAction<boolean>>}) {

    useEffect(()=>{setShowNext(true)},[setShowNext])

    
  return (
    
        <div className="w-full space-y-4">
            <div className='text-center mb-4'>
                <h3 className="text-lg font-bold text-gray-800 mb-1">Preview Your Post</h3>
                <p className="text-xs text-gray-500">Review how your post will appear to readers</p>
            </div>
            
        <div className="max-w-4xl mx-auto">
            <PostWraper>
                <div className="p-4 border-b border-gray-200 flex w-full items-center bg-white">
                    <Avatar className="h-12 w-12 ring-2 ring-indigo-200 shadow-md" src="https://marketplace.canva.com/EAFHfL_zPBk/1/0/1600w/canva-yellow-inspiration-modern-instagram-profile-picture-kpZhUIzCx_w.jpg" />
                    <div className="ml-3">
                        <h3 className="text-gray-800 font-bold">Adwaith</h3>
                        <p className="text-xs text-gray-500 truncate w-full">adwaithjanardhanan0@gmail.com</p>
                    </div>
                </div>

                <div className="font-bold text-2xl p-4 text-gray-800 bg-white">
                    {title}
                </div>

                <div className="border-b border-indigo-100 w-full flex justify-center bg-white">
                    {image &&
                        <img className="w-full h-full object-cover" src={URL.createObjectURL(image)} alt="Post cover" />
                    }
                </div>

                <div className="p-6 bg-white">
                    <div className="tiptap w-full prose prose-indigo max-w-none">
                        {parse(content)}
                    </div>
                </div>
            </PostWraper>
        </div>

        <div className="flex justify-center pt-4">
            <Button 
                varient={"primary"} 
                size={"lg"}
            >
                Share Post
            </Button>
        </div>
        
        </div>
     

        
   
  )
}

export default PreviewPost
