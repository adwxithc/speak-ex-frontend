import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';


const SignIn = lazy(()=> import('../pages/user/auth/SignIn')) ;
const SignUp = lazy(()=> import('../pages/user/auth/SignUp')) ;
const ForgotPassword = lazy(()=> import('../pages/user/auth/forgot-password/ForgotPassword')) ;
const ResetPassword = lazy(()=> import('../pages/user/auth/forgot-password/ResetPassword')) ;
const VerifyOtp = lazy(()=> import('../pages/user/auth/forgot-password/VerifyOtp')) ;
const SignOut = lazy(()=> import('../pages/user/auth/signOut')) ;
const VerifyUser = lazy(()=> import('../pages/user/auth/verifyUser')) ;

const publicRoutes:RouteObject[] = [
    { path: '/signin', Component: SignIn },
    { path: '/signup', Component: SignUp },
    { path: '/signup/verify-user', Component: VerifyUser },
    { path: '/signout', Component: SignOut },
    { path: '/verify-otp', Component: VerifyOtp },
    { path: '/forgot-password', Component: ForgotPassword },
    { path: '/forgot-password/reset-password', Component: ResetPassword },
];

export default publicRoutes;
