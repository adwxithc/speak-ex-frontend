import { ReactNode } from 'react'
import Container from '../Container/Container'

function PostWraper({children}:{children:ReactNode}) {
  return (
    <main className='shadow-sm w-auto  max-w-[55rem] overflow-hidden my-2 mx-auto'>
      <Container>
        {children}
      </Container>
      
    </main>
  )
}

export default PostWraper




// import { ReactNode } from 'react'

// function PostWraper({children}:{children:ReactNode}) {
//   return (
//     <div className='border  shadow-sm w-auto sm:w-[50vw] overflow-hidden my-2 mx-auto'>
//       {children}
//     </div>
//   )
// }

// export default PostWraper
