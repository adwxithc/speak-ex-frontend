import { apiSlice } from '../../../apiSlice'

const ADMIN_URl = '/api/admin';

export const coinPurchasePlanApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createPurchasePlan: builder.mutation({
            query: (data) => ({
                url: `${ADMIN_URl}/coin-purchase-plan`,
                method: 'POST',
                body: data,
            }),
        }),
        
        
        
       

    }),
});

export const { useCreatePurchasePlanMutation } = coinPurchasePlanApiSlice;
