import { cn } from "@/lib/utils";
import type { DashboardSummary, TaskStatus } from "@/store/types";

interface DashboardStatusChartProps {
  summary: DashboardSummary;
}

const STATUS_LABEL: Record<TaskStatus, string> = {
  TODO: "To Do",
  PENDING: "In Progress",
  DONE: "Done",
  CANCEL: "Canceled",
};

const STATUS_BAR_CLASS: Record<TaskStatus, string> = {
  TODO: "bg-blue-500",
  PENDING: "bg-warning-500",
  DONE: "bg-positive-500",
  CANCEL: "bg-negative-500",
};

const DashboardStatusChart = ({ summary }: DashboardStatusChartProps) => {
  const byStatusMap = new Map<TaskStatus, number>(
    summary.byStatus.map((item) => [item.status, item._count._all]),
  );

  const statusRows: Array<{ status: TaskStatus; count: number }> = [
    { status: "TODO", count: byStatusMap.get("TODO") ?? 0 },
    { status: "PENDING", count: byStatusMap.get("PENDING") ?? 0 },
    { status: "DONE", count: byStatusMap.get("DONE") ?? 0 },
    { status: "CANCEL", count: byStatusMap.get("CANCEL") ?? 0 },
  ];

  const maxCount = Math.max(...statusRows.map((row) => row.count), 1);

  return (
    <div className="bg-base-white rounded-lg border border-neutral-100 p-4">
      <h3 className="body-l mb-4 font-semibold text-neutral-950">Tasks by status</h3>
      <div className="flex flex-col gap-3">
        {statusRows.map((row) => {
          const widthPercent = Math.max((row.count / maxCount) * 100, row.count ? 8 : 0);
          return (
            <div key={row.status} className="grid grid-cols-[120px_1fr_48px] items-center gap-3">
              <span className="body-s text-neutral-700">{STATUS_LABEL[row.status]}</span>
              <div className="h-2 rounded-full bg-neutral-100">
                <div
                  className={cn("h-2 rounded-full", STATUS_BAR_CLASS[row.status])}
                  style={{ width: `${widthPercent}%` }}
                />
              </div>
              <span className="body-s text-right font-semibold text-neutral-950">
                {row.count}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DashboardStatusChart;
