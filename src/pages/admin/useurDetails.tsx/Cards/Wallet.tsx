import { IWallet } from "../../../../types/database"

function Wallet({wallet}:{wallet:IWallet}) {
  return (
    <div className='max-w-[200px] sm:max-w-md p-3'>
      <img className="h-48 w-48 mx-auto mb-5 rounded-full" src="/src/assets/Images/menuIcon/profile.png" alt="" />
     
      <h2 className='text-lg font-bold mb-5'>Wallet</h2>
      <div className="text-black/50 font-medium max-w-96 text-sm">
        <p className="flex justify-between mb-3">
        <span>Silver Coins :</span> <span className="text-black/70 font-normal">{wallet.silverCoins}</span>
        </p>
        <p className="flex justify-between mb-3" >
        <span>Gold Coins :</span> <span className="text-black/70 font-normal">{wallet.goldCoins}</span>
        </p>
        <p className="flex justify-between mb-3">
        <span>Money:</span> <span className="text-black/70 font-normal">{wallet.money}</span>
        </p>
        
      </div>
      
    </div>
  )
}

export default Wallet
