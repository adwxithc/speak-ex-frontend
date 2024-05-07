import { useEffect, useState } from 'react'
import { IExtendedUser } from './FollowAndFollowers'
import { useGetFollowersOrFollowingsQuery } from '../../../redux/features/user/user/userApiSlice'

interface IUseGetFollowsProps{
    userName:string,
    followType:string,
    page:number
}
function useGetFollows({userName, followType,page}:IUseGetFollowsProps) {
    const [users, setUsers] = useState<IExtendedUser[]>([])
  
    const [hasMore, setHasMore] = useState(false)
    const{data,isLoading, refetch} = useGetFollowersOrFollowingsQuery({userName, followType,page})
    useEffect(()=>{
        setUsers([])
    },[followType])

    useEffect(()=>{
        setUsers(prev=>{
            if(page==1) return [...data?.data?.users ||[]]
            return [...prev,...data?.data?.users||[]]
        })
        setHasMore(data?.data?.lastPage>page)
    },[data,page])

    useEffect(()=>{
        refetch()
    },[followType,refetch,page])

  return {
    users,
    setUsers,
    isLoading,
    hasMore
  }
}

export default useGetFollows
