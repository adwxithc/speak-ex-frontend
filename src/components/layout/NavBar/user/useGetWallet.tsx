import { useDispatch, useSelector } from "react-redux"
import { useGetWalletQuery } from "../../../../redux/features/user/user/userApiSlice"
import { IWallet } from "../../../../types/database"
import { RootState } from "../../../../redux/store"
import { useEffect } from "react"
import {  setWallet } from "../../../../redux/features/user/user/userSlice"

function useGetWallet() {

  const { wallet , isAuth } = useSelector((state: RootState) => state.user)
  const {data} = useGetWalletQuery({},{skip:Boolean(wallet || !isAuth )}) 
  const dispatch =useDispatch()
  useEffect(()=>{
      if(data?.data )
        dispatch(setWallet({...data?.data as IWallet}))
    
  },[data?.data, dispatch])


}

export default useGetWallet
