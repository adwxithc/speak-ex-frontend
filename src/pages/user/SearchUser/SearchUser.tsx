import { ChangeEvent, useState, useRef, useCallback, Dispatch, SetStateAction, useEffect } from "react"
import Avatar from "../../../components/ui/Avatar/Avatar"
import { DotLoader } from 'react-spinners';
import useUserSearch from "./useUserSearch"
import { Input } from "../../../components/ui/Input/Input"
import { useNavigate } from "react-router-dom";
import { Search, Users } from "lucide-react";

function SearchUser({setOpenSearch}:{setOpenSearch:Dispatch<SetStateAction<boolean>>}) {
    const navigate = useNavigate()
    const [input, setInput] = useState('')
    const [debouncedInput, setDebouncedInput] = useState('')
    
    const [page, setPage]=useState(1)
    const {loading,users, hasMore} = useUserSearch(debouncedInput,page)

    const observer = useRef<IntersectionObserver | null>(null)

    // Debounce effect
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedInput(input)
            setPage(1)
        }, 500)

        return () => {
            clearTimeout(timer)
        }
    }, [input])

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
    }
    const handleClick=(userName:string)=>{
        navigate(`/profile/${userName}`)
        setOpenSearch(false)
    }
  return (
    <div className="w-[85vw] sm:w-[60vw] md:w-[50vw] lg:w-[40vw] max-w-2xl h-full py-3">
        <div className="mb-6">
            <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-primary/10 rounded-lg">
                    <Search className="text-primary" size={24} />
                </div>
                <h2 className="font-bold text-2xl text-gray-900">Find Users</h2>
            </div>
            <p className="text-sm text-gray-600 ml-14">Search and connect with language learners</p>
        </div>
        
        <div className="mb-5">
            <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <Input 
                    value={input} 
                    className="pl-12 py-3 text-base shadow-sm focus:shadow-md transition-shadow" 
                    placeholder="Search by username..." 
                    onChange={handleSearch} 
                />
            </div>
        </div>
        
        <div className="border-2 border-gray-200 rounded-xl overflow-hidden shadow-md bg-white">
            {users.length === 0 && !loading && debouncedInput ? (
                <div className="flex flex-col items-center justify-center py-12 px-4">
                    <div className="bg-gray-100 rounded-full p-6 mb-4">
                        <Users className="text-gray-400" size={48} />
                    </div>
                    <p className="text-gray-500 font-medium text-center">
                        No users found
                    </p>
                    <p className="text-gray-400 text-sm mt-1 text-center">
                        Try a different search term
                    </p>
                </div>
            ) : users.length === 0 && !loading && !debouncedInput ? (
                <div className="flex flex-col items-center justify-center py-12 px-4">
                    <div className="bg-gradient-to-br from-primary/10 to-blue-100 rounded-full p-6 mb-4">
                        <Search className="text-primary" size={48} />
                    </div>
                    <p className="text-gray-700 font-semibold text-center text-lg">
                        Start typing to search users
                    </p>
                    <p className="text-gray-500 text-sm mt-2 text-center max-w-xs">
                        Find language learning partners and connect with them
                    </p>
                </div>
            ) : users.length === 0 && loading ? (
                <div className="flex flex-col items-center justify-center py-16 px-4">
                    <DotLoader color="#00255F" size={50} />
                    <p className="text-gray-600 font-medium mt-4 animate-pulse">Searching users...</p>
                </div>
            ) : (
                <ul className="max-h-[55vh] overflow-y-auto pretty-scrollbar divide-y divide-gray-100">
                    {users.map((user, index) => {
                        return (
                            <li 
                                ref={users.length === index + 1 ? lastUserRef : null} 
                                className="cursor-pointer p-4 hover:bg-gradient-to-r hover:from-blue-50 hover:to-transparent transition-all duration-200 group"
                                onClick={() => handleClick(user.userName)}
                                key={user.userName}
                            >
                                <div className="flex items-center gap-4">
                                    <div className="relative">
                                        <Avatar 
                                            className="h-12 w-12 ring-2 ring-gray-200 group-hover:ring-primary/30 transition-all duration-200 shadow-sm" 
                                            src={user.profile || 'http://localhost:3000/Images/profilePlaceholder/profilePlaceholder.jpg'} 
                                        />
                                        <div className="absolute -bottom-1 -right-1 h-4 w-4 bg-green-500 rounded-full border-2 border-white shadow-sm"></div>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="font-semibold text-gray-900 group-hover:text-primary transition-colors truncate">
                                            {user.userName}
                                        </p>
                                        <p className="text-sm text-gray-500">Click to view profile</p>
                                    </div>
                                    <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                                        <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </div>
                                </div>
                            </li>
                        )
                    })}
                    {loading && users.length > 0 && (
                        <li className="flex flex-col items-center py-4 bg-gray-50">
                            <DotLoader color="#00255F" size={35} />
                            <p className="text-gray-500 text-xs mt-2">Loading more...</p>
                        </li>
                    )}
                </ul>
            )}
        </div>
    </div>
  )
}

export default SearchUser
