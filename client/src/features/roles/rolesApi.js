import { apiSlice } from "../api/apiSlice";

export const rolesApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getRoles: builder.query({
      query: ({}) => `/roles`,
    })
  }),
});

export const { useGetRolesQuery } = rolesApi;