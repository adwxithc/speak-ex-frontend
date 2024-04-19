import { useState } from 'react'
import { Input } from '../../../components/ui/Input/Input';
import Tiptap from '../../../components/custom/Tiptap/Tiptap';
import { PostData } from './CreatePost';

interface IEnterDatas{
    updateFields: (fields: Partial<PostData>) => void;
    title:string;
    description:string;
}

function EnterDatas({title,description,updateFields}:IEnterDatas) {
  
    const [html, setHtml] = useState('')
    const handleEditorContentSave=(html:string)=>{

        updateFields({description:html})
        setHtml(description);
      
    }

  return (
    <div className=" w-[90vw] px-3">

     
        <div>
            <div>
            <label htmlFor="title">title</label>
        <Input id='title'  onChange={(e)=>updateFields({title:e.target.value})} value={title} />
            </div>
    
        <div className='mt-5'>
        <label htmlFor="description">
        description
        </label>
        <Tiptap onEditerContentSave={handleEditorContentSave}  />
        </div>

        </div>
   
       
      {html}
      
    </div>
  )
}

export default EnterDatas
