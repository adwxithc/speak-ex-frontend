
import { ChangeEvent, useCallback, useRef, useState } from 'react'
import { Input } from '../../ui/Input/Input'
import { ITag } from '../../../types/database'
import { PostData } from '../../../pages/user/CreatePost/CreatePost';
import useGetTags from './useGetTags';
import { PropagateLoader } from 'react-spinners';

interface ITagInput{
    updateFields: (fields: Partial<PostData>) => void;
}

function TagInput({updateFields}:ITagInput) {
    const[page, setPage] = useState(1)
    const [showSuggesion, serShowSuggesion] = useState(false)
    const [key, setKey] = useState('')
    
    const [text, setText] = useState('')
    const {isLoading,tags,setTags,hasMore}=useGetTags({key,page})

    const observer = useRef<IntersectionObserver | null>(null)

    const lastUserRef = useCallback((node: HTMLLIElement | null)=>{
        if(isLoading) return
        if (observer.current) observer.current.disconnect()

        observer.current= new IntersectionObserver(entries=>{
  
            if(entries[0].isIntersecting && hasMore){
                setPage(prev=>prev+1)    
            }
        })
        if(node) observer.current.observe(node)
      
        
    },[isLoading,hasMore])
    

    const handleChange = (e:ChangeEvent<HTMLInputElement>)=>{
        const {value}=  e.target;
        const totalTags = value.split('#')
        const newTag= totalTags[totalTags.length-1]
        
        
        setText(e.target.value)
        updateFields({tags:e.target.value})
        if(!newTag) return 
        setKey(newTag)
    }

    

    const handleSelectedTag=(selectedTag:string)=>{
        setText(prev=>{
            const allTags =prev.split('#').filter((item,index, arr)=>arr.length-1==index?true:Boolean(item))
            
            allTags[allTags.length-1]=selectedTag
            return allTags.map(item=>'#'+item).join('')
        })
        setTags(prev=>[...prev.filter(item=>item.name!==selectedTag)])
    }



    
  return (
    <div className=''>
        <Input value={text} className='text-blue-600 font-semibold' onChange={handleChange} onFocus={()=>serShowSuggesion(true)} />
        <div className={` ${showSuggesion?'h-full':'h-0'} overflow-hidden transition-all duration-1000`}>
            <div className={`max-h-52 h-full transition-all   mt-1 p-3 border rounded overflow-y-auto pretty-scrollbar`}>
                {
                    <ul>
                        {
                            tags?.map((item:ITag,index:number)=>(
                                <li ref={index==tags.length-1?lastUserRef:null} key={item.id} className='w-full bg-blue-50 mb-1 p-3 rounded cursor-pointer ' onClick={()=>handleSelectedTag(item.name)}>
                                    <div className='text-blue-600 font-semibold'>
                                        #{item.name}
                                    </div>
                                </li>
                            ))
                           
                           
                           
                        }
                        {
                             isLoading && <div className="flex justify-center"><PropagateLoader color="gray" /></div>
                        }
                    </ul>
                }

            </div>
        </div>
       
      
    </div>
  )
}

export default TagInput
