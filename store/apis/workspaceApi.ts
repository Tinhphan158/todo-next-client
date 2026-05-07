import { baseApi } from "../axios/baseApi";
import type {
  BoardResponse,
  PaginatedResponse,
  Task,
  TaskPriority,
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
  priorities?: TaskPriority[];
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
  priorities?: TaskPriority[];
}

/** Nest expects repeated keys (e.g. labelIds=1&labelIds=2), not bracket notation. */
function workspaceTasksQueryToSearchParams(
  params: Omit<WorkspaceTasksParams, "workspaceId">,
): URLSearchParams {
  const usp = new URLSearchParams();
  const {
    page,
    pageSize,
    search,
    labelIds,
    startTimeFrom,
    startTimeTo,
    endTimeFrom,
    endTimeTo,
    priorities,
  } = params;
  if (page != null) usp.set("page", String(page));
  if (pageSize != null) usp.set("pageSize", String(pageSize));
  if (search) usp.set("search", search);
  labelIds?.forEach((id) => usp.append("labelIds", String(id)));
  if (startTimeFrom) usp.set("startTimeFrom", startTimeFrom);
  if (startTimeTo) usp.set("startTimeTo", startTimeTo);
  if (endTimeFrom) usp.set("endTimeFrom", endTimeFrom);
  if (endTimeTo) usp.set("endTimeTo", endTimeTo);
  priorities?.forEach((p) => usp.append("priorities", p));
  return usp;
}

function workspaceBoardQueryToSearchParams(
  params: Omit<BoardQueryParams, "workspaceId">,
): URLSearchParams {
  const usp = new URLSearchParams();
  const {
    search,
    labelIds,
    startTimeFrom,
    startTimeTo,
    endTimeFrom,
    endTimeTo,
    priorities,
  } = params;
  if (search) usp.set("search", search);
  labelIds?.forEach((id) => usp.append("labelIds", String(id)));
  if (startTimeFrom) usp.set("startTimeFrom", startTimeFrom);
  if (startTimeTo) usp.set("startTimeTo", startTimeTo);
  if (endTimeFrom) usp.set("endTimeFrom", endTimeFrom);
  if (endTimeTo) usp.set("endTimeTo", endTimeTo);
  priorities?.forEach((p) => usp.append("priorities", p));
  return usp;
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
        params: workspaceBoardQueryToSearchParams(params),
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
        params: workspaceTasksQueryToSearchParams(params),
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
