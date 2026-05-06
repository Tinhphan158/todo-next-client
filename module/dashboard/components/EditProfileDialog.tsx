"use client";

import { AppButton } from "@/module/shared/components/AppButton";
import AppDialog from "@/module/shared/components/AppDialog";
import { useState } from "react";
import EditProfileForm from "./EditProfileForm";
import { EditProfileFormData } from "../schemas/edit-profile-schema";

interface CurrentProfile {
  name: string;
  email: string;
  avatar: string | null;
}

interface EditProfileDialogProps {
  currentProfile: CurrentProfile;
  isSubmitting: boolean;
  onSubmit: (data: EditProfileFormData) => Promise<boolean>;
}

const EditProfileDialog = ({
  currentProfile,
  isSubmitting,
  onSubmit,
}: EditProfileDialogProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleSubmit = async (data: EditProfileFormData) => {
    const isSuccess = await onSubmit(data);
    if (isSuccess) {
      setIsDialogOpen(false);
    }
  };

  return (
    <AppDialog
      open={isDialogOpen}
      onOpenChange={setIsDialogOpen}
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
          onCancel={() => setIsDialogOpen(false)}
        />
      }
    />
  );
};

export default EditProfileDialog;
