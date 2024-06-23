

import { RouterProvider } from 'react-router-dom';
import router from './routes/mainRouter';
import { Suspense } from 'react';
import Loading from './components/custom/loading/Loading';

function App() {


  return (
    <>
      <Suspense fallback={<Loading/>}>
        <RouterProvider router={router} fallbackElement={<Loading/>} ></ RouterProvider>
      </Suspense>
    </>
  )
}

export default App
