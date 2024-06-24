

import { RouterProvider } from 'react-router-dom';
import router from './routes/mainRouter';
import { Suspense } from 'react';
import Loading from './components/custom/loading/Loading';
import 'react-loading-skeleton/dist/skeleton.css';

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
