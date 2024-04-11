import { apiSlice } from '../../../basApiSlice';

const ADMIN_URl = '/api/admin';

export const usersListApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
     
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

export const { useGetUsersMutation, useUpdateUserMutation } = usersListApiSlice;
