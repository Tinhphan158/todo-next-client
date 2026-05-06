"use client";

import { Form } from "@/components/ui/form";
import { AppButton } from "@/modules/shared/components/AppButton";
import { AppFormInputOTP } from "@/modules/shared/components/AppFormInputOTP";
import { ArrowLeftIcon, Lock1Icon } from "@/modules/shared/icons";
import { standardSchemaResolver } from "@hookform/resolvers/standard-schema";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { VERIFY_OTP_COOLDOWN_SECONDS } from "../../constants";
import { VerifyFormData, verifySchema } from "../../schemas";

export interface VerifyOTPRecoverPasswordFormProps {
  onSubmit?: (data: VerifyFormData) => Promise<void>;
  disabled?: boolean;
  resendCooldownSeconds?: number;
  onResendCode?: () => void | Promise<void>;
}

export function VerifyOTPRecoverPasswordForm({
  onSubmit,
  disabled = false,
  resendCooldownSeconds = VERIFY_OTP_COOLDOWN_SECONDS,
  onResendCode,
}: VerifyOTPRecoverPasswordFormProps) {
  const form = useForm<VerifyFormData>({
    resolver: standardSchemaResolver(verifySchema),
    defaultValues: { code: "" },
    mode: "onChange",
  });

  const { isDirty, isValid, isSubmitting } = form.formState;
  const [resendLeft, setResendLeft] = useState(resendCooldownSeconds);

  useEffect(() => {
    if (resendLeft <= 0) return;
    const t = window.setTimeout(() => setResendLeft((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [resendLeft]);

  const formatMmSs = (totalSeconds: number) => {
    const m = Math.floor(totalSeconds / 60);
    const s = totalSeconds % 60;
    return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  };

  const handleSubmit = async (data: VerifyFormData) => {
    await onSubmit?.(data);
  };

  const handleResend = async () => {
    if (resendLeft > 0) return;
    await onResendCode?.();
    setResendLeft(resendCooldownSeconds);
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col items-center gap-3 text-center">
        <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-neutral-100 dark:bg-neutral-800">
          <Lock1Icon
            size={22}
            className="text-neutral-700 dark:text-neutral-300"
          />
        </div>
        <h2 className="text-xl font-bold tracking-tight text-neutral-950 dark:text-neutral-50">
          Identity verification
        </h2>
        <p className="body-s max-w-sm text-neutral-600 dark:text-neutral-400">
          For your security, we&apos;ve sent a 6-digit verification code to your
          registered email address. Please enter it below to reset your
          password.
        </p>
      </div>

      <Form {...form}>
        <form
          className="flex flex-col gap-6"
          onSubmit={form.handleSubmit(handleSubmit)}
        >
          <div className="flex w-full justify-center">
            <AppFormInputOTP
              control={form.control}
              name="code"
              maxLength={6}
              disabled={disabled}
              pattern="^[0-9]+$"
            />
          </div>

          <AppButton
            type="submit"
            size="l"
            className="text-base-white w-full bg-neutral-950 hover:bg-neutral-800 active:bg-neutral-900 disabled:bg-neutral-200 disabled:text-neutral-400"
            disabled={disabled || !isDirty || !isValid || isSubmitting}
            isLoading={isSubmitting}
          >
            Verify & Reset Password
          </AppButton>

          <div className="flex flex-col items-center gap-2 text-center">
            {resendLeft > 0 ? (
              <p className="body-s text-neutral-500 dark:text-neutral-400">
                Didn&apos;t receive the code?{" "}
                <span className="font-semibold text-neutral-700 dark:text-neutral-300">
                  Resend in {formatMmSs(resendLeft)}
                </span>
              </p>
            ) : (
              <p className="body-s text-neutral-500 dark:text-neutral-400">
                Didn&apos;t receive the code?{" "}
                <button
                  type="button"
                  onClick={handleResend}
                  disabled={disabled}
                  className="text-primary-500 hover:text-primary-400 font-semibold disabled:text-neutral-300"
                >
                  Resend Code
                </button>
              </p>
            )}
          </div>

          <div className="flex justify-center">
            <Link
              href="/login"
              className="body-s flex items-center font-medium text-neutral-600 transition-colors hover:text-neutral-950 dark:text-neutral-400 dark:hover:text-neutral-50"
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

export default VerifyOTPRecoverPasswordForm;
