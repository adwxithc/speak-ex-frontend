import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';
import UserLayout from '../components/layout/UserLayout/UserLayout';
import UserPrivateRoute from '../pages/user/UserPrivateRoute/UserPrivateRoute';

const Chat = lazy(() => import('../pages/user/Chat/Chat'));
const FollowAndFollowers = lazy(() => import('../pages/user/FollowAndFollowers/FollowAndFollowers'));
const LandingPage = lazy(() => import('../pages/user/LandingPage/LandingPage'));
const Monetization = lazy(() => import('../pages/user/Monetization/Monetization'));
const Post = lazy(() => import('../pages/user/Post.ts/Post'));
const Profile = lazy(() => import('../pages/user/Profile/Profile'));
const SessionFeedBack = lazy(() => import('../pages/user/SessionFeedBack/SessionFeedBack'));
const SessionLogs = lazy(() => import('../pages/user/SessionLogs/SessionLogs'));
const SessionOver = lazy(() => import('../pages/user/SessionOver/SessionOver'));
const UserInfo = lazy(() => import('../pages/user/UserInfo/UserInfo'));
const UsersPosts = lazy(() => import('../pages/user/UsersPosts/UsersPosts'));
const VideoSessionLogic = lazy(() => import('../pages/user/VideoSession/VideoSessionLogic'));
const WaitForLearner = lazy(() => import('../pages/user/VideoSession/WaitForLearners/WaitForLearner'));
const Wallet = lazy(() => import('../pages/user/Wallet/Wallet'));

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
