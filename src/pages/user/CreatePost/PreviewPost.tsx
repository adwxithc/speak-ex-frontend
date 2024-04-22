import { Dispatch, SetStateAction, useEffect } from "react";
import PostWraper from "../../../components/layout/PostWraper/PostWraper";
import Avatar from "../../../components/ui/Avatar/Avatar";
import { PostData } from "./CreatePost"
import parse from 'html-react-parser';
import Button from "../../../components/ui/Button/Button";


function PreviewPost({data:{image,title,content},setShowNext}:{data:PostData,setShowNext:Dispatch<SetStateAction<boolean>>}) {

    useEffect(()=>{setShowNext(true)},[])

    
  return (
    
        <div className="h-full w-full">
            
        <PostWraper>
            <div className="p-1.5 border-b flex w-full">
            <Avatar className="h-10 w-10" src="https://marketplace.canva.com/EAFHfL_zPBk/1/0/1600w/canva-yellow-inspiration-modern-instagram-profile-picture-kpZhUIzCx_w.jpg" />
            <div className="ml-2">
            <h3 className="text-gray-800 font-semibold">Adwaith</h3>
            <p className="text-sm text-gray-400 truncate w-full">adwaithjanardhanan0@gmail.com </p>
            </div>
            
            </div>

            <div className="font-semibold p-2">
                {title}
            
            </div>

            <div className=" border-b w-full flex justify-center">
                {image &&
                  
                    <img className="w-full h-full" src={URL.createObjectURL(image)} alt="" />
                }
                
            </div>

            <div className="p-3">
            <div className="tiptap w-full">
                {parse(content)}
            </div>
            </div>

        </PostWraper>

        <div className="flex justify-end mr-3"> <Button varient={"primary"} size={"lg"} >Share</Button> </div>
        
        </div>
     

        
   
  )
}

export default PreviewPost
