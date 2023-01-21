import { apiSlice } from "../api/apiSlice";

export const usersApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: ({ pageNumber, limit }) => `/users?pageNumber=${pageNumber}&limit=${limit}`,
    })
  }),
});

export const { useGetUsersQuery } = usersApi;