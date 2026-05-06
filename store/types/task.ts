import type { Label } from "./label";
import type { Notification } from "./notification";
import type { Workspace } from "./workspace";

export type TaskPriority = "Low" | "Medium" | "High";
export type TaskStatus = "PENDING" | "TODO" | "DONE" | "CANCEL";

export interface Task {
  id: number;
  title: string;
  description: string | null;
  content: string;
  priority: TaskPriority | null;
  workspaceId: number;
  accountId: number;
  startTime: string | null;
  endTime: string | null;
  completedAt: string | null;
  createdAt: string;
  updatedAt: string;
  status?: TaskStatus;
  workspace?: Workspace;
  labels?: Label[];
  notifications?: Notification[];
}

export interface BoardColumn {
  status: TaskStatus;
  tasks: Task[];
}

export interface BoardResponse {
  columns: BoardColumn[];
}
