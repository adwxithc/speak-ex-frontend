import { apiSlice } from '../../../apiSlice';

const ADMIN_URl = '/api/admin';

export const dashboardApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getDashboardNumerics: builder.query({
            query: () => `${ADMIN_URl}/dashboard-numerics`
        }),
        getSessionVsProfit: builder.query({
            query: () => `${ADMIN_URl}/sessions-vs-profit`
        }),
        getMostLikedPosts:builder.query({
            query:()=>`${ADMIN_URl}/popular-posts`
        }),
        getMostPopularPlans:builder.query({
            query:()=>`${ADMIN_URl}/popular-purchase-plans`
        })
    }),
});

export const {
   useGetDashboardNumericsQuery,
   useGetSessionVsProfitQuery,
   useGetMostLikedPostsQuery,
   useGetMostPopularPlansQuery
} = dashboardApiSlice;
