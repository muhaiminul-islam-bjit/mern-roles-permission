import { apiSlice } from "../api/apiSlice";

export const rolesApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getRolesPulldown: builder.query({
      query: ({ }) => `/roles/pulldown`,
      providesTags: ["roles-pulldown"]
    }),
    getRoles: builder.query({
      query: ({ }) => `/roles/`,
      providesTags: ["roles"]
    }),
    deleteRole: builder.mutation({
      query: (id) => ({
        url: '/roles',
        method: 'DELETE',
        body: { id: id }
      }),
      invalidatesTags: ["roles","roles-pulldown"]
    }),
    createRole: builder.mutation({
      query: (data) => ({
        url: '/roles',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ["roles","roles-pulldown"]
    }),
  }),
});
export const { useGetRolesPulldownQuery, useGetRolesQuery, useCreateRoleMutation, useDeleteRoleMutation } = rolesApi;