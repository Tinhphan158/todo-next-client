"use client";

import { AppButton } from "@/modules/shared/components/AppButton";
import AppDrawer from "@/modules/shared/components/AppDrawer";
import { MESSAGE_TYPE, message } from "@/modules/shared/components/AppMessage";
import { FormState } from "@/lib/form";
import { useCreateTaskMutation } from "@/store/apis/taskApi";
import type { Label } from "@/store/types";
import { useMemo, useState } from "react";
import WorkspaceTaskForm, { WorkspaceTaskFormValue } from "./WorkspaceTaskForm";

interface WorkspaceTaskCreateDrawerProps {
  open: boolean;
  workspaceId: number;
  labels: Label[];
  onOpenChange: (open: boolean) => void;
}

const WorkspaceTaskCreateDrawer = ({
  open,
  workspaceId,
  labels,
  onOpenChange,
}: WorkspaceTaskCreateDrawerProps) => {
  const [createTask, { isLoading }] = useCreateTaskMutation();
  const formId = "workspace-task-create-form";
  const initialValue = useMemo<WorkspaceTaskFormValue>(
    () => ({
      title: "",
      description: "",
      content: "",
      priority: undefined,
      status: "TODO",
      labelIds: [],
      startTime: undefined,
      endTime: undefined,
    }),
    [],
  );
  const [formState, setFormState] = useState<FormState<WorkspaceTaskFormValue>>({
    isDirty: false,
    isValid: false,
    isSubmitting: false,
  });

  const handleSubmit = async (data: WorkspaceTaskFormValue) => {
    try {
      await createTask({
        title: data.title.trim(),
        description: data.description?.trim() || undefined,
        content: data.content.trim(),
        workspaceId,
        status: data.status ?? "TODO",
        priority: data.priority,
        startTime: data.startTime,
        endTime: data.endTime,
        labelIds: data.labelIds.length ? data.labelIds : undefined,
      }).unwrap();
      message({
        type: MESSAGE_TYPE.SUCCESS,
        description: "Task created successfully.",
      });
      onOpenChange(false);
    } catch {
      message({
        type: MESSAGE_TYPE.ERROR,
        description: "Failed to create task. Please try again.",
      });
    }
  };

  return (
    <AppDrawer
      open={open}
      onOpenChange={onOpenChange}
      title="Create task"
      footerAction={
        <div className="flex w-full items-center justify-end gap-3">
          <AppButton
            type="button"
            variant="secondary"
            onClick={() => onOpenChange(false)}
            disabled={isLoading}
          >
            Cancel
          </AppButton>
          <AppButton
            type="submit"
            form={formId}
            isLoading={isLoading}
            disabled={!formState.isValid || isLoading}
          >
            Create task
          </AppButton>
        </div>
      }
    >
      <WorkspaceTaskForm
        id={formId}
        initialData={initialValue}
        labels={labels}
        onSubmit={handleSubmit}
        onStateChange={setFormState}
      />
    </AppDrawer>
  );
};

export default WorkspaceTaskCreateDrawer;
