

import {RouterProvider, createBrowserRouter} from 'react-router-dom';

import LandingPage from './pages/user/LandingPage'
import Dashboard from './pages/admin/dashboard/Dashboard';
import SignUp from './pages/user/auth/SignUp'
import SignIn from './pages/user/auth/SignIn';
import VerifyUser from './pages/user/auth/verifyUser';
import SignOut from './pages/user/auth/signOut';

const router= createBrowserRouter([
  {
    id:'root',
    path:'/',
    children:[
      {
        index:true,
        Component:LandingPage,
      },
      {
        path:'/signin',
        Component:SignIn
      },
      {
        path:'/signup',
        Component:SignUp,
      },
      {
        path:'/signup/verify-user',
        Component:VerifyUser
      },
      {
        path:'/signout',
        Component:SignOut
      }
    ]

  },
  {
    path:'/admin',
    children:[   
      {
        index:true,
        Component:Dashboard
      }
    ]
  }
])

function App() {


  return (
    <>
      <RouterProvider router={router} fallbackElement={<p>Initial Loading</p>} ></ RouterProvider>
      
    </>
  )
}

export default App
