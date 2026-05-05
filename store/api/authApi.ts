import { baseApi } from "../axios/baseApi";
import { logout } from "../slices/authSlice";
import type { Account, MessageResponse, OtpPurpose } from "../types";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    requestSignupOtp: builder.mutation<
      MessageResponse,
      { name: string; email: string; password: string; avatar?: string }
    >({
      query: (body) => ({
        url: "/auth/signup/request-otp",
        method: "POST",
        data: body,
      }),
    }),

    signup: builder.mutation<Account, { email: string }>({
      query: (body) => ({
        url: "/auth/signup",
        method: "POST",
        data: body,
      }),
    }),

    logoutApi: builder.mutation<MessageResponse, void>({
      async queryFn(_arg, { dispatch }) {
        try {
          const res = await fetch("/api/auth/logout", {
            method: "POST",
            credentials: "include",
          });
          const data = (await res.json()) as MessageResponse;
          if (!res.ok) {
            return {
              error: {
                status: res.status,
                data,
              },
            };
          }
          dispatch(logout());
          return { data };
        } catch {
          return {
            error: {
              status: 500,
              data: { message: "Logout failed" },
            },
          };
        }
      },
    }),

    forgotPassword: builder.mutation<MessageResponse, { email: string }>({
      query: (body) => ({
        url: "/auth/forgot-password",
        method: "POST",
        data: body,
      }),
    }),

    verifyOtp: builder.mutation<
      MessageResponse,
      { email: string; otp: string; purpose: OtpPurpose }
    >({
      query: (body) => ({
        url: "/auth/verify-otp",
        method: "POST",
        data: body,
      }),
    }),

    resetPassword: builder.mutation<
      MessageResponse,
      { email: string; newPassword: string }
    >({
      query: (body) => ({
        url: "/auth/reset-password",
        method: "POST",
        data: body,
      }),
    }),
  }),
});

export const {
  useRequestSignupOtpMutation,
  useSignupMutation,
  useLogoutApiMutation,
  useForgotPasswordMutation,
  useVerifyOtpMutation,
  useResetPasswordMutation,
} = authApi;
