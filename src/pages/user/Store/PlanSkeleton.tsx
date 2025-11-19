
import Skeleton from 'react-loading-skeleton'

function PlanSkeleton() {
  return (
    <div className='w-44 sm:w-48 rounded-2xl overflow-hidden shadow-lg border-2 border-gray-200'>
      <Skeleton baseColor="#e8e8e8" highlightColor="#f5f5f5" className='aspect-square text-[#e8e8e8]' />
      <div className='p-3 sm:p-4 bg-gradient-to-b from-gray-50 to-white'>
        <Skeleton className='h-10 mb-2 rounded-lg' baseColor="#f5f5f5" highlightColor="#ffffff" />
        <Skeleton className='h-10 rounded-lg' baseColor="#d1d5db" highlightColor="#e5e7eb" />
      </div>
    </div>

  )
}

export default PlanSkeleton
