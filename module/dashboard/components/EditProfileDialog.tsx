"use client";

import { AppButton } from "@/module/shared/components/AppButton";
import AppDialog from "@/module/shared/components/AppDialog";
import { EditProfileFormData } from "../schemas/edit-profile-schema";
import EditProfileForm from "./EditProfileForm";

interface CurrentProfile {
  name: string;
  email: string;
  avatar: string | null;
}

interface EditProfileDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentProfile: CurrentProfile;
  isSubmitting: boolean;
  onSubmit: (data: EditProfileFormData) => Promise<void>;
}

const EditProfileDialog = ({
  open,
  onOpenChange,
  currentProfile,
  isSubmitting,
  onSubmit,
}: EditProfileDialogProps) => {
  const handleSubmit = async (data: EditProfileFormData) => {
    await onSubmit(data);
  };

  return (
    <AppDialog
      open={open}
      onOpenChange={onOpenChange}
      title="Edit profile"
      description="Update your avatar, display name, and email."
      trigger={
        <AppButton variant="secondary" size="m" type="button">
          Edit profile
        </AppButton>
      }
      content={
        <EditProfileForm
          currentProfile={currentProfile}
          isSubmitting={isSubmitting}
          onSubmit={handleSubmit}
          onCancel={() => onOpenChange(false)}
        />
      }
    />
  );
};

export default EditProfileDialog;
