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
        getSession:builder.query({
            query: (data) => `${SESSION_URL}/sessionCode/${data.sessionCode}`,
        }),
        getCoinPurchasePlans:builder.query({
            query: () => `${SESSION_URL}/coin-purchase-plans`,
        }),
        getSessionData:builder.query({
            query:(data)=>`${SESSION_URL}/session-datas/${data.userId}`
        }),
        requestForMonetization:builder.mutation({
            query:(data)=>({
                url:`${SESSION_URL}/request-monetization`,
                method:'POST',
                body:data
            })
        }),
        getVideoSessions:builder.query({
            query: (data) => `${SESSION_URL}/video-sessions?page=${data.page||1}&type=${data.type||'all'}`,
        })

       
})
})


export const {
    useRateSessionMutation,
    useReportSessionMutation,
    useGetSessionQuery,
    useGetCoinPurchasePlansQuery,
    useGetSessionDataQuery,
    useRequestForMonetizationMutation,
    useGetVideoSessionsQuery
} = sessionApiSlice;
