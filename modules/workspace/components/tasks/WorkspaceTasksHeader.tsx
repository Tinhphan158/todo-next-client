"use client";

import { AppButton } from "@/modules/shared/components/AppButton";
import AppCheckBox from "@/modules/shared/components/AppCheckbox";
import AppDateInput from "@/modules/shared/components/AppDateInput";
import AppSearchBar from "@/modules/shared/components/AppSearchBar";
import { TASK_PRIORITY_OPTIONS } from "@/modules/workspace/constants";
import type { WorkspaceBoardFilters } from "@/modules/workspace/helpers";
import type { Label, TaskPriority } from "@/store/types";
import { ArrowLeft, Filter, Plus } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";

interface WorkspaceTasksHeaderProps {
  workspaceId: number;
  workspaceName: string;
  labels: Label[];
  filters: WorkspaceBoardFilters;
  onChangeFilters: (next: WorkspaceBoardFilters) => void;
  onCreateTask: () => void;
}

const PRIORITY_TEXT_CLASS: Record<TaskPriority, string> = {
  Low: "text-positive-600",
  Medium: "text-warning-600",
  High: "text-negative-600",
};

const WorkspaceTasksHeader = ({
  workspaceId,
  workspaceName,
  labels,
  filters,
  onChangeFilters,
  onCreateTask,
}: WorkspaceTasksHeaderProps) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const startRange = useMemo(
    () => ({
      start: filters.startTimeFrom
        ? new Date(filters.startTimeFrom)
        : undefined,
      end: filters.startTimeTo ? new Date(filters.startTimeTo) : undefined,
    }),
    [filters.startTimeFrom, filters.startTimeTo],
  );
  const endRange = useMemo(
    () => ({
      start: filters.endTimeFrom ? new Date(filters.endTimeFrom) : undefined,
      end: filters.endTimeTo ? new Date(filters.endTimeTo) : undefined,
    }),
    [filters.endTimeFrom, filters.endTimeTo],
  );

  const togglePriority = (priority: TaskPriority) => {
    const hasPriority = filters.priorities.includes(priority);
    onChangeFilters({
      ...filters,
      priorities: hasPriority
        ? filters.priorities.filter((item) => item !== priority)
        : [...filters.priorities, priority],
    });
  };

  return (
    <div className="bg-base-white flex flex-col gap-3 rounded-lg p-4">
      <div className="mb-4 flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Link
            href={`/workspace/${workspaceId}`}
            className="inline-flex size-9 items-center justify-center rounded-md border border-neutral-200 hover:bg-neutral-50"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <h2 className="heading-5 font-bold text-neutral-950">{`Workspace: ${workspaceName}`}</h2>
        </div>
      </div>

      <div className="flex w-full flex-wrap items-center justify-between gap-2">
        <div className="flex flex-1 items-center gap-2">
          <AppSearchBar
            defaultValue={filters.search ?? ""}
            onSearch={(search) => onChangeFilters({ ...filters, search })}
            placeholder="Search tasks..."
          />
          <AppButton
            type="button"
            variant="secondary"
            startIcon={<Filter />}
            onClick={() => setIsFilterOpen((prev) => !prev)}
          >
            Filter
          </AppButton>
        </div>
        <AppButton type="button" startIcon={<Plus />} onClick={onCreateTask}>
          Create task
        </AppButton>
      </div>

      {isFilterOpen && (
        <div className="grid grid-cols-1 gap-3 rounded-[10px] border border-neutral-100 p-3 lg:grid-cols-2">
          <div className="flex flex-col gap-1">
            <p className="body-s font-medium text-neutral-700">
              Start time range
            </p>
            <AppDateInput
              type="range"
              value={startRange}
              startPlaceholder="DD-MM-YYYY"
              endPlaceholder="DD-MM-YYYY"
              onChange={(next) => {
                const range = next as { start?: Date; end?: Date } | undefined;
                onChangeFilters({
                  ...filters,
                  startTimeFrom: range?.start?.toISOString(),
                  startTimeTo: range?.end?.toISOString(),
                });
              }}
            />
          </div>
          <div className="flex flex-col gap-1">
            <p className="body-s font-medium text-neutral-700">
              End time range
            </p>
            <AppDateInput
              type="range"
              value={endRange}
              startPlaceholder="DD-MM-YYYY"
              endPlaceholder="DD-MM-YYYY"
              onChange={(next) => {
                const range = next as { start?: Date; end?: Date } | undefined;
                onChangeFilters({
                  ...filters,
                  endTimeFrom: range?.start?.toISOString(),
                  endTimeTo: range?.end?.toISOString(),
                });
              }}
            />
          </div>
          <div className="flex flex-col gap-2">
            <p className="body-s font-medium text-neutral-700">Priority</p>
            <div className="flex flex-wrap gap-2">
              {TASK_PRIORITY_OPTIONS.map((priority) => (
                <AppCheckBox
                  key={priority}
                  label={
                    <span className={PRIORITY_TEXT_CLASS[priority]}>
                      {priority}
                    </span>
                  }
                  value={filters.priorities.includes(priority)}
                  onChange={() => togglePriority(priority)}
                />
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <p className="body-s font-medium text-neutral-700">Labels</p>
            <div className="grid grid-cols-2 gap-2">
              {labels.map((label) => {
                const checked = filters.labelIds.includes(label.id);
                return (
                  <AppCheckBox
                    key={label.id}
                    value={checked}
                    label={
                      <span
                        className="caption-s inline-flex items-center rounded-full px-2 py-0.5 font-medium"
                        style={{
                          color: label.color,
                          background: label.background,
                        }}
                      >
                        {label.name}
                      </span>
                    }
                    onChange={() =>
                      onChangeFilters({
                        ...filters,
                        labelIds: checked
                          ? filters.labelIds.filter((id) => id !== label.id)
                          : [...filters.labelIds, label.id],
                      })
                    }
                  />
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WorkspaceTasksHeader;
