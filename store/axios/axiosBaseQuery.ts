import type { BaseQueryFn } from "@reduxjs/toolkit/query";
import axios, { type AxiosError, type AxiosRequestConfig } from "axios";

export const axiosInstance = axios.create({
  baseURL: "/api/proxy",
  withCredentials: true,
});

async function refreshSession(): Promise<boolean> {
  try {
    const res = await fetch("/api/auth/refresh", {
      method: "POST",
      credentials: "include",
    });
    return res.ok;
  } catch {
    return false;
  }
}

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
> = async ({ url, method = "GET", data, params, headers }) => {
  const attempt = async (): Promise<
    { data: unknown } | { error: AxiosBaseQueryError }
  > => {
    try {
      const result = await axiosInstance({
        url,
        method,
        data,
        params,
        headers: headers ?? {},
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

  let result = await attempt();

  if (
    "error" in result &&
    result.error.status === 401 &&
    typeof window !== "undefined"
  ) {
    const path = window.location.pathname;
    if (
      !path.startsWith("/login") &&
      !path.startsWith("/register") &&
      !path.startsWith("/forgot-password")
    ) {
      const refreshed = await refreshSession();
      if (refreshed) {
        result = await attempt();
      }
    }
  }

  return result;
};
