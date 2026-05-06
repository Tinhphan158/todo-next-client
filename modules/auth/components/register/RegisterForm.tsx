"use client";
import { Form } from "@/components/ui/form";
import { BaseFormProps } from "@/lib/form";
import { AppButton } from "@/modules/shared/components/AppButton";
import { FormInputFieldV2 } from "@/modules/shared/components/AppFormInput";
import { FormInputFieldPassword } from "@/modules/shared/components/AppFormPasswordInput";
import { MailIcon, UserIcon } from "@/modules/shared/icons";
import { standardSchemaResolver } from "@hookform/resolvers/standard-schema";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { RegisterFormData, registerSchema } from "../../schemas";

export interface RegisterFormProps extends BaseFormProps<RegisterFormData> {
  disabled?: boolean;
}

export const RegisterForm = ({ id, disabled, onSubmit }: RegisterFormProps) => {
  const form = useForm<RegisterFormData>({
    resolver: standardSchemaResolver(registerSchema),
    defaultValues: { name: "", email: "", password: "", confirmPassword: "" },
    mode: "onChange",
  });

  const { isDirty, isValid, isSubmitting } = form.formState;

  const handleSubmit = async (data: RegisterFormData) => {
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
            startIcon={<UserIcon />}
            name="name"
            placeholder={"Enter your full name"}
            disabled={disabled}
            label="Full name"
          />
          <FormInputFieldV2
            control={form.control}
            startIcon={<MailIcon />}
            name="email"
            placeholder={"Enter your email"}
            disabled={disabled}
            label="Email address"
          />
        </div>
        <div className="flex flex-col gap-3">
          <FormInputFieldPassword
            control={form.control}
            name="password"
            placeholder={"Enter your password"}
            disabled={disabled}
            label="Password"
          />
          <FormInputFieldPassword
            control={form.control}
            name="confirmPassword"
            placeholder={"Confirm your password"}
            disabled={disabled}
            label="Confirm password"
          />
        </div>
        <AppButton
          type="submit"
          size="l"
          disabled={disabled || !isDirty || !isValid || isSubmitting}
          isLoading={isSubmitting}
          className="text-base-white w-full bg-neutral-950 hover:bg-neutral-800 active:bg-neutral-900 disabled:bg-neutral-200 disabled:text-neutral-400"
        >
          Continue to register
        </AppButton>
        <div className="flex items-center justify-center">
          <p className="body-s text-neutral-600">
            Already have an account?{" "}
            <Link
              href="/login"
              className="body-s text-primary-500 hover:text-primary-300"
            >
              Login to your account
            </Link>
          </p>
        </div>
      </form>
    </Form>
  );
};
