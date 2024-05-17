import { apiSlice } from '../../../apiSlice';

const ADMIN_URl = '/api/admin';

export const languageApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        
        addLanguage:builder.mutation({
            query: (data) => {
                
                return {
                    url: `${ADMIN_URl}/language`,
                    method: 'POST',
                    body: data,
                };
            },
        }),
        getLanguages: builder.mutation({
            query: (data) => ({
                url: `${ADMIN_URl}/languages?page=${data.page || 1}&key=${
                    data.key || ''
                }`,
                method: 'GET',
            }),
        }),
        getLearnerHelperRatio:builder.query({
            query:(data)=>`${ADMIN_URl}/language/${data.languageId}/user-ratio`
        }),
        getMonthlySessions:builder.query({
            query:(data)=>`${ADMIN_URl}/language/${data.languageId}/monthly-sessions`
        }),

    }),
});

export const { useAddLanguageMutation,useGetLanguagesMutation, useGetLearnerHelperRatioQuery, useGetMonthlySessionsQuery } = languageApiSlice;
