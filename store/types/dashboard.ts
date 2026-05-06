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
