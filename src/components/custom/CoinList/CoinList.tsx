

function CoinList() {
    const baseUrl = import.meta.env.VITE_BASE_URL 
  return (
    <div className="hidden sm:flex items-center justify-center  mr-5   cursor-pointer">

        <div className="flex justify-center items-center mr-5">
       
        <div className="h-10 w-10 flex justify-center items-center">
        <img className="object-contain h-full w-full " src={`${baseUrl}/Images/Coins/singleGoldCoin.png`} alt="gold coins" />
        </div>
        <span className="text-sm">150</span>
        </div>


        <div className="flex justify-center items-center mr-5">
        
        <div className="h-8 w-8 flex justify-center items-center">
        <img className="object-contain h-full w-full " src={`${baseUrl}/Images/Coins/singleSilveCoin.png`} alt="gold coins" />
        <span className="text-sm">150</span>
        </div>
        
        </div>
        
      
    </div>
  )
}

export default CoinList
