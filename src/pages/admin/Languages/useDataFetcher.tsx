import { useEffect, useState } from 'react'
import {debounce} from 'lodash'

import { useGetLanguagesMutation } from '../../../redux/features/admin/languages/languagesApiSlice'
import { ILanguage } from '../../../types/database';

function useDataFetcher() {


    const [totalPages,setTotalPages] = useState(0);
    const [loading, setLoading] = useState(true)
    const [languages,setLanguages] = useState<ILanguage[]>([])
    const [currentPage, setCurrentPage] = useState(0);
    const [key,setKey] = useState('')
    const [getLanguagesList] = useGetLanguagesMutation()

   
    

    useEffect(()=>{
        const fetchData=debounce(async()=>{
                   const res = await getLanguagesList({ page: currentPage + 1,key}).unwrap()

                   const { languages, totalLanguages } = res.data
                
                   setLanguages(()=>[...languages])
                   setTotalPages(Math.ceil(totalLanguages/5))
                   setLoading(false)
        },500)
        fetchData();
    },[currentPage, getLanguagesList, key])

  return {
    loading,
    languages,
    totalPages,
    currentPage,
    setCurrentPage,
    setLanguages,
    key,
    setKey
  }
}

export default useDataFetcher
