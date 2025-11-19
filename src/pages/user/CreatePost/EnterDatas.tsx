import { Dispatch, SetStateAction, useEffect } from 'react'
import { Input } from '../../../components/ui/Input/Input';
import Tiptap from '../../../components/custom/Tiptap/Tiptap';
import { PostData } from './CreatePost';
import TagInput from '../../../components/custom/TagInput/TagInput';
import Image from '../../../components/ui/Image/Image';

interface IEnterDatas {
  updateFields: (fields: Partial<PostData>) => void;
  title: string;
  content: string;
  image: File | null
  setShowNext: Dispatch<SetStateAction<boolean>>
}

function EnterDatas({ title, content, image, updateFields, setShowNext }: IEnterDatas) {


  useEffect(() => {
    if (title.length > 0 && content.length > 0) setShowNext(true)
    else setShowNext(false)

  }, [setShowNext, content, title])


  const handleEditorContentSave = (html: string) => {

    updateFields({ content: html })

  }

  return (
    <div className=" w-[80vw] sm:w-[90vw] px-3 flex md:flex-row flex-col  ">
  

      <div className='md:w-2/3 order-2 md:order-1'>
        <div>
          <label className='font-semibold text-neutral-800' htmlFor="title">Title</label>
          <Input id='title' className='border-neutral-200' onChange={(e) => updateFields({ title: e.target.value })} value={title} />
        </div>
        <div>
          <label className='font-semibold text-neutral-800' htmlFor="tags">Add tags</label>
          <TagInput  updateFields={updateFields} />
        </div>

        <div className='mt-5'>
          <label htmlFor="description" className='font-semibold text-neutral-800'>
            Description
          </label>
          <Tiptap content={content} onEditerContentSave={handleEditorContentSave} />
        </div>

      </div>
      {
        image &&
        <div className='md:w-1/3 p-4 w-full order-1 '>
          <div className=' flex justify-center max-h-96 p-3   border border-neutral-200  rounded-2xl bg-white'>
            <Image height={500} width={500}  className='object-contain ' src={URL.createObjectURL(image)} alt="" />
          </div>
        </div>

      }


    </div>
  )
}

export default EnterDatas
