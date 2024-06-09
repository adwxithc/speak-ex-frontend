import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';
import Dashboard from '../pages/admin/Dashboard/Dashboard';

const  AdminPrivateRoute = lazy(()=> import('../pages/admin/AdminPrivateRoute.tsx/AdminPrivateRoute')) ;
// const  Dashboard = lazy(()=> import('../pages/admin/Dashboard/Dashboard')) ;
const  CreateCoinPurchasePlan = lazy(()=> import('../pages/admin/GoldCoins/CreateCoinPurchasePlan/CreateCoinPurchasePlanLogic')) ;
const  GoldCoins = lazy(()=> import('../pages/admin/GoldCoins/GoldCoins')) ;
const  AdminHomeLayout = lazy(()=> import('../pages/admin/Home/AdminHomeLayout')) ;
const  AddNewLanguage = lazy(()=> import('../pages/admin/Languages/AddNewLanguage/AddNewLanguage')) ;
const  LanguageInfo = lazy(()=> import('../pages/admin/Languages/LanguageInfo/LanguageInfo')) ;
const  Languages = lazy(()=> import('../pages/admin/Languages/Languages')) ;
const  Monetization = lazy(()=> import('../pages/admin/Monetization/Monetization')) ;
const  ReportManagement = lazy(()=> import('../pages/admin/ReportManagement/ReportManagement')) ;
const  Users = lazy(()=> import('../pages/admin/Users/Users')) ;
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
