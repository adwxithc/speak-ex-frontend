interface ISocials{
  followers:number;
  following:number;
  posts:number;
  averageLikes:number
}
function Socials({socials}:{socials:ISocials}) {
  return (
    <div className='max-w-[200px] sm:max-w-md p-3'>
    <img className="h-48 w-48 mx-auto mb-5 rounded-full" src="/src/assets/Images/menuIcon/profile.png" alt="" />
   
    <h2 className='text-lg font-bold mb-5'>Socials</h2>
    <div className="text-black/50 font-medium  text-sm">
      <p className="flex justify-between mb-3 gap-3">
      <span>followers :</span> <span className="text-black/70 font-normal">{socials.followers}</span>
      </p>
      <p className="flex justify-between mb-3 gap-3" >
      <span>following:</span> <span className="text-black/70 font-normal">{socials.following}</span>
      </p>
      <p className="flex justify-between mb-3 gap-3">
      <span>total post count:</span> <span className="text-black/70 font-normal">{socials.posts}</span>
      </p>
      <p className="flex justify-between mb-3 gap-3">
      <span>average Like:</span> <span className="text-black/70 font-normal">{socials.averageLikes}</span>
      </p>
      
    </div>
    
  </div>
  )
}

export default Socials
