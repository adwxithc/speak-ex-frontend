import { useDispatch, useSelector } from "react-redux"
import { useGetWalletQuery } from "../../../../redux/features/user/user/userApiSlice"
import { IWallet } from "../../../../types/database"
import { RootState } from "../../../../redux/store"
import { useEffect } from "react"
import {  updateCridentials } from "../../../../redux/features/user/user/userSlice"

function useGetWallet() {

  const { userData } = useSelector((state: RootState) => state.user)
  const {data} = useGetWalletQuery({}) 
  const dispatch =useDispatch()
  useEffect(()=>{
    if(!userData?.wallet){
    
      
      if(data?.data)
        dispatch(updateCridentials({wallet:data?.data as IWallet}))
    }
  },[data?.data, dispatch, userData?.wallet])


}

export default useGetWallet
