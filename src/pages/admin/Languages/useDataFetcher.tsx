import { useEffect, useState } from 'react'
import { useGetLanguagesMutation } from '../../../redux/features/admin/languages/languagesApiSlice'
import { ILanguage } from '../../../types/database';

function useDataFetcher() {


    const [totalPages,setTotalPages] = useState(0);
    const [loading, setLoading] = useState(true)
    const [languages,setLanguages] = useState<ILanguage[]>([])
    const [currentPage, setCurrentPage] = useState(0);

    const [getLanguagesList] = useGetLanguagesMutation()

    useEffect(()=>{
        const fetchData=async()=>{
                   const res = await getLanguagesList({ page: currentPage + 1}).unwrap()

                   const { languages, totalLanguages } = res.data
                
                   setLanguages(()=>[...languages])
                   setTotalPages(Math.ceil(totalLanguages/5))
                   setLoading(false)
        }
        fetchData();
    },[currentPage,getLanguagesList])

  return {
    loading,
    languages,
    totalPages,
    currentPage,
    setCurrentPage,
    setLanguages
  }
}

export default useDataFetcher
