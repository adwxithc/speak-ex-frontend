import { Dispatch, SetStateAction, useMemo } from "react"
import { useNavigate } from "react-router-dom"
import { Home, Info, LucideIcon, Search, ShoppingCart } from "lucide-react"
import { useDispatch } from "react-redux"
import { setOpenStore } from "../../../../redux/features/user/coinPurchase/coinPurchaseSlice"

export interface INavigationItem{
    name:string,
    action?:()=>void,
    current:boolean,
    isPrivate:boolean
    icon:LucideIcon,
  
}
interface navigationProps{
  setOpenSearch:Dispatch<SetStateAction<boolean>>
  // setOpenStore:Dispatch<SetStateAction<boolean>>
}
  
  function useNavigation({setOpenSearch}:navigationProps) {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const navigation:INavigationItem[]= useMemo(()=>{
        return [
            { name: 'Home',action:()=>navigate('/'),  current: false,isPrivate:true, icon: Home  },
            { name: 'Search',action:()=>setOpenSearch(true), current: false, isPrivate:true, icon:Search  },
            { name: 'Store', current: false, isPrivate:true,action:()=>{dispatch(setOpenStore(true))}, icon:ShoppingCart },
            { name: 'About', current: false, isPrivate:true, icon:Info },
          ]
    },[dispatch, navigate, setOpenSearch])
    return navigation
  }
  
  export default useNavigation
  