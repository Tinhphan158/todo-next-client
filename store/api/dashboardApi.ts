import { baseApi } from "../axios/baseApi";
import type { DashboardSummary } from "../types";

export const dashboardApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get dashboard summary
    getDashboardSummary: builder.query<DashboardSummary, void>({
      query: () => ({ url: "/dashboard/me/summary" }),
      providesTags: ["Dashboard"],
    }),
  }),
});

export const { useGetDashboardSummaryQuery } = dashboardApi;
