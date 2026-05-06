import type { Label } from "./label";
import type { Notification } from "./notification";
import type { Status } from "./status";
import type { Workspace } from "./workspace";

export type TaskPriority = "Low" | "Medium" | "High";

export interface Task {
  id: number;
  title: string;
  description: string | null;
  content: string;
  priority: TaskPriority | null;
  statusId: number;
  workspaceId: number;
  accountId: number;
  startTime: string | null;
  endTime: string | null;
  completedAt: string | null;
  createdAt: string;
  updatedAt: string;
  status?: Status;
  workspace?: Workspace;
  labels?: Label[];
  notifications?: Notification[];
}

export interface BoardColumn {
  status: Status;
  tasks: Task[];
}

export interface BoardResponse {
  columns: BoardColumn[];
}
