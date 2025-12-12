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
    <div className="w-full flex md:flex-row flex-col gap-6">
  
      <div className='md:w-2/3 order-2 md:order-1 space-y-4'>
        <div>
          <label className='font-bold text-gray-800 text-sm' htmlFor="title">
            Post Title
          </label>
          <Input 
            id='title' 
            placeholder='Enter an engaging title...'
            className='mt-1 border-indigo-200 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-200 bg-white' 
            onChange={(e) => updateFields({ title: e.target.value })} 
            value={title} 
          />
        </div>
        
        <div>
          <label className='font-bold text-gray-800 text-sm' htmlFor="tags">
            Tags
          </label>
          <div className="mt-1">
            <TagInput updateFields={updateFields} />
          </div>
        </div>

        <div>
          <label htmlFor="description" className='font-bold text-gray-800 text-sm'>
            Content
          </label>
          <div className='mt-1'>
            <Tiptap content={content} onEditerContentSave={handleEditorContentSave} />
          </div>
        </div>
      </div>
      
      {
        image &&
        <div className='md:w-1/3 w-full order-1 md:order-2'>
          <div className='sticky top-4 bg-white rounded-xl p-3 border border-indigo-200 shadow-sm'>
            <h4 className='font-bold text-gray-800 text-sm mb-2'>
              Cover Image
            </h4>
            <div className='flex justify-center rounded-lg overflow-hidden'>
              <Image height={500} width={500} className='object-contain' src={URL.createObjectURL(image)} alt="Cover" />
            </div>
          </div>
        </div>
      }
    </div>
  )
}

export default EnterDatas
