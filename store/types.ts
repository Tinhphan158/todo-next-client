export type OtpPurpose = "SIGNUP" | "RESET_PASSWORD";

export interface Account {
  id: number;
  name: string;
  email: string;
  avatar: string | null;
  createdAt: string;
  updatedAt?: string;
}

export interface LoginResponse {
  id: number;
  name: string;
  email: string;
  avatar: string | null;
  accessToken: string;
  refreshToken: string;
}

export interface TokenResponse {
  accessToken: string;
  refreshToken: string;
}

export interface Status {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface Workspace {
  id: number;
  name: string;
  accountId: number;
  createdAt: string;
  updatedAt: string;
}

export interface Label {
  id: number;
  name: string;
  color: string;
  accountId: number;
}

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

export interface Notification {
  id: number;
  title: string;
  description: string;
  taskId: number | null;
  accountId: number;
  time: string;
  viewed: boolean;
  type: string;
}

export interface PaginationMeta {
  page: number;
  pageSize: number;
  totalPage: number;
  total: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  metadata: PaginationMeta;
}

export interface DashboardSummary {
  totalTasks: number;
  totalWorkspaces: number;
  overdueTasks: number;
  dueToday: number;
  unreadNotifications: number;
  byStatus: Array<{
    statusId: number;
    _count: { _all: number };
  }>;
}

export interface CloudinaryUploadResponse {
  publicId: string;
  url: string;
  width: number;
  height: number;
  format: string;
}

export interface MessageResponse {
  message: string;
}
