import { TaskStatus } from "./task";

export interface DashboardSummary {
  totalTasks: number;
  totalWorkspaces: number;
  overdueTasks: number;
  dueToday: number;
  unreadNotifications: number;
  byStatus: Array<{
    status: TaskStatus;
    _count: { _all: number };
  }>;
}
