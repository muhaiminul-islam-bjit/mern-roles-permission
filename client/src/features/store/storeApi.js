import { apiSlice } from "../api/apiSlice";

export const storeApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getStorePullDown: builder.query({
            query: () => `/stores/pulldown`
        })
    })
});

export const { useGetStorePullDownQuery } = storeApi;