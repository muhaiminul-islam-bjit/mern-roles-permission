import { apiSlice } from "../api/apiSlice";

export const usersApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: ({ pageNumber, limit, search }) => `/users?pageNumber=${pageNumber}&limit=${limit}&search=${search}`,
      providesTags: ["users"]
    }),
    getUserById: builder.query({
      query: ({ id }) => `/users/getById?id=${id}`,
      providesTags: (result, error, arg) => [{ type: "user", id: arg }],
    }),
    deleteUsers: builder.mutation({
      query: (data) => ({
        url: `/users`,
        method: "DELETE",
        body: data
      }),
      invalidatesTags: ["users"],
    }),
    updateUsers: builder.mutation({
      query: (data) => ({
        url: `/users`,
        method: "PATCH",
        body: data
      }),
      invalidatesTags: (result, error, arg) => [
        "users",
        { type: "user", id: arg.id }
      ],
    }),
  }),
});

export const { useGetUsersQuery, useDeleteUsersMutation, useGetUserByIdQuery, useUpdateUsersMutation } = usersApi;