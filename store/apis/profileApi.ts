import { baseApi } from "../axios/baseApi";
import type { Account, MessageResponse } from "../types";

export const profileApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get profile of the current user
    getProfile: builder.query<Account, void>({
      query: () => ({ url: "/profiles/me" }),
      providesTags: ["Profile"],
    }),

    // Update profile of the current user
    updateProfile: builder.mutation<
      Account,
      { name?: string; email?: string; avatar?: string }
    >({
      query: (body) => ({
        url: "/profiles/me",
        method: "PATCH",
        data: body,
      }),
      invalidatesTags: ["Profile"],
    }),

    // Update password of the current user
    updatePassword: builder.mutation<
      MessageResponse,
      { currentPassword: string; newPassword: string }
    >({
      query: (body) => ({
        url: "/profiles/me/password",
        method: "PATCH",
        data: body,
      }),
    }),
  }),
});

export const {
  useGetProfileQuery,
  useUpdateProfileMutation,
  useUpdatePasswordMutation,
} = profileApi;
