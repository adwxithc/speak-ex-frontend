import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { Input } from '../../../components/ui/Input/Input';
import Tiptap from '../../../components/custom/Tiptap/Tiptap';
import { PostData } from './CreatePost';

interface IEnterDatas {
  updateFields: (fields: Partial<PostData>) => void;
  title: string;
  description: string;
  setShowNext: Dispatch<SetStateAction<boolean>>
}

function EnterDatas({ title, description, updateFields, setShowNext }: IEnterDatas) {
  

  useEffect(()=>{
    if(title.length>0 && description.length>0) setShowNext(true)
    else setShowNext(false)

  },[setShowNext,description,title])

  const [html, setHtml] = useState('')
  const handleEditorContentSave = (html: string) => {

    updateFields({ description: html })
    setHtml(description);

  }

  return (
    <div className=" w-[80vw] sm:w-[90vw] px-3">


      <div>
        <div>
          <label htmlFor="title">title</label>
          <Input id='title' onChange={(e) => updateFields({ title: e.target.value })} value={title} />
        </div>

        <div className='mt-5'>
          <label htmlFor="description">
            description
          </label>
          <Tiptap content={description} onEditerContentSave={handleEditorContentSave} />
        </div>

      </div>

    </div>
  )
}

export default EnterDatas
