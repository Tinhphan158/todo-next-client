"use client";

import { Form } from "@/components/ui/form";
import { BaseFormProps } from "@/lib/form";
import { AppButton } from "@/modules/shared/components/AppButton";
import { FormInputFieldV2 } from "@/modules/shared/components/AppFormInput";
import { FormInputFieldPassword } from "@/modules/shared/components/AppFormPasswordInput";
import { MailIcon } from "@/modules/shared/icons";
import { standardSchemaResolver } from "@hookform/resolvers/standard-schema";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { LoginFormData, loginSchema } from "../../schemas";

export interface LoginFormProps extends BaseFormProps<LoginFormData> {
  disabled?: boolean;
}

export const LoginForm = ({ id, disabled, onSubmit }: LoginFormProps) => {
  const form = useForm<LoginFormData>({
    resolver: standardSchemaResolver(loginSchema),
    defaultValues: { email: "", password: "" },
    mode: "onChange",
  });

  const { isDirty, isValid, isSubmitting } = form.formState;

  const handleSubmit = async (data: LoginFormData) => {
    await onSubmit?.(data);
  };

  return (
    <Form {...form}>
      <form
        id={id}
        className="flex flex-col gap-5"
        onSubmit={form.handleSubmit(handleSubmit)}
      >
        <div className="flex flex-col gap-3">
          <FormInputFieldV2
            control={form.control}
            startIcon={<MailIcon />}
            name="email"
            placeholder={"Enter your email"}
            disabled={disabled}
            label="Email address"
          />
          <FormInputFieldPassword
            control={form.control}
            name="password"
            placeholder={"Enter your password"}
            disabled={disabled}
            label="Password"
            labelEnd={
              <Link
                href="/forgot-password"
                className="body-s hover:text-primary-500 text-neutral-600"
              >
                Forgot password?
              </Link>
            }
          />
        </div>

        <AppButton
          type="submit"
          size="l"
          disabled={disabled || !isDirty || !isValid || isSubmitting}
          className="text-base-white w-full bg-neutral-950 hover:bg-neutral-800 active:bg-neutral-900 disabled:bg-neutral-200 disabled:text-neutral-400"
          isLoading={isSubmitting}
        >
          Login
        </AppButton>

        <div className="flex items-center justify-center">
          <p className="body-s text-neutral-600">
            Don&apos;t have an account?{" "}
            <Link
              href="/register"
              className="body-s text-primary-500 hover:text-primary-300"
            >
              Register for free
            </Link>
          </p>
        </div>
      </form>
    </Form>
  );
};
