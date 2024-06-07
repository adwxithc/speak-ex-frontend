

import { RouterProvider } from 'react-router-dom';
import router from './routes/mainRouter';
import { Suspense } from 'react';

function App() {


  return (
    <>
      <Suspense fallback="loading...">
        <RouterProvider router={router} fallbackElement={<p>Initial Loading</p>} ></ RouterProvider>
      </Suspense>
    </>
  )
}

export default App
