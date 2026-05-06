"use client";

import { Form } from "@/components/ui/form";
import { AppButton } from "@/modules/shared/components/AppButton";
import { FormFileUploadField } from "@/modules/shared/components/AppFormFileUpload";
import { FormInputFieldV2 } from "@/modules/shared/components/AppFormInput";
import { MailIcon, UserIcon } from "@/modules/shared/icons";
import { standardSchemaResolver } from "@hookform/resolvers/standard-schema";
import Image from "next/image";
import { useEffect, useMemo } from "react";
import { useForm, useWatch } from "react-hook-form";
import {
  EditProfileFormData,
  editProfileSchema,
} from "../schemas/edit-profile-schema";

interface CurrentProfile {
  name: string;
  email: string;
  avatar: string | null;
}

interface EditProfileFormProps {
  currentProfile: CurrentProfile;
  isSubmitting: boolean;
  onSubmit: (data: EditProfileFormData) => Promise<void>;
  onCancel: () => void;
}

const EditProfileForm = ({
  currentProfile,
  isSubmitting,
  onSubmit,
  onCancel,
}: EditProfileFormProps) => {
  const form = useForm<EditProfileFormData>({
    resolver: standardSchemaResolver(editProfileSchema),
    defaultValues: {
      name: currentProfile.name,
      email: currentProfile.email,
      avatarFile: undefined,
    },
    mode: "onChange",
  });

  useEffect(() => {
    form.reset({
      name: currentProfile.name,
      email: currentProfile.email,
      avatarFile: undefined,
    });
  }, [currentProfile, form]);

  const avatarFile = useWatch({
    control: form.control,
    name: "avatarFile",
  });

  const avatarPreview = useMemo(
    () => (avatarFile ? URL.createObjectURL(avatarFile) : currentProfile.avatar),
    [avatarFile, currentProfile.avatar],
  );

  useEffect(() => {
    if (!avatarPreview?.startsWith("blob:")) return;
    return () => URL.revokeObjectURL(avatarPreview);
  }, [avatarPreview]);

  return (
    <Form {...form}>
      <form
        className="flex w-full flex-col gap-4 pb-6"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="flex items-center gap-3">
          <Image
            src={avatarPreview || "/images/avatar-default.png"}
            alt="avatar preview"
            width={64}
            height={64}
            className="rounded-full object-cover"
          />
          <div className="flex-1">
            <FormFileUploadField
              control={form.control}
              name="avatarFile"
              accept="image/*"
              placeholer="Upload a profile photo"
              uploadButtonLabel="Upload"
              changeButtonLabel="Change"
            />
          </div>
        </div>

        <FormInputFieldV2
          control={form.control}
          name="name"
          label="Name"
          placeholder="Enter your name"
          startIcon={<UserIcon />}
        />
        <FormInputFieldV2
          control={form.control}
          name="email"
          label="Email"
          placeholder="Enter your email"
          startIcon={<MailIcon />}
        />

        <div className="mt-1 flex justify-end gap-2">
          <AppButton
            type="button"
            variant="secondary"
            onClick={onCancel}
            disabled={isSubmitting}
          >
            Cancel
          </AppButton>
          <AppButton type="submit" isLoading={isSubmitting}>
            Save changes
          </AppButton>
        </div>
      </form>
    </Form>
  );
};

export default EditProfileForm;
