import type { BaseQueryFn } from "@reduxjs/toolkit/query";
import axios, { type AxiosError, type AxiosRequestConfig } from "axios";

export const axiosInstance = axios.create({
  baseURL: "/api/proxy",
  headers: {
    "Content-Type": "application/json",
  },
});

interface AxiosBaseQueryArgs {
  url: string;
  method?: AxiosRequestConfig["method"];
  data?: AxiosRequestConfig["data"];
  params?: AxiosRequestConfig["params"];
  headers?: AxiosRequestConfig["headers"];
}

interface AxiosBaseQueryError {
  status?: number;
  data?: unknown;
}

export const axiosBaseQuery: BaseQueryFn<
  AxiosBaseQueryArgs,
  unknown,
  AxiosBaseQueryError
> = async ({ url, method = "GET", data, params, headers }, api) => {
  try {
    const state = api.getState() as { auth: { accessToken: string | null } };
    const token = state.auth?.accessToken;

    const result = await axiosInstance({
      url,
      method,
      data,
      params,
      headers: {
        ...headers,
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });

    return { data: result.data };
  } catch (err) {
    const error = err as AxiosError;
    const status = error.response?.status;

    if (
      status === 403 &&
      typeof window !== "undefined" &&
      !window.location.pathname.startsWith("/forbidden")
    ) {
      window.location.assign("/forbidden");
    }

    return {
      error: {
        status,
        data: error.response?.data || error.message,
      },
    };
  }
};
