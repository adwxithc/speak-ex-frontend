import { apiSlice } from '../../../apiSlice';

const ADMIN_URl = '/api/admin';

export const monetizationApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getMonetizationRequests: builder.query({
            query: (data) =>
                `${ADMIN_URl}/monetization-requests?page=${
                    data.page || 1
                }&status=${data.status || 'all'}`,
        }),
        updateMonetizationStatus: builder.mutation({
            query: (data) => ({
                url: `${ADMIN_URl}/update-monetization-status/${data.userId}`,
                method: 'PUT',
                body: {status:data.status},
            }),
        }),
    }),
});

export const {
    useGetMonetizationRequestsQuery,
    useUpdateMonetizationStatusMutation,
} = monetizationApiSlice;
