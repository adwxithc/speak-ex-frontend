import Avatar from "../../../components/ui/Avatar/Avatar";
import { PostData } from "./CreatePost"
import parse from 'html-react-parser';


function PreviewPost({data}:{data:PostData}) {
    console.log(data);
    
  return (
    <div className="h-full w-full ">
        
        <div className="w-full">
            <div className="bg-secondary w-full rounded-full p-1 flex items-center mb-3">
                <Avatar className="h-10 w-10" src="https://marketplace.canva.com/EAFHfL_zPBk/1/0/1600w/canva-yellow-inspiration-modern-instagram-profile-picture-kpZhUIzCx_w.jpg" />
                <div>
                <span className="text-sm text-gray-600 ml-3">Adwaith</span>
                <p className="text-xs text-gray-400 truncate ml-3" style={{ maxWidth: "calc(100% - 3rem)" }}>adwaithjanardhanan0@gmail.com</p>
                </div>
                
            </div>
            <div>
            {data.image && <img className="w-full" src={URL.createObjectURL(data.image)} alt="" />}
            </div>
            <div className="tiptap">
                { data.description && parse(data.description)}
            </div>
            

            
        </div>
        <div>

        </div>
    </div>
  )
}

export default PreviewPost
