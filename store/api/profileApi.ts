import { baseApi } from "../axios/baseApi";
import type { Account, MessageResponse } from "../types";

export const profileApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProfile: builder.query<Account, void>({
      query: () => ({ url: "/profiles/me" }),
      providesTags: ["Profile"],
    }),

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
