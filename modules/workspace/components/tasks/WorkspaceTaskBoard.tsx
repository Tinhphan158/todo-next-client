"use client";

import { cn } from "@/lib/utils";
import {
  TASK_STATUS_LABEL,
  TASK_STATUS_ORDER,
} from "@/modules/workspace/constants";
import type { BoardResponse, Task, TaskStatus } from "@/store/types";
import { ReactNode } from "react";
import WorkspaceTaskCard from "./WorkspaceTaskCard";

interface WorkspaceTaskBoardProps {
  board?: BoardResponse;
  movingTaskId?: number;
  onTaskClick?: (task: Task) => void;
  onDropToStatus?: (task: Task, nextStatus: TaskStatus) => void;
}

const STATUS_TEXT_CLASS: Record<TaskStatus, string> = {
  TODO: "text-blue-600",
  PENDING: "text-warning-600",
  DONE: "text-positive-600",
  CANCEL: "text-negative-600",
};

const WorkspaceTaskBoard = ({
  board,
  movingTaskId,
  onTaskClick,
  onDropToStatus,
}: WorkspaceTaskBoardProps) => {
  const taskByStatus = new Map<TaskStatus, Task[]>(
    (board?.columns ?? []).map((column) => [column.status, column.tasks]),
  );

  return (
    <div className="grid min-h-[65vh] grid-cols-1 gap-4 lg:grid-cols-4">
      {TASK_STATUS_ORDER.map((status) => (
        <TaskColumn
          key={status}
          title={
            <span className={STATUS_TEXT_CLASS[status]}>
              {TASK_STATUS_LABEL[status]}
            </span>
          }
          status={status}
          tasks={taskByStatus.get(status) ?? []}
          movingTaskId={movingTaskId}
          onTaskClick={onTaskClick}
          onDropToStatus={onDropToStatus}
        />
      ))}
    </div>
  );
};

const TaskColumn = ({
  title,
  status,
  tasks,
  movingTaskId,
  onTaskClick,
  onDropToStatus,
}: {
  title: ReactNode;
  status: TaskStatus;
  tasks: Task[];
  movingTaskId?: number;
  onTaskClick?: (task: Task) => void;
  onDropToStatus?: (task: Task, nextStatus: TaskStatus) => void;
}) => {
  return (
    <div
      className={cn(
        "flex min-h-[320px] flex-col gap-3 rounded-[12px] border border-neutral-100 bg-neutral-50 p-3",
        movingTaskId && "border-dashed",
      )}
      onDragOver={(event) => event.preventDefault()}
      onDrop={(event) => {
        const serializedTask = event.dataTransfer.getData("text/plain");
        if (!serializedTask) return;
        try {
          const task = JSON.parse(serializedTask) as Task;
          onDropToStatus?.(task, status);
        } catch {
          // Ignore malformed drag payload.
        }
      }}
    >
      <div className="flex items-center justify-between">
        <p className="body-m font-bold text-neutral-950">{title}</p>
        <span className="caption-s rounded-full bg-neutral-200 px-2 py-0.5 font-semibold text-neutral-950">
          {tasks.length}
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-2">
        {tasks.map((task) => (
          <WorkspaceTaskCard
            key={task.id}
            task={task}
            onClick={onTaskClick}
            onDragStart={(dragTask, event) => {
              const transfer = JSON.stringify(dragTask);
              event.dataTransfer.setData("text/plain", transfer);
            }}
          />
        ))}
        {!tasks.length && (
          <div className="body-s bg-base-white flex flex-1 items-center justify-center rounded-[10px] border border-dashed border-neutral-200 p-4 text-neutral-400">
            Drop here
          </div>
        )}
      </div>
    </div>
  );
};

export default WorkspaceTaskBoard;
