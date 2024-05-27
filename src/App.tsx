

import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import LandingPage from './pages/user/LandingPage/LandingPage'
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
import GoldCoins from "./pages/admin/GoldCoins/GoldCoins";
import UsersConcerns from "./pages/admin/UsersConcerns/UsersConcerns";
import Languages from "./pages/admin/Languages/Languages";
import AdminPrivateRoute from './pages/admin/AdminPrivateRoute.tsx/AdminPrivateRoute';
import AdminSignOut from './pages/admin/auth/AdminSignOut';
import AddNewLanguage from './pages/admin/Languages/AddNewLanguage/AddNewLanguage';
import Test from './pages/Test/Test';
import AdminHomeLayout from './pages/admin/Home/AdminHomeLayout';
import Profile from './pages/user/Profile/Profile';
import UserLayout from './components/layout/UserLayout/UserLayout';
import UsersPosts from './pages/user/UsersPosts/UsersPosts';
import UserPrivateRoute from './pages/user/UserPrivateRoute/UserPrivateRoute';
import Post from './pages/user/Post.ts/Post';
import UserInfo from './pages/user/UserInfo/UserInfo';
import Test3 from './pages/Test/Test3';
import FollowAndFollowers from './pages/user/FollowAndFollowers/FollowAndFollowers';
import Chat from './pages/user/Chat/Chat';
import WaitForLearner from './pages/user/VideoSession/WaitForLearners/WaitForLearner';


import VideoSessionLogic from './pages/user/VideoSession/VideoSessionLogic';
import SessionFeedBack from './pages/user/SessionFeedBack/SessionFeedBack';
import LanguageInfo from './pages/admin/Languages/LanguageInfo/LanguageInfo';
import SessionOver from './pages/user/SessionOver/SessionOver';
import ReportManagement from './pages/admin/ReportManagement/ReportManagement';
import CreateCoinPurchasePlan from './pages/admin/GoldCoins/CreateCoinPurchasePlan';



const router = createBrowserRouter([
  {
    id: 'root',
    path: '/',
    Component: UserLayout,
    children: [
    
      {
        index: true,
        Component: LandingPage,
      },
     {
      path:'',
      Component:UserPrivateRoute,
      children:[
        
        {
          path: 'profile/:userName',
          Component: Profile,
          children: [
            {
              index: true,
              Component: UsersPosts
            },
            {
              path: 'user-info',
              Component: UserInfo
            },
            {
              path: 'follow/:followType',
              Component:FollowAndFollowers
            }
          ]
        },
        {
          path:'post/:postId',
          Component: Post
        },
        {
          path:'session-feedback/:sessionCode',
          Component: SessionFeedBack
        },
        {
          path:'session-over',
          Component: SessionOver
        }
      ]
     },
    ]

  },{

    path:'',
    Component:UserPrivateRoute,
    children:[
      {
        path:'chat',
        Component:Chat
      },
      {
        path: 'video-session/session-wait/:sessionId',
        Component: WaitForLearner
      },
   
      {
        path:'video-session/:sessionId',
        Component:VideoSessionLogic
      },
      
    ]
  },

   {
    path: '/',
    children: [
      {
        path: '/signin',
        Component: SignIn
      },
      {
        path: '/signup',
        Component: SignUp,
      },
      {
        path: '/signup/verify-user',
        Component: VerifyUser
      },
      {
        path: '/signout',
        Component: SignOut
      },
      {
        path: '/verify-otp',
        Component: VerifyOtp
      },
      {
        path: '/forgot-password',
        Component: ForgotPassword
      },
      {
        path: '/forgot-password/reset-password',
        Component: ResetPassword
      },
      {
        path: '/test',
        Component: Test
      },
      
      {
        path: '/test3',
        Component: Test3
      },
    ]
  },
  {
    path: '',
    Component: AdminPrivateRoute,
    children: [
      {
        path: '/admin',
        Component: AdminHomeLayout,
        children:
          [
            {
              index: true,
              Component: Main
            },
            {
              path: 'users',
              Component: Users
            },
            {
              path: 'monetisation',
              Component: Monetization
            },
            {
              path: 'gold-coins',
              Component: GoldCoins
            },
            {
              path: 'create-purchase-plan',
              Component: CreateCoinPurchasePlan
            },
            {
              path: 'report-management',
              Component: ReportManagement
            },
            {
              path: 'users-concern',
              Component: UsersConcerns
            },
            {
              path: 'languages',
              Component: Languages
            },
            {
              path: 'add-language',
              Component: AddNewLanguage
            },
            {
              path: 'language/:languageId',
              Component: LanguageInfo
            }

          ]
      },

    ]

  },

  {
    path: '/admin/signin',
    Component: AdminSignin
  },
  {
    path: '/admin/signout',
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
