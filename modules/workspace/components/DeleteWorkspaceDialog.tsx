"use client";

import { AppButton } from "@/modules/shared/components/AppButton";
import AppDialog from "@/modules/shared/components/AppDialog";
import { Workspace } from "@/store/types";

interface DeleteWorkspaceDialogProps {
  open: boolean;
  workspace: Workspace | null;
  isLoading?: boolean;
  onOpenChange?: (open: boolean) => void;
  onCancel?: () => void;
  onConfirm?: () => void;
}

const DeleteWorkspaceDialog = ({
  open,
  workspace,
  isLoading = false,
  onOpenChange,
  onCancel,
  onConfirm,
}: DeleteWorkspaceDialogProps) => {
  return (
    <AppDialog
      open={open}
      onOpenChange={onOpenChange}
      title="Delete workspace"
      description={`Are you sure you want to delete "${workspace?.name ?? ""}"? All tasks in this workspace will be removed.`}
      content={
        <div className="flex justify-end gap-2">
          <AppButton
            type="button"
            variant="secondary"
            onClick={onCancel}
            disabled={isLoading}
          >
            Cancel
          </AppButton>
          <AppButton type="button" onClick={onConfirm} isLoading={isLoading}>
            Delete
          </AppButton>
        </div>
      }
    />
  );
};

export default DeleteWorkspaceDialog;
