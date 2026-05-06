"use client";

import { Form } from "@/components/ui/form";
import { AppButton } from "@/module/shared/components/AppButton";
import { FormInputFieldPassword } from "@/module/shared/components/AppFormPasswordInput";
import { standardSchemaResolver } from "@hookform/resolvers/standard-schema";
import { useForm } from "react-hook-form";
import {
  ChangePasswordFormData,
  changePasswordSchema,
} from "../schemas/change-password-schema";

interface ChangePasswordFormProps {
  isSubmitting: boolean;
  onSubmit: (data: ChangePasswordFormData) => Promise<void>;
  onCancel: () => void;
}

const ChangePasswordForm = ({
  isSubmitting,
  onSubmit,
  onCancel,
}: ChangePasswordFormProps) => {
  const form = useForm<ChangePasswordFormData>({
    resolver: standardSchemaResolver(changePasswordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    },
    mode: "onChange",
  });

  return (
    <Form {...form}>
      <form
        className="flex w-full flex-col gap-4 pb-6"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormInputFieldPassword
          control={form.control}
          name="currentPassword"
          label="Current password"
          placeholder="Enter current password"
        />
        <FormInputFieldPassword
          control={form.control}
          name="newPassword"
          label="New password"
          placeholder="Enter new password"
        />
        <FormInputFieldPassword
          control={form.control}
          name="confirmNewPassword"
          label="Confirm new password"
          placeholder="Re-enter new password"
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
            Update password
          </AppButton>
        </div>
      </form>
    </Form>
  );
};

export default ChangePasswordForm;
