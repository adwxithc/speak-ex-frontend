import { apiSlice } from '../../../apiSlice';

const USER_URL = '/api/user';

export const profileApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        uploadProfile: builder.mutation({
            query: (data) => ({
                url: `${USER_URL}/profile`,
                method: 'PUT',
                body: data,
            }),
        }),
        uploadCoverPic: builder.mutation({
            query: (data) => ({
                url: `${USER_URL}/cover-pic`,
                method: 'PUT',
                body: data,
            }),
        }),
        updateUserInfo: builder.mutation({
            query: (data) => ({
                url: `${USER_URL}/`,
                method: 'PUT',
                body: data,
            }),
        }),
        getAllLanguages: builder.mutation({
            query: () => ({
                url: `${USER_URL}/languages`,
                method: 'Get',
            }),
        }),
        searchUsers:builder.mutation({
            query: (data) => ({
                url: `${USER_URL}/?key=${data.key}&page=${data.page}`,
                method: 'GET',
            }),
        }),
        getUser:builder.query({
            query:(data)=>`${USER_URL}/userName/${data.userName}`
        }),
        getUserById:builder.query({
            query: (data) => {
                if (!data.userId) {
                  return '';
                }
                return `${USER_URL}/id/${data.userId}`;
              },
        }),
        

    }),
    
});

export const {
    useUploadProfileMutation,
    useUpdateUserInfoMutation,
    useGetAllLanguagesMutation,
    useSearchUsersMutation,
    useGetUserQuery,
    useGetUserByIdQuery,
    useUploadCoverPicMutation
} = profileApiSlice;
