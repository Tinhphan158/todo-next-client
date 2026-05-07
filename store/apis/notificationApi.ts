import { baseApi } from "../axios/baseApi";
import type { Notification, PaginatedResponse } from "../types";

interface GetNotificationsParams {
  page?: number;
  pageSize?: number;
  search?: string;
  viewed?: string;
  type?: string;
  from?: string;
  to?: string;
}

export const notificationApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get notifications
    getNotifications: builder.query<
      PaginatedResponse<Notification>,
      GetNotificationsParams
    >({
      query: (params) => ({ url: "/notifications", params }),
      providesTags: ["Notification"],
    }),

    // Mark notification as viewed
    markNotificationViewed: builder.mutation<Notification, number>({
      query: (id) => ({
        url: `/notifications/${id}/viewed`,
        method: "PATCH",
      }),
      invalidatesTags: ["Notification", "Dashboard"],
    }),

    // Delete notification
    deleteNotification: builder.mutation<void, number>({
      query: (id) => ({
        url: `/notifications/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Notification", "Dashboard"],
    }),
  }),
});

export const {
  useGetNotificationsQuery,
  useMarkNotificationViewedMutation,
  useDeleteNotificationMutation,
} = notificationApi;
