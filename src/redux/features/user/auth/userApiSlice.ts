import { apiSlice } from '../../../apiSlice';

const USER_URL = '/api/user';

export const userApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (data) => ({
                url: `${USER_URL}/signin`,
                method: 'POST',
                body: data,
            }),
        }),
        signUp: builder.mutation({
            query: (data) => ({
                url: `${USER_URL}/signup`,
                method: 'POST',
                body: data,
            }),
        }),
        verifyUser: builder.mutation({
            query: (data) => ({
                url: `${USER_URL}/signup/verify-user`,
                method: 'POST',
                body: data,
            }),
        }),
        signOut: builder.mutation({
            query: () => ({
                url: `${USER_URL}/signout`,
                method: 'POST',
            }),
        }),
        forgotPassword: builder.mutation({
            query: (data) => ({
                url: `${USER_URL}/forgot-password`,
                method: 'POST',
                body: data,
            }),

        }),
        verifyOtp:builder.mutation({
            query:(data)=>({
                url:`${USER_URL}/forgot-password/verify-user`,
                method:'POST',
                body:data
            })
        }),
        resetPassword:builder.mutation({
            query:(data)=>({
                url:`${USER_URL}/forgot-password/reset-password`,
                method:'POST',
                body:data
            })
        })
    }),
});

export const {
    useLoginMutation,
    useSignUpMutation,
    useVerifyUserMutation,
    useSignOutMutation,
    useForgotPasswordMutation,
    useVerifyOtpMutation,
    useResetPasswordMutation
} = userApiSlice;
