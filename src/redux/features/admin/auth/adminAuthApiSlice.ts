import { apiSlice } from '../../../apiSlice'

const ADMIN_URl = '/api/admin';

export const adminAuthApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        adminLogin: builder.mutation({
            query: (data) => ({
                url: `${ADMIN_URl}/signin`,
                method: 'POST',
                body: data,
            }),
        }),
        adminSignOut:builder.mutation({
            query:()=>({
                url:`${ADMIN_URl}/signout`,
                method:'POST'
            })
        }),
        
        
       

    }),
});

export const { useAdminLoginMutation, useAdminSignOutMutation } = adminAuthApiSlice;
