import { apiSlice } from "../../basApiSlice";

const USER_URL='/api/user'

export const userApiSlice = apiSlice.injectEndpoints({
    endpoints:(builder)=>({
        login:builder.mutation({
            query:(data)=>({
                url:`${USER_URL}/signin`,
                method:'POST',
                body:data
            })
        }),
        signUp:builder.mutation({
            query:(data)=>({
                url:`${USER_URL}/signup`,
                method:'POST',
                body:data
            })
        }),
        verifyUser:builder.mutation({
            query:(data)=>({
                url:`${USER_URL}/signup/verify-user`,
                method:'POST',
                body:data
            })
        }),
        signOut:builder.mutation({
            query:()=>({
                url:`${USER_URL}/signout`,
                method:'POST'
            })
        })

    })
})

export const {useLoginMutation,useSignUpMutation, useVerifyUserMutation, useSignOutMutation} = userApiSlice