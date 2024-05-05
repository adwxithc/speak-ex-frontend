import { Dispatch, SetStateAction, useEffect } from 'react'
import { Input } from '../../../components/ui/Input/Input';
import Tiptap from '../../../components/custom/Tiptap/Tiptap';
import { PostData } from './CreatePost';
import TagInput from '../../../components/custom/TagInput/TagInput';

interface IEnterDatas {
  updateFields: (fields: Partial<PostData>) => void;
  title: string;
  content: string;
  setShowNext: Dispatch<SetStateAction<boolean>>
}

function EnterDatas({ title, content, updateFields, setShowNext }: IEnterDatas) {
  

  useEffect(()=>{
    if(title.length>0 && content.length>0) setShowNext(true)
    else setShowNext(false)

  },[setShowNext,content,title])


  const handleEditorContentSave = (html: string) => {

    updateFields({ content: html })

  }

  return (
    <div className=" w-[80vw] sm:w-[90vw] px-3">


      <div>
        <div>
          <label htmlFor="title">title</label>
          <Input id='title' onChange={(e) => updateFields({ title: e.target.value })} value={title} />
        </div>
        <div>
          <label htmlFor="tags">Add tags</label>
          <TagInput updateFields={updateFields} />
        </div>

        <div className='mt-5'>
          <label htmlFor="description">
            description
          </label>
          <Tiptap content={content} onEditerContentSave={handleEditorContentSave} />
        </div>

      </div>

    </div>
  )
}

export default EnterDatas
