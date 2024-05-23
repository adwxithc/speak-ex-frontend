import { useSelector } from "react-redux"
import { RootState } from "../../../redux/store"




function CoinsList() {
  const { userData } = useSelector((state: RootState) => state.user)
  return (
    <div className='flex px-1  drop-shadow mt-1 pt-2  text-sm text-gray-700 cursor-pointer '>
    <div className='flex px-4 py-2 flex-1 items-center  bg-[#ffff1a27]  rounded-md'>
      <img className='h-auto w-4 ' src="src/assets/Images/menuIcon/gold.png" alt="gold coin" />
      
      <span className='ml-1'>{userData?.wallet?.goldCoins||0}</span>
    </div>
    <div className='flex px-4 py-2  flex-1 items-center bg-[#c6c6c62e] ml-1  rounded-md'>
      <img className='h-auto w-4 ' src="src/assets/Images/menuIcon/silver.png" alt="silver coin" />
      <span className='ml-1'>{userData?.wallet?.silverCoins||0}</span>

    </div>
  </div>
  )
}

export default CoinsList
