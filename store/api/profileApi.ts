import { baseApi } from "../axios/baseApi";
import type { Account } from "../types";

export const profileApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProfile: builder.query<Account, void>({
      query: () => ({ url: "/profiles/me" }),
      providesTags: ["Profile"],
    }),

    updateProfile: builder.mutation<
      Account,
      { name?: string; avatar?: string }
    >({
      query: (body) => ({
        url: "/profiles/me",
        method: "PATCH",
        data: body,
      }),
      invalidatesTags: ["Profile"],
    }),
  }),
});

export const { useGetProfileQuery, useUpdateProfileMutation } = profileApi;
