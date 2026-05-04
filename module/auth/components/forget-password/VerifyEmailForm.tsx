"use client";

import { Form } from "@/components/ui/form";
import { BaseFormProps } from "@/lib/form";
import { AppButton } from "@/module/shared/components/AppButton";
import { FormInputFieldV2 } from "@/module/shared/components/AppFormInput";
import { ArrowLeftIcon, MailIcon } from "@/module/shared/icons";
import { standardSchemaResolver } from "@hookform/resolvers/standard-schema";
import Link from "next/link";
import { useForm } from "react-hook-form";
import {
  ForgotPasswordVerifyEmailFormData,
  useForgotPasswordVerifyEmailSchema,
} from "../../schemas";

export interface VerifyEmailFormProps extends BaseFormProps<ForgotPasswordVerifyEmailFormData> {
  disabled?: boolean;
}

export function VerifyEmailForm({
  id,
  disabled,
  onSubmit,
}: VerifyEmailFormProps) {
  const schema = useForgotPasswordVerifyEmailSchema();
  const form = useForm<ForgotPasswordVerifyEmailFormData>({
    resolver: standardSchemaResolver(schema),
    defaultValues: { email: "" },
    mode: "onChange",
  });

  const { isDirty, isValid, isSubmitting } = form.formState;

  const handleSubmit = async (data: ForgotPasswordVerifyEmailFormData) => {
    await onSubmit?.(data);
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2 text-center">
        <h1 className="text-2xl font-bold tracking-tight text-neutral-950 dark:text-neutral-50">
          Verify email to reset password
        </h1>
        <p className="body-s text-neutral-600 dark:text-neutral-400">
          Enter your email address to receive a 6-digit verification code.
        </p>
      </div>

      <Form {...form}>
        <form
          id={id}
          className="flex flex-col gap-5"
          onSubmit={form.handleSubmit(handleSubmit)}
        >
          <FormInputFieldV2
            control={form.control}
            name="email"
            label="Email Address"
            placeholder="name@company.com"
            startIcon={<MailIcon />}
            disabled={disabled}
          />

          <AppButton
            type="submit"
            size="l"
            className="text-base-white w-full bg-neutral-950 tracking-wide hover:bg-neutral-800 active:bg-neutral-900 disabled:bg-neutral-200 disabled:text-neutral-400"
            disabled={disabled || !isDirty || !isValid || isSubmitting}
            isLoading={isSubmitting}
          >
            Send reset code
          </AppButton>
        </form>
      </Form>

      <div className="flex justify-center">
        <Link
          href="/login"
          className="body-s flex items-center font-medium text-neutral-600 transition-colors hover:text-neutral-950 dark:text-neutral-400 dark:hover:text-neutral-50"
        >
          <ArrowLeftIcon size={18} />
          Back to Login
        </Link>
      </div>
    </div>
  );
}

export default VerifyEmailForm;
