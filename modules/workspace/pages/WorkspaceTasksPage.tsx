"use client";

import { MESSAGE_TYPE, message } from "@/modules/shared/components/AppMessage";
import WorkspaceTaskBoard from "@/modules/workspace/components/tasks/WorkspaceTaskBoard";
import WorkspaceTaskCreateDrawer from "@/modules/workspace/components/tasks/WorkspaceTaskCreateDrawer";
import WorkspaceTaskDetailDrawer from "@/modules/workspace/components/tasks/WorkspaceTaskDetailDrawer";
import WorkspaceTasksHeader from "@/modules/workspace/components/tasks/WorkspaceTasksHeader";
import {
  parseWorkspaceBoardFilters,
  workspaceBoardFiltersToSearchParams,
} from "@/modules/workspace/helpers";
import { useUpdateTaskMutation } from "@/store/apis/taskApi";
import { useGetLabelsQuery } from "@/store/apis/labelApi";
import {
  useGetWorkspaceBoardQuery,
  useGetWorkspacesQuery,
} from "@/store/apis/workspaceApi";
import type { Task, TaskStatus } from "@/store/types";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";

const WorkspaceTasksPage = () => {
  const params = useParams<{ workspaceId: string }>();
  const searchParams = useSearchParams();
  const router = useRouter();
  const workspaceId = Number(params.workspaceId);

  const [isCreateDrawerOpen, setIsCreateDrawerOpen] = useState(false);
  const [movingTaskId, setMovingTaskId] = useState<number>();
  const [updateTask] = useUpdateTaskMutation();

  const filters = useMemo(
    () =>
      parseWorkspaceBoardFilters(
        new URLSearchParams(searchParams ? searchParams.toString() : ""),
      ),
    [searchParams],
  );
  const currentTaskId = Number(searchParams.get("taskId"));

  const { data: boardData } = useGetWorkspaceBoardQuery(
    { workspaceId, ...filters },
    { skip: !workspaceId },
  );
  const { data: labelsResponse } = useGetLabelsQuery({ page: 1, pageSize: 100 });
  const labels = labelsResponse?.data ?? [];
  const { data: workspaces = [] } = useGetWorkspacesQuery();
  const workspace = workspaces.find((item) => item.id === workspaceId);
  const activeTask =
    boardData?.columns
      .flatMap((column) => column.tasks)
      .find((task) => task.id === currentTaskId) ?? null;

  const updateUrl = (nextTaskId?: number, nextFilters = filters) => {
    const usp = workspaceBoardFiltersToSearchParams(nextFilters);
    if (nextTaskId) usp.set("taskId", String(nextTaskId));
    const query = usp.toString();
    router.replace(
      query ? `/workspace/${workspaceId}/tasks?${query}` : `/workspace/${workspaceId}/tasks`,
      { scroll: false },
    );
  };

  const handleDropToStatus = async (task: Task, nextStatus: TaskStatus) => {
    if (!task.id || task.status === nextStatus) return;
    setMovingTaskId(task.id);
    try {
      await updateTask({ id: task.id, status: nextStatus }).unwrap();
    } catch {
      message({
        type: MESSAGE_TYPE.ERROR,
        description: "Failed to move task. Please try again.",
      });
    } finally {
      setMovingTaskId(undefined);
    }
  };

  return (
    <div className="bg-base-white flex flex-col gap-4 rounded-lg p-4">
      <WorkspaceTasksHeader
        workspaceId={workspaceId}
        workspaceName={workspace?.name ?? "Workspace tasks"}
        labels={labels}
        filters={filters}
        onChangeFilters={(nextFilters) => updateUrl(undefined, nextFilters)}
        onCreateTask={() => setIsCreateDrawerOpen(true)}
      />
      <WorkspaceTaskBoard
        board={boardData}
        movingTaskId={movingTaskId}
        onTaskClick={(task) => updateUrl(task.id)}
        onDropToStatus={handleDropToStatus}
      />

      <WorkspaceTaskCreateDrawer
        open={isCreateDrawerOpen}
        workspaceId={workspaceId}
        labels={labels}
        onOpenChange={setIsCreateDrawerOpen}
      />
      <WorkspaceTaskDetailDrawer
        open={Boolean(activeTask)}
        task={activeTask}
        labels={labels}
        onOpenChange={(open) => {
          if (!open) updateUrl(undefined, filters);
        }}
      />
    </div>
  );
};

export default WorkspaceTasksPage;
