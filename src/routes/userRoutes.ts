import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';
import UserPrivateRoute from '../pages/user/userPrivateRoute/UserPrivateRoute';

const UserLayout =  lazy(()=>import('../components/layout/userLayout/UserLayout'));
const Chat = lazy(() => import('../pages/user/chat/Chat'));
const FollowAndFollowers = lazy(() => import('../pages/user/followAndFollowers/FollowAndFollowers'));
const LandingPage = lazy(() => import('../pages/user/landingPage/LandingPage'));
const Monetization = lazy(() => import('../pages/user/monetization/Monetization'));
const Post = lazy(() => import('../pages/user/post.ts/Post'));
const Profile = lazy(() => import('../pages/user/profile/Profile'));
const SessionFeedBack = lazy(() => import('../pages/user/sessionFeedBack/SessionFeedBack'));
const SessionLogs = lazy(() => import('../pages/user/sessionLogs/SessionLogs'));
const SessionOver = lazy(() => import('../pages/user/sessionOver/SessionOver'));
const UserInfo = lazy(() => import('../pages/user/userInfo/UserInfo'));
const UsersPosts = lazy(() => import('../pages/user/usersPosts/UsersPosts'));
const VideoSessionLogic = lazy(() => import('../pages/user/videoSession/VideoSessionLogic'));
const WaitForLearner = lazy(() => import('../pages/user/videoSession/WaitForLearners/WaitForLearner'));
const Wallet = lazy(() => import('../pages/user/wallet/Wallet'));

const userRoutes:RouteObject[] = [
    {
        id: 'root',
        path: '/',
        Component: UserLayout,
        children: [
            { index: true, Component: LandingPage },
            {
                path: '',
                Component: UserPrivateRoute,
                children: [
                    {
                        path: 'profile/:userName',
                        Component: Profile,
                        children: [
                            { index: true, Component: UsersPosts },
                            { path: 'user-info', Component: UserInfo },
                            { path: 'monetization', Component: Monetization },
                            {
                                path: 'follow/:followType',
                                Component: FollowAndFollowers,
                            },
                            { path: 'session-logs', Component: SessionLogs },
                            { path: 'wallet', Component: Wallet },
                        ],
                    },
                    { path: 'post/:postId', Component: Post },
                    {
                        path: 'session-feedback/:sessionCode',
                        Component: SessionFeedBack,
                    },
                    { path: 'session-over', Component: SessionOver },
                ],
            },
        ],
    },
    {
        path: '',
        Component: UserPrivateRoute,
        children: [
            { path: 'chat', Component: Chat },
            {
                path: 'video-session/session-wait/:sessionId',
                Component: WaitForLearner,
            },
            { path: 'video-session/:sessionId', Component: VideoSessionLogic },
        ],
    },
];

export default userRoutes;
