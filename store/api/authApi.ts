import { baseApi } from "../axios/baseApi";
import type {
  Account,
  LoginResponse,
  MessageResponse,
  OtpPurpose,
  TokenResponse,
} from "../types";

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

    login: builder.mutation<LoginResponse, { email: string; password: string }>(
      {
        query: (body) => ({
          url: "/auth/login",
          method: "POST",
          data: body,
        }),
      },
    ),

    refreshToken: builder.mutation<TokenResponse, { refreshToken: string }>({
      query: (body) => ({
        url: "/auth/refresh-token",
        method: "POST",
        data: body,
      }),
    }),

    logoutApi: builder.mutation<MessageResponse, void>({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
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
  useLoginMutation,
  useRefreshTokenMutation,
  useLogoutApiMutation,
  useForgotPasswordMutation,
  useVerifyOtpMutation,
  useResetPasswordMutation,
} = authApi;
