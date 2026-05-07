import { baseApi } from "../axios/baseApi";
import { logout, setUser } from "../slices/authSlice";
import type { Account, MessageResponse, OtpPurpose } from "../types";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Login
    login: builder.mutation<
      { id: number; name: string; email: string; avatar: string | null },
      { email: string; password: string }
    >({
      query: (body) => ({
        url: "/auth/login",
        method: "POST",
        data: body,
      }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setUser(data));
        } catch {
          // Keep error handling in component via unwrap().
        }
      },
    }),

    // Request signup OTP
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

    // Signup
    signup: builder.mutation<Account, { email: string }>({
      query: (body) => ({
        url: "/auth/signup",
        method: "POST",
        data: body,
      }),
    }),

    // Logout
    logout: builder.mutation<MessageResponse, void>({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(logout());
        } catch {
          // Keep error handling in component via unwrap().
        }
      },
    }),

    // Request forgot password OTP
    forgotPassword: builder.mutation<MessageResponse, { email: string }>({
      query: (body) => ({
        url: "/auth/forgot-password",
        method: "POST",
        data: body,
      }),
    }),

    // Verify OTP
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

    // Reset password
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
  useLoginMutation,
  useRequestSignupOtpMutation,
  useSignupMutation,
  useLogoutMutation,
  useForgotPasswordMutation,
  useVerifyOtpMutation,
  useResetPasswordMutation,
} = authApi;
