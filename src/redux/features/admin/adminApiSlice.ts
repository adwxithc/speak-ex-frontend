import { apiSlice } from '../../basApiSlice';

const ADMIN_URl = '/api/admin';

export const adminApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        adminLogin: builder.mutation({
            query: (data) => ({
                url: `${ADMIN_URl}/sigin`,
                method: 'POST',
                body: data,
            }),
        }),
        getUsers: builder.mutation({
            query: (data) => ({
                url: `${ADMIN_URl}/users-list?page=${data.page || 1}&key=${
                    data.key || ''
                }`,
                method: 'GET',
            }),
        }),
        updateUser: builder.mutation({
            query: (data) => {
                const { id, ...userData } = data;
                return {
                    url: `${ADMIN_URl}/update-user/${id}`,
                    method: 'PUT',
                    body: userData,
                };
            },
        }),
    }),
});

export const { useAdminLoginMutation, useGetUsersMutation, useUpdateUserMutation } = adminApiSlice;
