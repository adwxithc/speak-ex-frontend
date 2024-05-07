import { useEffect, useState } from "react"
import IUser, { IPost } from "../../../types/database"
import { useGetFeedQuery } from "../../../redux/features/user/post/postApiSlice"

export interface IFeedItem extends  IPost{
    user:IUser
}

interface UseGetFeedsProps{
    page:number
}

function useGetFeeds({page}:UseGetFeedsProps) {

    const [feeds, setFeeds] = useState<IFeedItem[]>([])
  
    const [hasMore, setHasMore] = useState(false)

    const { data,isLoading, refetch } = useGetFeedQuery({page})

    useEffect(()=>{
        console.log(data);
        
        setFeeds(prev=>[...prev,...(data?.data?.posts || [])])
        setHasMore(data?.data?.lastPage > page);
    },[data])

    useEffect(()=>{
        
        refetch()
    },[page,refetch])

  return {
    feeds,
    isLoading,
    hasMore
  }
}

export default useGetFeeds
