"use client";

import { AppButton } from "@/module/shared/components/AppButton";
import AppDialog from "@/module/shared/components/AppDialog";
import { ChangePasswordFormData } from "../schemas/change-password-schema";
import ChangePasswordForm from "./ChangePasswordForm";

interface ChangePasswordDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  isSubmitting: boolean;
  onSubmit: (data: ChangePasswordFormData) => Promise<void>;
}

const ChangePasswordDialog = ({
  open,
  onOpenChange,
  isSubmitting,
  onSubmit,
}: ChangePasswordDialogProps) => {
  const handleSubmit = async (data: ChangePasswordFormData) => {
    await onSubmit(data);
  };

  return (
    <AppDialog
      open={open}
      onOpenChange={onOpenChange}
      title="Change password"
      description="Enter your current password and choose a new one."
      trigger={
        <AppButton variant="secondary" size="m" type="button">
          Change password
        </AppButton>
      }
      content={
        <ChangePasswordForm
          isSubmitting={isSubmitting}
          onSubmit={handleSubmit}
          onCancel={() => onOpenChange(false)}
        />
      }
    />
  );
};

export default ChangePasswordDialog;
