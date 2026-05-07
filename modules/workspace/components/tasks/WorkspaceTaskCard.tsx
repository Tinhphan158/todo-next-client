"use client";

import { cn } from "@/lib/utils";
import type { Task } from "@/store/types";
import { CalendarIcon } from "lucide-react";
import type { DragEvent } from "react";

interface WorkspaceTaskCardProps {
  task: Task;
  onClick?: (task: Task) => void;
  onDragStart?: (task: Task, event: DragEvent<HTMLButtonElement>) => void;
}

const priorityClassName: Record<string, string> = {
  Low: "text-positive-600",
  Medium: "text-warning-600",
  High: "text-negative-600",
};

const formatDate = (iso?: string | null) => {
  if (!iso) return "--";
  return new Date(iso).toLocaleDateString();
};

const WorkspaceTaskCard = ({
  task,
  onClick,
  onDragStart,
}: WorkspaceTaskCardProps) => {
  return (
    <button
      type="button"
      draggable
      onDragStart={(event) => onDragStart?.(task, event)}
      onClick={() => onClick?.(task)}
      className="bg-base-white flex w-full flex-col gap-2 rounded-[10px] border border-neutral-200 p-3 text-left shadow-xs transition hover:border-neutral-950"
    >
      <div className="flex items-center justify-between">
        <p className="caption-s text-neutral-400">#{task.id}</p>
        {task.priority && (
          <span
            className={cn(
              "caption-s font-bold",
              priorityClassName[task.priority],
            )}
          >
            {task.priority}
          </span>
        )}
      </div>
      <p className="body-m line-clamp-2 font-semibold text-neutral-950">
        {task.title}
      </p>
      <div className="flex flex-wrap gap-2">
        {task.labels?.map((label) => (
          <span
            key={label.id}
            className="caption-s rounded-full px-2 py-0.5 font-semibold"
            style={{
              color: label.color,
              background: label.background,
            }}
          >
            {label.name}
          </span>
        ))}
      </div>
      <div className="flex gap-2">
        <CalendarIcon className="h-4 w-4 text-neutral-400" />
        <p className="caption-s text-neutral-400">
          {`${formatDate(task.startTime)} - ${formatDate(task.endTime)}`}
        </p>
      </div>
    </button>
  );
};

export default WorkspaceTaskCard;
