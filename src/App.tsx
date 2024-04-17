

import {RouterProvider, createBrowserRouter} from 'react-router-dom';

import LandingPage from './pages/user/LandingPage'
import SignUp from './pages/user/auth/SignUp'
import SignIn from './pages/user/auth/SignIn';
import VerifyUser from './pages/user/auth/verifyUser';
import SignOut from './pages/user/auth/signOut';
import ForgotPassword from './pages/user/auth/forgot-password/ForgotPassword';
import VerifyOtp from './pages/user/auth/forgot-password/VerifyOtp';
import ResetPassword from './pages/user/auth/forgot-password/ResetPassword';
import AdminSignin from './pages/admin/auth/AdminSignin';
import Users from './pages/admin/Users/Users';
import Main from './pages/admin/Main/Main';
import Monetization from './pages/admin/Monetization/Monetization'
import CreditTime from "./pages/admin/CreditTime/CreditTime";
import SalesReport from "./pages/admin/SalesReport/SalesReport";
import UsersConcerns from "./pages/admin/UsersConcerns/UsersConcerns";
import Languages from "./pages/admin/Languages/Languages";
import AdminPrivateRoute from './pages/admin/AdminPrivateRoute.tsx/AdminPrivateRoute';
import AdminSignOut from './pages/admin/auth/AdminSignOut';
import AddNewLanguage from './pages/admin/Languages/AddNewLanguage';
import Test from './pages/Test/Test';
import AdminHomeLayout from './pages/admin/Home/AdminHomeLayout';
import Profile from './pages/user/Profile/Profile';
import UserLayout from './components/layout/UserLayout/UserLayout';
import UsersPosts from './pages/user/Profile/UsersPosts';


const router= createBrowserRouter([
  {
    id:'root',
    path:'/',
    Component:UserLayout,
    children:[
      {
        path:'/test',
        Component:Test
      },
      {
        index:true,
        Component:LandingPage,
      },
     
      {
        path:'profile',
        Component:Profile,
        children:[
          {
            index:true,
            Component:UsersPosts
          }
        ]
      }
    ]

  },{
    path:'/',
    children:[
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
      },
      {
        path:'/verify-otp',
        Component:VerifyOtp
      },
      {
        path:'/forgot-password',
        Component:ForgotPassword
      },
      {
        path:'/forgot-password/reset-password',
        Component:ResetPassword
      },
    ]
  },
  {
    path:'',
    Component: AdminPrivateRoute,
    children:[
      {
        path:'/admin',
        Component:AdminHomeLayout,
        children:
        [   
          {
            index:true,
            Component:Main
          },
          {
            path:'users',
            Component:Users
          },
          {
            path:'monetisation',
            Component:Monetization
          },
          {
            path:'credit-time',
            Component:CreditTime
          },
          {
            path:'sales-report',
            Component:SalesReport
          },
          {
            path:'users-concern',
            Component:UsersConcerns
          },
          {
            path:'languages',
            Component:Languages
          },
          {
            path:'add-language',
            Component: AddNewLanguage
          }
       
        ]
      },
   
    ]

  },

  {
    path:'/admin/signin',
    Component:AdminSignin
  },
  {
    path:'/admin/signout',
    Component: AdminSignOut
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
