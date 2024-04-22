import {FetchBaseQueryError, FetchBaseQueryMeta, createApi,fetchBaseQuery, QueryReturnValue} from '@reduxjs/toolkit/query/react'
import { logoutUser } from './features/user/auth/userSlice';


const baseQuery=fetchBaseQuery({baseUrl:''})

const baseQueryWithReauth = async <T>(
    args: any,
    api: any,
    extraOptions: any
  ): QueryReturnValue<unknown, FetchBaseQueryError, FetchBaseQueryMeta> => {
  const result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 403) {
    const refreshResult = await baseQuery('/api/user/refresh',api,extraOptions)
    if (refreshResult.data) {
      
      const result = await baseQuery(args, api, extraOptions); 

      return result
    } else {
     
      api.dispatch(logoutUser());
    } 
    
  }

  return result
};



export const apiSlice =createApi({
    baseQuery:baseQueryWithReauth,
    tagTypes:['User'],
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    endpoints:(builder)=> ({})
})