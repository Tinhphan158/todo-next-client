import { baseApi } from "../axios/baseApi";
import type { Status } from "../types";

export const statusApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getStatuses: builder.query<Status[], void>({
      query: () => ({ url: "/statuses" }),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Status" as const, id })),
              "Status",
            ]
          : ["Status"],
    }),

    createStatus: builder.mutation<Status, { name: string }>({
      query: (body) => ({
        url: "/statuses",
        method: "POST",
        data: body,
      }),
      invalidatesTags: ["Status"],
    }),

    updateStatus: builder.mutation<Status, { id: number; name: string }>({
      query: ({ id, ...body }) => ({
        url: `/statuses/${id}`,
        method: "PATCH",
        data: body,
      }),
      invalidatesTags: (_result, _error, { id }) => [{ type: "Status", id }],
    }),

    deleteStatus: builder.mutation<Status, number>({
      query: (id) => ({
        url: `/statuses/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Status"],
    }),
  }),
});

export const {
  useGetStatusesQuery,
  useCreateStatusMutation,
  useUpdateStatusMutation,
  useDeleteStatusMutation,
} = statusApi;
