import { apiSlice } from "../api/apiSlice";

export const usersApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: ({ pageNumber, limit }) => `/users?pageNumber=${pageNumber}&limit=${limit}`,
      providesTags: ["users"]
    }),
    deleteUsers: builder.mutation({
      query: (data) => ({
        url: `/users`,
        method: "DELETE",
        body: data
      }),
      invalidatesTags: ["users"],
    }),
  }),
});

export const { useGetUsersQuery, useDeleteUsersMutation } = usersApi;