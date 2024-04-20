import { ReactNode } from 'react'

function PostWraper({children}:{children:ReactNode}) {
  return (
    <div className='border  shadow-sm  w-[50vw] overflow-hidden '>
      {children}
    </div>
  )
}

export default PostWraper
