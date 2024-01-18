import { api } from "@/redux/api/api";
import { tagTypes, tagTypesList } from "@/redux/types/tagsType";

const userApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.query({
      query: () => `/users/my-profile`,
      providesTags: [tagTypes.user],
      transformResponse: (response: any) => response.data,
    }),
    // get all users
    getAllUsers: builder.query({
      query: (search: string) => `/users?searchTerm=${search}`,
      providesTags: [tagTypes.user],
      transformResponse: (response: any) => response.data.data,
    }),

    updateMyUserInfo: builder.mutation({
      query: (data) => {
        return {
          url: `/users/update-my-email-password`,
          method: "PATCH",
          data: data,
        };
      },
      invalidatesTags: [tagTypes.user],
    }),
    // user update
    updateUser: builder.mutation({
      query: ({ id, body }) => ({
        url: `/users/update-profile/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: [tagTypes.user],
    }),
    // user delete
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/users/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.user],
    }),
    updateMyProfile: builder.mutation({
      query: (data) => ({
        url: `/users/update-my-profile`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: [tagTypes.user],
    }),
  }),
});

export const {
  useGetUserQuery,
  useGetAllUsersQuery,
  useDeleteUserMutation,
  useUpdateUserMutation,
  useUpdateMyUserInfoMutation,
  useUpdateMyProfileMutation,
} = userApi;
