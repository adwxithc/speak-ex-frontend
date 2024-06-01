import { apiSlice } from '../../../apiSlice';

const USER_URL = '/api/user';

export const postApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getNotifications: builder.query({
            query: (data) => `${USER_URL}/notifications?page=${data.page||1}`,
        }),
        markAsRead:builder.mutation({
            query: (data) => ({
                url:`${USER_URL}/notification-readed`,
                method:'PATCH',
                body:data
            })
        }),
        getSingleNotification: builder.mutation({
            query: (data) => ({
                url:`${USER_URL}/notification/${data.notificationId}`,
                method:'GET',

            }),
        }),
    }),
});

export const {
    useGetNotificationsQuery,
    useMarkAsReadMutation,
    useGetSingleNotificationMutation
} = postApiSlice;
