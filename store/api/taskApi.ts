import { baseApi } from "../axios/baseApi";
import type { Task, TaskPriority } from "../types";

interface CreateTaskBody {
  title: string;
  content: string;
  statusId: number;
  workspaceId: number;
  description?: string;
  priority?: TaskPriority;
  startTime?: string;
  endTime?: string;
  labelIds?: number[];
}

interface UpdateTaskBody {
  id: number;
  title?: string;
  content?: string;
  description?: string;
  priority?: TaskPriority;
  statusId?: number;
  workspaceId?: number;
  startTime?: string;
  endTime?: string;
  labelIds?: number[];
}

export const taskApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getTasks: builder.query<Task[], void>({
      query: () => ({ url: "/task" }),
      providesTags: (result) =>
        result
          ? [...result.map(({ id }) => ({ type: "Task" as const, id })), "Task"]
          : ["Task"],
    }),

    getTaskById: builder.query<Task, number>({
      query: (id) => ({ url: `/task/${id}` }),
      providesTags: (_result, _error, id) => [{ type: "Task", id }],
    }),

    getTasksByStatus: builder.query<Task[], number>({
      query: (statusId) => ({ url: `/task/status/${statusId}/list` }),
      providesTags: ["Task"],
    }),

    searchTasks: builder.query<Task[], { q: string; workspaceId?: number }>({
      query: (params) => ({ url: "/task/search/query", params }),
      providesTags: ["Task"],
    }),

    createTask: builder.mutation<Task, CreateTaskBody>({
      query: (body) => ({
        url: "/task",
        method: "POST",
        data: { ...body, accountId: 0 },
      }),
      invalidatesTags: ["Task", "Dashboard"],
    }),

    updateTask: builder.mutation<Task, UpdateTaskBody>({
      query: ({ id, ...body }) => ({
        url: `/task/${id}`,
        method: "PATCH",
        data: body,
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: "Task", id },
        "Dashboard",
      ],
    }),

    deleteTask: builder.mutation<Task, number>({
      query: (id) => ({
        url: `/task/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Task", "Dashboard"],
    }),
  }),
});

export const {
  useGetTasksQuery,
  useGetTaskByIdQuery,
  useGetTasksByStatusQuery,
  useSearchTasksQuery,
  useCreateTaskMutation,
  useUpdateTaskMutation,
  useDeleteTaskMutation,
} = taskApi;
