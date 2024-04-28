import Skeleton from 'react-loading-skeleton';
function UserPostsSkelton() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:p-5 mt-3 sm:mt-0">
        {
            new Array(4).fill(0).map((_,index)=> <Skeleton key={index} baseColor="#a7a6a6" highlightColor="#969595" className='w-full text-[#a7a6a6] h-56 rounded-xl cursor-progress' />)
        }
       
    
    </div>
  )
}

export default UserPostsSkelton
