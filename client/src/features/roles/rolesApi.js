import { apiSlice } from "../api/apiSlice";

export const rolesApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getRolesPulldown: builder.query({
      query: ({ }) => `/roles/pulldown`,
      providesTags: ["roles"]
    }),
    getRoles: builder.query({
      query: ({ }) => `/roles/`,
      providesTags: ["roles"]
    }),
    createRole: builder.mutation({
      query: (data) => ({
        url: '/roles',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ["roles"]
    }),
  }),
});
export const { useGetRolesPulldownQuery, useGetRolesQuery, useCreateRoleMutation } = rolesApi;