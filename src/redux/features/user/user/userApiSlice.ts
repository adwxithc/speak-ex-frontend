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
        }),
        checkUserNameAvailability:builder.mutation({
            query:(data)=>({
                url:`${USER_URL}/check-userName`,
                method:'POST',
                body:{userName:data}
            })
        }),
        followUser:builder.mutation({
            query:(data)=>({
                url:`${USER_URL}/follow/${data.userId}`,
                method:'PUT',
            })
        }),
        unfollowUser:builder.mutation({
            query:(data)=>({
                url:`${USER_URL}/unfollow/${data.userId}`,
                method:'PUT',
            })
        }),
        getFollowersOrFollowings:builder.query({
            query:(data)=>`${USER_URL}/${data.userName}/${data.followType}?page=${data.page||1}&limit=${data.limit||5}`
        }),
       getWallet:builder.query({
        query:()=>`${USER_URL}/wallet`
       }),
       getLanguageInfo:builder.query({
        query:(data)=>`${USER_URL}/language/${data.languageId}`
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
    useResetPasswordMutation,
    useCheckUserNameAvailabilityMutation,
    useUnfollowUserMutation,
    useFollowUserMutation,
    useGetFollowersOrFollowingsQuery,
    useGetWalletQuery,
    useGetLanguageInfoQuery
} = userApiSlice;
