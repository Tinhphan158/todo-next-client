import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "./axiosBaseQuery";

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: axiosBaseQuery,
  tagTypes: [
    "Auth",
    "Profile",
    "Status",
    "Workspace",
    "Task",
    "Label",
    "Dashboard",
    "Notification",
  ],
  endpoints: () => ({}),
});
