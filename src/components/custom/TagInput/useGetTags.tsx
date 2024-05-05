import { useEffect, useState } from "react"
import { ITag } from "../../../types/database"
import { useGetTagsQuery } from "../../../redux/features/user/post/postApiSlice"

interface IUseGetTags{
    page:number,
    key:string,

}

function useGetTags({page,key}:IUseGetTags) {
    const [tags, setTags] = useState<ITag[]>([])
    const [hasMore, setHasMore] = useState(false)
    const {data:tagData, isLoading,refetch} = useGetTagsQuery({page,key})
    useEffect(()=>{
        setTags(tagData?.data?.tags ||[])
        setHasMore(tagData?.data?.lastPage>page)
    },[tagData])

    useEffect(()=>{
        refetch()
    },[key,refetch])
  return {
    tags,
    isLoading,
    setTags,
    hasMore
  }
}

export default useGetTags
