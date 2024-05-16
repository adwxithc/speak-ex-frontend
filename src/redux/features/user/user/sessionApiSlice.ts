import { apiSlice } from '../../../apiSlice';

const SESSION_URL = '/api/session';

export const sessionApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        rateSession:builder.mutation({
            query:(data)=>({
                url:`${SESSION_URL}/rate/${data.sessionCode}`,
                method:'POST',
                body:{rating:data.rating}
            })
        }),
        reportSession:builder.mutation({
            query:(data)=>({
                url:`${SESSION_URL}/report/${data.sessionCode}`,
                method:'POST',
                body:{description:data.description}
            })
        }),
       
})
})


export const {
    useRateSessionMutation,
    useReportSessionMutation
} = sessionApiSlice;
