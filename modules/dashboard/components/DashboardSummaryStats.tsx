import type { DashboardSummary } from "@/store/types";

interface DashboardSummaryStatsProps {
  summary: DashboardSummary;
}

const DashboardSummaryStats = ({ summary }: DashboardSummaryStatsProps) => {
  const stats = [
    { label: "Total tasks", value: summary.totalTasks },
    { label: "Total workspaces", value: summary.totalWorkspaces },
    { label: "Overdue tasks", value: summary.overdueTasks },
    { label: "Due today", value: summary.dueToday },
    { label: "Unread notifications", value: summary.unreadNotifications },
  ];

  return (
    <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-5">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="bg-base-white flex flex-col gap-1 rounded-lg border border-neutral-100 p-4"
        >
          <p className="caption-s text-neutral-500">{stat.label}</p>
          <p className="heading-5 font-bold text-neutral-950">{stat.value}</p>
        </div>
      ))}
    </div>
  );
};

export default DashboardSummaryStats;
