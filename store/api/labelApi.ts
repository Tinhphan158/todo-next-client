import { baseApi } from "../axios/baseApi";
import type { Label, PaginatedResponse } from "../types";

interface GetLabelsParams {
  page?: number;
  pageSize?: 10 | 50 | 100;
  search?: string;
}

export const labelApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getLabels: builder.query<PaginatedResponse<Label>, GetLabelsParams>({
      query: (params) => ({ url: "/labels", params }),
      providesTags: (result) =>
        result
          ? [
              ...result.data.map(({ id }) => ({
                type: "Label" as const,
                id,
              })),
              "Label",
            ]
          : ["Label"],
    }),

    createLabel: builder.mutation<Label, { name: string; color: string }>({
      query: (body) => ({
        url: "/labels",
        method: "POST",
        data: body,
      }),
      invalidatesTags: ["Label"],
    }),

    updateLabel: builder.mutation<
      Label,
      { id: number; name?: string; color?: string }
    >({
      query: ({ id, ...body }) => ({
        url: `/labels/${id}`,
        method: "PATCH",
        data: body,
      }),
      invalidatesTags: (_result, _error, { id }) => [{ type: "Label", id }],
    }),

    deleteLabel: builder.mutation<void, number>({
      query: (id) => ({
        url: `/labels/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Label"],
    }),
  }),
});

export const {
  useGetLabelsQuery,
  useCreateLabelMutation,
  useUpdateLabelMutation,
  useDeleteLabelMutation,
} = labelApi;
