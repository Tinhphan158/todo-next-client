import type { TaskPriority, TaskStatus } from "@/store/types";

export const TASK_STATUS_ORDER: TaskStatus[] = [
  "TODO",
  "PENDING",
  "DONE",
  "CANCEL",
];

export const TASK_STATUS_OPTIONS: TaskStatus[] = [...TASK_STATUS_ORDER];

export const TASK_STATUS_LABEL: Record<TaskStatus, string> = {
  TODO: "To Do",
  PENDING: "In Progress",
  DONE: "Done",
  CANCEL: "Cancelled",
};

export const TASK_PRIORITY_OPTIONS: TaskPriority[] = ["Low", "Medium", "High"];
