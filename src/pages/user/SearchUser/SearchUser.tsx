import { ChangeEvent, useState, useRef, useCallback, Dispatch, SetStateAction } from "react"
import Avatar from "../../../components/ui/Avatar/Avatar"
import { DotLoader } from 'react-spinners';
import useUserSearch from "./useUserSearch"
import { Input } from "../../../components/ui/Input/Input"
import { useNavigate } from "react-router-dom";

function SearchUser({setOpenSearch}:{setOpenSearch:Dispatch<SetStateAction<boolean>>}) {
    const navigate = useNavigate()
    const [input, setInput] = useState('')
    
    const [page, setPage]=useState(1)
    const {loading,users, hasMore} = useUserSearch(input,page)

    const observer = useRef<IntersectionObserver | null>(null)

    const lastUserRef = useCallback((node: HTMLLIElement | null)=>{
        if(loading) return
        if (observer.current) observer.current.disconnect()

        observer.current= new IntersectionObserver(entries=>{
            if(entries[0].isIntersecting && hasMore){
                setPage(prev=>prev+1)
                
            }
        })
        if(node) observer.current.observe(node)
      
        
    },[loading,hasMore])

    const handleSearch=(e:ChangeEvent<HTMLInputElement>)=>{
        setInput(e.target.value)
        setPage(1)
    }
    const handleClick=(userName:string)=>{
        navigate(`/profile/${userName}`)
        setOpenSearch(false)
    }
  return (
    <div className="w-[80vw] sm:w-[50vw] h-full py-2">
        <h2 className="font-semibold mt-4 text-lg text-primary">Search User</h2>
        <div className="py-5">
            <Input value={input} className="" placeholder="Search User" onChange={handleSearch} />
        </div>
        <div className="border rounded p-3 min-h-52 max-h-[50vh] overflow-y-auto pretty-scrollbar">
            <ul className="">
            {
            users.map((user, index)=>{
            
                    return(
                        <li ref={ users.length==index+1 ?lastUserRef:null} className="cursor-pointer  p-3 my-3  border rounded-md hover:bg-yellow-50" onClick={()=>handleClick(user.userName)}>
                        <div className="flex items-center  gap-5">
                            <div>
                            <Avatar className="h-11 w-11" src={user.profile || 'http://localhost:3000/Images/profilePlaceholder/profilePlaceholder.jpg'} key={user.userName} />
                    
                            </div>
                            <div>
                            <p>{user.userName}</p>
                            </div>
                        </div>
                    
                    </li>
                )
                })
            }
            {loading && 
            <div className="flex justify-center">
                <DotLoader color="gray" />
            </div>
            }
            </ul>
      
        </div>
        
      
    </div>
  )
}

export default SearchUser
