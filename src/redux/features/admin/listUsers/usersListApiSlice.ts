import { apiSlice } from '../../../apiSlice';

const ADMIN_URl = '/api/admin';

export const usersListApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
     
        getUsers: builder.mutation({
            query: (data) => ({
                url: `${ADMIN_URl}/users?page=${data.page || 1}&key=${
                    data.key || ''
                }`,
                method: 'GET',
            }),
        }),
        updateUser: builder.mutation({
            query: (data) => {
                const { id, ...userData } = data;
                return {
                    url: `${ADMIN_URl}/user/${id}`,
                    method: 'PUT',
                    body: userData,
                };
            },
        }),
        getCompleteUserInfo:builder.query({
            query:(data)=>`${ADMIN_URl}/user/${data.userId}`
        })

    }),
});

export const { useGetUsersMutation, useUpdateUserMutation, useGetCompleteUserInfoQuery } = usersListApiSlice;
