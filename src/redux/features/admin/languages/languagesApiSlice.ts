import { apiSlice } from '../../../basApiSlice';

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
                url: `${ADMIN_URl}/languages-list?page=${data.page || 1}&key=${
                    data.key || ''
                }`,
                method: 'GET',
            }),
        }),

    }),
});

export const { useAddLanguageMutation,useGetLanguagesMutation } = languageApiSlice;
