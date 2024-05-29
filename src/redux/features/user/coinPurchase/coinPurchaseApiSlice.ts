import { apiSlice } from '../../../apiSlice';

const POST_URL = '/api/session';

export const coinPurchaseApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createPayment: builder.mutation({
            query: (data) => ({
                url: `${POST_URL}/payment`,
                method: 'POST',
                body: data,
            }),
        }),
    }),
});

export const {
useCreatePaymentMutation
} = coinPurchaseApiSlice;
