import {
    FetchBaseQueryError,
    createApi,
    fetchBaseQuery,
    BaseQueryFn,
    FetchArgs,
    BaseQueryApi,
} from '@reduxjs/toolkit/query/react';
import { removeCridentials } from './features/user/user/userSlice';

const baseQuery = fetchBaseQuery({ baseUrl: '' });

const baseQueryWithReauth: BaseQueryFn<
    string | FetchArgs,
    unknown,
    FetchBaseQueryError
> = async (
    args: string | FetchArgs,
    api: BaseQueryApi,
    extraOptions: {
        signal?: AbortSignal;
        meta?: Record<string, unknown>;
    } = {}
) => {
    const result = await baseQuery(args, api, extraOptions);

    if (result.error && result.error.status === 403) {
        const refreshResult = await baseQuery(
            '/api/user/refresh',
            api,
            extraOptions
        );

        if (refreshResult.data) {
            const result = await baseQuery(args, api, extraOptions);

            return result;
        } else {
            api.dispatch(removeCridentials());
        }
    }

    return result;
};

export const apiSlice = createApi({
    baseQuery: baseQueryWithReauth,
    tagTypes: ['User'],

    endpoints: () => ({}),
});
