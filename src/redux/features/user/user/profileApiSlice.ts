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
    }),
});

export const {
    useUploadProfileMutation
} = profileApiSlice;
