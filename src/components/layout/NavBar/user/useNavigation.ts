import { Dispatch, SetStateAction, useMemo } from "react"
import { useNavigate } from "react-router-dom"

interface INavigationItem{
    name:string,
    action?:()=>void,
    current:boolean,
    isPrivate:boolean
}
interface navigationProps{
  setOpenSearch:Dispatch<SetStateAction<boolean>>
}
  
  function useNavigation({setOpenSearch}:navigationProps) {
    const navigate = useNavigate()

    const navigation:INavigationItem[]= useMemo(()=>{
        return [
            { name: 'Home',action:()=>navigate('/'),  current: false,isPrivate:true },
            { name: 'Search',action:()=>setOpenSearch(true), current: false, isPrivate:true },
            { name: 'Store', current: false, isPrivate:true },
            { name: 'About', current: false, isPrivate:true },
          ]
    },[])
    return navigation
  }
  
  export default useNavigation
  