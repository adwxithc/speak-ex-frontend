import {createApi,fetchBaseQuery} from '@reduxjs/toolkit/query/react'

const baseQuery=fetchBaseQuery({baseUrl:''})

export const apiSlice =createApi({
    baseQuery,
    tagTypes:['User'],
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    endpoints:(builder)=> ({})
})