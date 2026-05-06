"use client";

import { Form } from "@/components/ui/form";
import { BaseFormProps } from "@/lib/form";
import { AppButton } from "@/modules/shared/components/AppButton";
import { FormInputFieldPassword } from "@/modules/shared/components/AppFormPasswordInput";
import { ArrowLeftIcon } from "@/modules/shared/icons";
import { standardSchemaResolver } from "@hookform/resolvers/standard-schema";
import Link from "next/link";
import { useForm } from "react-hook-form";
import {
  ForgotPasswordNewPasswordFormData,
  forgotPasswordNewPasswordSchema,
} from "../../schemas";

export interface UpdateNewPasswordFormProps extends BaseFormProps<ForgotPasswordNewPasswordFormData> {
  disabled?: boolean;
}

export function UpdateNewPasswordForm({
  id,
  disabled,
  onSubmit,
}: UpdateNewPasswordFormProps) {
  const form = useForm<ForgotPasswordNewPasswordFormData>({
    resolver: standardSchemaResolver(forgotPasswordNewPasswordSchema),
    defaultValues: { password: "", confirmPassword: "" },
    mode: "onChange",
  });

  const { isDirty, isValid, isSubmitting } = form.formState;

  const handleSubmit = async (data: ForgotPasswordNewPasswordFormData) => {
    await onSubmit?.(data);
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2 text-center">
        <h1 className="text-2xl font-bold tracking-tight text-neutral-950 dark:text-neutral-50">
          Set new password
        </h1>
        <p className="body-s text-neutral-600 dark:text-neutral-400">
          Please enter your new password below.
        </p>
      </div>

      <Form {...form}>
        <form
          id={id}
          className="flex flex-col gap-5"
          onSubmit={form.handleSubmit(handleSubmit)}
        >
          <div className="flex flex-col gap-3">
            <FormInputFieldPassword
              control={form.control}
              name="password"
              label="New Password"
              placeholder="Enter new password"
              disabled={disabled}
            />
            <FormInputFieldPassword
              control={form.control}
              name="confirmPassword"
              label="Confirm New Password"
              placeholder="Confirm new password"
              disabled={disabled}
            />
          </div>

          <AppButton
            type="submit"
            size="l"
            className="text-base-white w-full bg-neutral-950 hover:bg-neutral-800 active:bg-neutral-900 disabled:bg-neutral-200 disabled:text-neutral-400"
            disabled={disabled || !isDirty || !isValid || isSubmitting}
            isLoading={isSubmitting}
          >
            Reset Password
          </AppButton>

          <div className="flex justify-center">
            <Link
              href="/login"
              className="body-s flex items-center gap-1.5 font-medium text-neutral-600 transition-colors hover:text-neutral-950 dark:text-neutral-400 dark:hover:text-neutral-50"
            >
              <ArrowLeftIcon size={18} />
              Back to login
            </Link>
          </div>
        </form>
      </Form>
    </div>
  );
}

export default UpdateNewPasswordForm;
