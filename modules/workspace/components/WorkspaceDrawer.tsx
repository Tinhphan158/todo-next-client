"use client";

import WorkspaceForm from "@/modules/workspace/components/WorkspaceForm";
import { WorkspaceFormData } from "@/modules/workspace/schemas/workspace-form-schema";
import AppFormDrawer from "@/modules/shared/components/AppFormDrawer";
import { Workspace } from "@/store/types";

interface WorkspaceDrawerProps {
  open: boolean;
  mode: "create" | "edit";
  selectedWorkspace: Workspace | null;
  isLoading?: boolean;
  onOpenChange?: (open: boolean) => void;
  onSubmit?: (data: WorkspaceFormData) => Promise<void>;
}

const WorkspaceDrawer = ({
  open,
  mode,
  selectedWorkspace,
  isLoading = false,
  onOpenChange,
  onSubmit,
}: WorkspaceDrawerProps) => {
  return (
    <AppFormDrawer<WorkspaceFormData>
      open={open}
      title={mode === "create" ? "Create workspace" : "Edit workspace"}
      mode={mode === "create" ? "create" : "update"}
      formId="workspace-form"
      initialData={
        mode === "edit" && selectedWorkspace
          ? { name: selectedWorkspace.name }
          : { name: "" }
      }
      haveCreateConfirm={false}
      isLoading={isLoading}
      onOpenChange={onOpenChange}
      onSubmit={onSubmit}
      updateConfirmTitle="Are you sure you want to update this workspace?"
    >
      <WorkspaceForm mode={mode} />
    </AppFormDrawer>
  );
};

export default WorkspaceDrawer;
