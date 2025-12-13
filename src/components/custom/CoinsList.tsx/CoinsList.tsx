import { useSelector } from "react-redux"
import { RootState } from "../../../redux/store"




function CoinsList() {
  const { wallet } = useSelector((state: RootState) => state.user)
  return (
    <div className='flex gap-2 p-2'>
      {/* Gold Coins */}
      <div className='flex-1 flex items-center gap-2 bg-gradient-to-br from-yellow-50 to-amber-50 px-3 py-2.5 rounded-lg border border-yellow-200 shadow-sm hover:shadow-md transition-shadow duration-200 group'>
        <div className="relative">
          <img className='h-5 w-5 drop-shadow-md group-hover:scale-110 transition-transform duration-200' src="/Images/Coins/gold.webp" alt="gold coin" />
          <div className="absolute inset-0 bg-yellow-400/20 rounded-full blur-sm group-hover:bg-yellow-400/30 transition-colors"></div>
        </div>
        <div className="flex flex-col">
          <span className='text-xs text-yellow-700 font-medium'>Gold</span>
          <span className='font-bold text-yellow-800'>{wallet?.goldCoins || 0}</span>
        </div>
      </div>

      {/* Silver Coins */}
      <div className='flex-1 flex items-center gap-2 bg-gradient-to-br from-gray-50 to-slate-50 px-3 py-2.5 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200 group'>
        <div className="relative">
          <img className='h-5 w-5 drop-shadow-md group-hover:scale-110 transition-transform duration-200' src="/Images/Coins/silver.webp" alt="silver coin" />
          <div className="absolute inset-0 bg-gray-400/20 rounded-full blur-sm group-hover:bg-gray-400/30 transition-colors"></div>
        </div>
        <div className="flex flex-col">
          <span className='text-xs text-gray-600 font-medium'>Silver</span>
          <span className='font-bold text-gray-800'>{wallet?.silverCoins || 0}</span>
        </div>
      </div>
    </div>
  )
}

export default CoinsList
