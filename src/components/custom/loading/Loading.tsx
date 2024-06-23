
import { RiseLoader } from 'react-spinners'

function Loading() {
  return (
    <div className='absolute inset-0 flex justify-center items-center bg-white/20'>
      <RiseLoader color="blue" />
    </div>
  )
}

export default Loading
