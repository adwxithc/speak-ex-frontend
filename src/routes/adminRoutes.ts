import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';


const  AdminPrivateRoute = lazy(()=> import('../pages/admin/adminPrivateRoute.tsx/AdminPrivateRoute')) ;
const  Dashboard = lazy(()=> import('../pages/admin/adminDashboard/AdminDashboard')) ;
const  CreateCoinPurchasePlan = lazy(()=> import('../pages/admin/goldCoins/CreateCoinPurchasePlan/CreateCoinPurchasePlanLogic')) ;
const  GoldCoins = lazy(()=> import('../pages/admin/goldCoins/GoldCoins')) ;
const  AdminHomeLayout = lazy(()=> import('../pages/admin/home/AdminHomeLayout')) ;
const  AddNewLanguage = lazy(()=> import('../pages/admin/languages/AddNewLanguage/AddNewLanguage')) ;
const  LanguageInfo = lazy(()=> import('../pages/admin/languages/LanguageInfo/LanguageInfo')) ;
const  Languages = lazy(()=> import('../pages/admin/languages/Languages')) ;
const  Monetization = lazy(()=> import('../pages/admin/monetization/Monetization')) ;
const  ReportManagement = lazy(()=> import('../pages/admin/reportManagement/ReportManagement')) ;
const  Users = lazy(()=> import('../pages/admin/users/Users')) ;
const  AdminSignOut = lazy(()=> import('../pages/admin/auth/AdminSignOut')) ;
const  AdminSignin = lazy(()=> import('../pages/admin/auth/AdminSignin')) ;

const adminRoutes:RouteObject[] = [
    {
        path: '',
        Component: AdminPrivateRoute,
        children: [
            {
                path: '/admin',
                Component: AdminHomeLayout,
                children: [
                    { index: true, Component: Dashboard },
                    { path: 'users', Component: Users },
                    { path: 'monetisation', Component: Monetization },
                    { path: 'gold-coins', Component: GoldCoins },
                    {
                        path: 'create-plan',
                        Component: CreateCoinPurchasePlan,
                    },
                    { path: 'report-management', Component: ReportManagement },
                    { path: 'languages', Component: Languages },
                    { path: 'add-language', Component: AddNewLanguage },
                    { path: 'language/:languageId', Component: LanguageInfo },
                ],
            },
        ],
    },
    { path: '/admin/signin', Component: AdminSignin },
    { path: '/admin/signout', Component: AdminSignOut },
];
export default adminRoutes;
