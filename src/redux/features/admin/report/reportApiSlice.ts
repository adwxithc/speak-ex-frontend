import { apiSlice } from '../../../apiSlice';

const ADMIN_URl = '/api/admin';

export const usersListApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
     
        listReportsOnSession: builder.query({
            query: (data) => `${ADMIN_URl}/session-complains?page=${data.page || 1}`,
        }),
    }),
});

export const { useListReportsOnSessionQuery } = usersListApiSlice;
