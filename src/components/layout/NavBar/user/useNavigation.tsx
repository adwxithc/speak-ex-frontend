import { Dispatch, SetStateAction, useMemo } from "react"
import { useNavigate } from "react-router-dom"
import { Home, Info, LucideIcon, Search } from "lucide-react"

export interface INavigationItem{
    name:string,
    action?:()=>void,
    current:boolean,
    isPrivate:boolean
    icon:LucideIcon
}
interface navigationProps{
  setOpenSearch:Dispatch<SetStateAction<boolean>>
}
  
  function useNavigation({setOpenSearch}:navigationProps) {
    const navigate = useNavigate()

    const navigation:INavigationItem[]= useMemo(()=>{
        return [
            { name: 'Home',action:()=>navigate('/'),  current: false,isPrivate:true, icon: Home  },
            { name: 'Search',action:()=>setOpenSearch(true), current: false, isPrivate:true, icon:Search  },
            // { name: 'Store', current: false, isPrivate:true },
            { name: 'About', current: false, isPrivate:true, icon:Info },
          ]
    },[navigate, setOpenSearch])
    return navigation
  }
  
  export default useNavigation
  