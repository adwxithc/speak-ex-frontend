import { useEffect, useState } from "react"
import { ITag } from "../../../types/database"
import { useGetTagsQuery } from "../../../redux/features/user/post/postApiSlice"

interface IUseGetTags{
    
    key:string,

}

function useGetTags({key}:IUseGetTags) {
    const [tags, setTags] = useState<ITag[]>([])
    const [hasMore, setHasMore] = useState(false)
    const[page, setPage] = useState(1)
    const {data:tagData, isLoading,refetch} = useGetTagsQuery({page,key})
    useEffect(()=>{
        setTags(tagData?.data?.tags ||[])
        setHasMore(tagData?.data?.lastPage>page)
    },[page, tagData])

    useEffect(()=>{
        refetch()
    },[key,refetch])
  return {
    tags,
    isLoading,
    setTags,
    hasMore,
    setPage
  }
}

export default useGetTags
