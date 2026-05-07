import { baseApi } from "../axios/baseApi";
import type {
  BoardResponse,
  PaginatedResponse,
  Task,
  Workspace,
} from "../types";

interface BoardQueryParams {
  workspaceId: number;
  search?: string;
  labelIds?: number[];
  startTimeFrom?: string;
  startTimeTo?: string;
  endTimeFrom?: string;
  endTimeTo?: string;
  priorities?: Array<"Low" | "Medium" | "High">;
}

interface WorkspaceTasksParams {
  workspaceId: number;
  page?: number;
  pageSize?: 10 | 50 | 100;
  search?: string;
  labelIds?: number[];
  startTimeFrom?: string;
  startTimeTo?: string;
  endTimeFrom?: string;
  endTimeTo?: string;
  priorities?: Array<"Low" | "Medium" | "High">;
}

export const workspaceApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get workspaces
    getWorkspaces: builder.query<Workspace[], void>({
      query: () => ({ url: "/workspaces" }),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Workspace" as const, id })),
              "Workspace",
            ]
          : ["Workspace"],
    }),

    // Create workspace
    createWorkspace: builder.mutation<Workspace, { name: string }>({
      query: (body) => ({
        url: "/workspaces",
        method: "POST",
        data: { ...body, accountId: 0 },
      }),
      invalidatesTags: ["Workspace", "Dashboard"],
    }),

    // Update workspace
    updateWorkspace: builder.mutation<Workspace, { id: number; name: string }>({
      query: ({ id, ...body }) => ({
        url: `/workspaces/${id}`,
        method: "PATCH",
        data: body,
      }),
      invalidatesTags: (_result, _error, { id }) => [{ type: "Workspace", id }],
    }),

    // Delete workspace
    deleteWorkspace: builder.mutation<Workspace, number>({
      query: (id) => ({
        url: `/workspaces/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Workspace", "Task", "Dashboard"],
    }),

    // Get workspace board
    getWorkspaceBoard: builder.query<BoardResponse, BoardQueryParams>({
      query: ({ workspaceId, ...params }) => ({
        url: `/workspaces/${workspaceId}/tasks/board`,
        params,
      }),
      providesTags: ["Task"],
    }),

    // Get workspace tasks
    getWorkspaceTasks: builder.query<
      PaginatedResponse<Task>,
      WorkspaceTasksParams
    >({
      query: ({ workspaceId, ...params }) => ({
        url: `/workspaces/${workspaceId}/tasks`,
        params,
      }),
      providesTags: ["Task"],
    }),
  }),
});

export const {
  useGetWorkspacesQuery,
  useCreateWorkspaceMutation,
  useUpdateWorkspaceMutation,
  useDeleteWorkspaceMutation,
  useGetWorkspaceBoardQuery,
  useGetWorkspaceTasksQuery,
} = workspaceApi;
