import { apiSlice } from '../../../apiSlice';

const POST_URL = '/api/post';

export const postApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createPost: builder.mutation({
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
                url:`${POST_URL}/singlePost/${data.postId}`,
                method:'GET',
            })
        }),
        like:builder.mutation({
            query:(data)=>({
                url:`${POST_URL}/${data.postId}/upvote`,
                method:'PUT',
            })
        }),
        unlike:builder.mutation({
            query:(data)=>({
                url:`${POST_URL}/${data.postId}/downvote`,
                method:'PUT',
            })
        }),
        getComments:builder.mutation({
            query:(data)=>({
                url:`${POST_URL}/${data.postId}/comments?page=${data.page}&parentId=${data.parentId || null}`,
                method:'GET'
            })
        }),
        addComment: builder.mutation({
            query: (data) => ({
                url: `${POST_URL}/${data.postId}/comment`,
                method: 'POST',
                body: {text:data.text,parentId:data.parentId},
            }),
        }),
        deleteComment:builder.mutation({
            query:(data)=>({
                url: `${POST_URL}/comment/${data.commentId}`,
                method: 'DELETE',
            })
        }),
        updateComment:builder.mutation({
            query:(data)=>({
                url:`${POST_URL}/${data.postId}/comment/${data.commentId}`,
                method:'PUT',
                body:{text:data.text}
            })
        }),
        getTags:builder.query({
            query:(data)=>`${POST_URL}/tags/search?key=${data.key||''}&page=${data.page||1}`
        }),
        getFeed:builder.query({
            query:(data)=>`${POST_URL}/feed?page=${data.page||1}`
        }),
     

    }),
});

export const {
useCreatePostMutation,
useGetUsersPostsMutation,
useGetPostMutation,
useLikeMutation,
useUnlikeMutation,
useGetCommentsMutation,
useAddCommentMutation,
useDeleteCommentMutation,
useUpdateCommentMutation,
useGetTagsQuery,
useGetFeedQuery
} = postApiSlice;
