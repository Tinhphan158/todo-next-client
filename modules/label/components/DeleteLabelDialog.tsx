"use client";

import { AppButton } from "@/modules/shared/components/AppButton";
import AppDialog from "@/modules/shared/components/AppDialog";
import { Label } from "@/store/types";

interface DeleteLabelDialogProps {
  open: boolean;
  label: Label | null;
  isLoading?: boolean;
  onOpenChange?: (open: boolean) => void;
  onCancel?: () => void;
  onConfirm?: () => void;
}

const DeleteLabelDialog = ({
  open,
  label,
  isLoading = false,
  onOpenChange,
  onCancel,
  onConfirm,
}: DeleteLabelDialogProps) => {
  return (
    <AppDialog
      open={open}
      onOpenChange={onOpenChange}
      title="Delete label"
      description={`Are you sure you want to delete "${label?.name ?? ""}"?`}
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

export default DeleteLabelDialog;
