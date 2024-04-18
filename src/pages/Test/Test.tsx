
import { useState } from "react";
import ShowContent from "../../components/custom/Tiptap/ShowContent";
import Tiptap from "../../components/custom/Tiptap/Tiptap";



function Test() {

  const [html, setHtml] = useState('')
  const handleEditorContentSave=(html:string)=>{
    setHtml(html);
    
  }

  return (
    <div className="">
      <div className="p-5">
      <Tiptap onEditerContentSave={handleEditorContentSave} />
      <hr />
      <ShowContent html={html} />
      </div>
      
    </div>

  )
}

export default Test
