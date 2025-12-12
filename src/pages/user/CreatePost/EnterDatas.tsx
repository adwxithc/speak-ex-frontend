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

  const titleCharCount = title.length;
  const maxTitleLength = 100;
  // Strip HTML tags for count
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = content;
  const contentCharCount = (tempDiv.textContent || tempDiv.innerText || '').length;

  return (
    <div className="w-full flex md:flex-row flex-col gap-8">
  
      <div className='md:w-2/3 order-2 md:order-1 space-y-6'>
        {/* Title Section */}
        <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-2">
            <label className='font-bold text-gray-800 text-base flex items-center gap-2' htmlFor="title">
              <span className="text-primary">
                ✦
              </span>
              <span>Post Title</span>
              <span className="text-red-500">*</span>
            </label>
            <span className={`text-xs font-medium ${titleCharCount > maxTitleLength ? 'text-red-500' : 'text-gray-400'}`}>
              {titleCharCount}/{maxTitleLength}
            </span>
          </div>
          <Input 
            id='title' 
            placeholder='Write a compelling title that captures attention...'
            className='border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 bg-gray-50 text-base' 
            onChange={(e) => updateFields({ title: e.target.value })} 
            value={title}
            maxLength={maxTitleLength}
          />
          {title.length === 0 && (
            <p className="text-xs text-gray-500 mt-2 flex items-start gap-1">
              <span className="text-primary mt-0.5">
                💡
              </span>
              <span>Tip: A good title is clear, specific, and intriguing</span>
            </p>
          )}
        </div>
        
        {/* Tags Section */}
        <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
          <div className="mb-2">
            <label className='font-bold text-gray-800 text-base flex items-center gap-2' htmlFor="tags">
              <span className="text-primary">
                ✦
              </span>
              <span>Tags</span>
            </label>
            <p className="text-xs text-gray-500 mt-1">
              Add relevant tags to help readers discover your post
            </p>
          </div>
          <div className="mt-3">
            <TagInput updateFields={updateFields} />
          </div>
        </div>

        {/* Content Section */}
        <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-2">
            <label htmlFor="description" className='font-bold text-gray-800 text-base flex items-center gap-2'>
              <span className="text-primary">
                ✦
              </span>
              <span>Content</span>
              <span className="text-red-500">*</span>
            </label>
            <span className="text-xs font-medium text-gray-400">
              {contentCharCount} characters
            </span>
          </div>
          <p className="text-xs text-gray-500 mb-3">
            Share your thoughts, insights, and knowledge with rich formatting
          </p>
          <div className='rounded-lg overflow-hidden border border-gray-300'>
            <Tiptap content={content} onEditerContentSave={handleEditorContentSave} />
          </div>
        </div>
      </div>
      
      {/* Cover Image Preview */}
      {
        image &&
        <div className='md:w-1/3 w-full order-1 md:order-2'>
          <div className='sticky top-4 bg-white rounded-xl p-4 border border-gray-200 shadow-md hover:shadow-lg transition-shadow'>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-primary text-lg">
                🖼️
              </span>
              <h4 className='font-bold text-gray-800 text-base'>
                Cover Image
              </h4>
            </div>
            <div className='relative group'>
              <div className='flex justify-center rounded-xl overflow-hidden bg-gray-50 border border-gray-200'>
                <Image height={500} width={500} className='object-contain' src={URL.createObjectURL(image)} alt="Cover" />
              </div>
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors rounded-xl pointer-events-none" />
            </div>
            <p className="text-xs text-gray-500 mt-3 text-center">
              This image will be displayed as your post's cover
            </p>
          </div>
        </div>
      }
    </div>
  )
}

export default EnterDatas
