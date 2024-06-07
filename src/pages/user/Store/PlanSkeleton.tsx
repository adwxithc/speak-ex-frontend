
import Skeleton from 'react-loading-skeleton'

function PlanSkeleton() {
  return (
    <div className=' w-32'  >
      <Skeleton baseColor="#a7a6a6" highlightColor="#969595" className='aspect-square  text-[#a7a6a6]' />
      <Skeleton className='h-20 m-0 ' baseColor="#c9c8c8" highlightColor="#dfdede" />
    </div>

  )
}

export default PlanSkeleton
