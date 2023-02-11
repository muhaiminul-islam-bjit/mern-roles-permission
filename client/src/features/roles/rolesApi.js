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
    getRoleById: builder.query({
      query: (id) => `/roles/getById?id=${id}`,
      providesTags: (result, error, arg) => [{ type: "role", id: arg }],
    }),
    deleteRole: builder.mutation({
      query: (id) => ({
        url: '/roles',
        method: 'DELETE',
        body: { id: id }
      }),
      invalidatesTags: ["roles", "roles-pulldown"]
    }),
    createRole: builder.mutation({
      query: (data) => ({
        url: '/roles',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: (result, error, arg) => ["roles", "roles-pulldown", { type: 'role', id: arg.id }]
    }),
  }),
});
export const { useGetRolesPulldownQuery, useGetRolesQuery, useCreateRoleMutation, useDeleteRoleMutation, useGetRoleByIdQuery } = rolesApi;