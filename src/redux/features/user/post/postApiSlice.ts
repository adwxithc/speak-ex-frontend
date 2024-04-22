import { apiSlice } from '../../../apiSlice';

const POST_URL = '/api/post';

export const postApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        uploadImg: builder.mutation({
            query: (data) => ({
                url: `${POST_URL}/`,
                method: 'POST',
                body: data,
            }),
        }),
        getUsersPosts:builder.mutation({
            query:(data)=>({
                url:`${POST_URL}/user/${data.userName}`,
                method:'GET',
            })
        }),
        getPost:builder.mutation({
            query:(data)=>({
                url:`${POST_URL}/${data.postId}`,
                method:'GET',
            })
        }),
        
      
       
     

    }),
});

export const {
useUploadImgMutation,
useGetUsersPostsMutation,
useGetPostMutation
} = postApiSlice;
