"use client";

import { FormState } from "@/lib/form";
import { AppButton } from "@/modules/shared/components/AppButton";
import AppConfirmPopover from "@/modules/shared/components/AppConfirmPopover";
import AppDrawer from "@/modules/shared/components/AppDrawer";
import { MESSAGE_TYPE, message } from "@/modules/shared/components/AppMessage";
import {
  useDeleteTaskMutation,
  useUpdateTaskMutation,
} from "@/store/apis/taskApi";
import type { Label, Task } from "@/store/types";
import { useMemo, useState } from "react";
import WorkspaceTaskForm, {
  WorkspaceTaskFormValue,
  taskToFormValue,
} from "./WorkspaceTaskForm";

interface WorkspaceTaskDetailDrawerProps {
  task: Task | null;
  labels: Label[];
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const WorkspaceTaskDetailDrawer = ({
  task,
  labels,
  open,
  onOpenChange,
}: WorkspaceTaskDetailDrawerProps) => {
  const [updateTask, { isLoading: isUpdating }] = useUpdateTaskMutation();
  const [deleteTask, { isLoading: isDeleting }] = useDeleteTaskMutation();
  const formId = "workspace-task-detail-form";
  const initialValue = useMemo<WorkspaceTaskFormValue>(
    () =>
      task
        ? taskToFormValue(task)
        : {
            title: "",
            description: "",
            content: "",
            priority: undefined,
            status: undefined,
            labelIds: [],
            startTime: undefined,
            endTime: undefined,
          },
    [task],
  );
  const [formState, setFormState] = useState<FormState<WorkspaceTaskFormValue>>(
    {
      isDirty: false,
      isValid: false,
      isSubmitting: false,
    },
  );

  const handleUpdate = async (data: WorkspaceTaskFormValue) => {
    if (!task) return;
    try {
      await updateTask({
        id: task.id,
        title: data.title.trim(),
        description: data.description?.trim() || undefined,
        content: data.content.trim(),
        priority: data.priority,
        status: data.status,
        labelIds: data.labelIds.length ? data.labelIds : undefined,
        startTime: data.startTime,
        endTime: data.endTime,
      }).unwrap();
      message({
        type: MESSAGE_TYPE.SUCCESS,
        description: "Task updated successfully.",
      });
      onOpenChange(false);
    } catch {
      message({
        type: MESSAGE_TYPE.ERROR,
        description: "Failed to update task. Please try again.",
      });
    }
  };

  const handleDelete = async () => {
    if (!task) return;
    try {
      await deleteTask(task.id).unwrap();
      message({
        type: MESSAGE_TYPE.SUCCESS,
        description: "Task deleted successfully.",
      });
      onOpenChange(false);
    } catch {
      message({
        type: MESSAGE_TYPE.ERROR,
        description: "Failed to delete task. Please try again.",
      });
    }
  };

  return (
    <AppDrawer
      open={open}
      onOpenChange={onOpenChange}
      title={task ? `Task #${task.id}` : "Task detail"}
      footerAction={
        <div className="flex w-full items-center justify-end gap-3">
          <AppConfirmPopover
            title="Are you sure you want to delete this task?"
            cancelButtonLabel="Cancel"
            confirmButtonLabel="Delete"
            isConfirmLoading={isDeleting}
            closeOnConfirm={false}
            onConfirm={() => {
              void handleDelete();
            }}
            trigger={
              <AppButton type="button" disabled={isUpdating || isDeleting}>
                Delete
              </AppButton>
            }
          />
          <AppButton
            type="button"
            variant="secondary"
            disabled={isUpdating || isDeleting}
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </AppButton>
          <AppButton
            type="submit"
            form={formId}
            isLoading={isUpdating}
            disabled={!formState.isValid || isDeleting}
          >
            Save
          </AppButton>
        </div>
      }
    >
      <WorkspaceTaskForm
        id={formId}
        initialData={initialValue}
        labels={labels}
        onSubmit={handleUpdate}
        onStateChange={setFormState}
      />
    </AppDrawer>
  );
};

export default WorkspaceTaskDetailDrawer;
