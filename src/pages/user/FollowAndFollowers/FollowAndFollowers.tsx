import { useNavigate, useParams } from "react-router-dom"

import IUser from "../../../types/database"
import FollowUserItem from "./FollowUserItem"
import { useCallback, useEffect, useRef, useState } from "react"
import { PropagateLoader } from "react-spinners"
import useGetFollows from "./useGetFollows"

export interface IExtendedUser extends IUser{
    usersFocusLanguage:{
        name:string
    }
}

function FollowAndFollowers() {
    const {userName,followType} = useParams()
    const naviagte = useNavigate()
    const [page, setPage] = useState(1)
    
    useEffect(()=>{
        setPage(1);
    },[followType])
   
    const {
    users,
    setUsers,
    isLoading,
    hasMore
    } = useGetFollows({userName:userName||'', followType:followType || '',page})

    const observer = useRef<IntersectionObserver | null>(null)

    const lastUserRef = useCallback((node: HTMLDivElement | null)=>{
        if(isLoading) return
        if (observer.current) observer.current.disconnect()

        observer.current= new IntersectionObserver(entries=>{
  
            if(entries[0].isIntersecting && hasMore){
                setPage(prev=>prev+1)    
            }
        })
        if(node) observer.current.observe(node)
      
        
    },[isLoading,hasMore])


    
if (!userName ||followType !== "followings" && followType !== "followers") {
    return <div className="h-full w-full flex justify-center items-center bg-red-200"><span className="font-bold text-xl text-red-700">OOps..! 404</span></div>;
}
    
  return (
    <div className=" relative  w-full  ">

        <div className="">
            <nav className=" sticky top-0 bg-white pt-8 pb-2">
                <ul className="flex px-5 ">
                    
                    <li onClick={()=>{naviagte(`/profile/${userName}/follow/followers`)}} className=" transition-all  flex-1 flex justify-center hover:bg-gray-100  duration-500 ease-out cursor-pointer rounded">
                        <span className={`px-5 p-3 ${followType=='followers' && 'border-b-4  border-primary'} `}>Followers</span>
                    </li>
                    <li onClick={()=>{naviagte(`/profile/${userName}/follow/followings`)}} className="transition-all  flex-1 flex justify-center hover:bg-gray-100  duration-500 ease-out cursor-pointer rounded">
                        <span className={`px-5 p-3 ${followType=='followings' && 'border-b-4  border-primary'} `}>Following</span>
                    </li>
                   
                    
                </ul>

            </nav>
            <main className="lg:px-24">
                <ul className="w-full p-2 mt-5  ">
                    {
                        
                        users.length>0?
                            users.map((user:IExtendedUser,index:number)=><div key={user.id} ref={index==users.length-1?lastUserRef:null}><FollowUserItem {...{user,setUsers}}/></div>)
                            :<div  className="h-full w-full "><span >OOps you have no {followType} yet... </span></div>
                        
                    }
                    {
                        isLoading && <div className="flex justify-center"><PropagateLoader color="gray" /></div>
                    }
                    

                    
                </ul>
            </main>

        </div>
      
    </div>
  )
}

export default FollowAndFollowers
