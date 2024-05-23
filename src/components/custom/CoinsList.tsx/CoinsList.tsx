import { IWallet } from "../../../types/database"

function CoinsList({wallet}:{wallet:IWallet}) {
   
  return (
    <div className='flex px-1 drop-shadow'>
    <div className='flex px-4 py-2 text-sm text-gray-700 flex-1 items-center  bg-[#ffff1a27] cursor-pointer rounded-md'>
      <img className='h-auto w-5 ' src="src/assets/Images/menuIcon/gold.png" alt="gold coin" />
      
      <span className='ml-1'>{wallet.goldCoins}</span>
    </div>
    <div className='flex px-4 py-2 text-sm text-gray-700 flex-1 items-center bg-[#c6c6c62e] ml-1 cursor-pointer rounded-md'>
      <img className='h-auto w-5 ' src="src/assets/Images/menuIcon/silver.png" alt="silver coin" />
      <span className='ml-1'>{wallet.silverCoins}</span>

    </div>
  </div>
  )
}

export default CoinsList
