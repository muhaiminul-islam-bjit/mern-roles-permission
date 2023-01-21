import { apiSlice } from "../api/apiSlice";

export const rolesApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getRoles: builder.query({
      query: ({websiteId}) => `/roles?websiteId=${websiteId}`,
    })
  }),
});

export const { useGetRolesQuery } = rolesApi;