"use client";

import { Form } from "@/components/ui/form";
import { AppButton } from "@/modules/shared/components/AppButton";
import { AppFormInputOTP } from "@/modules/shared/components/AppFormInputOTP";
import { ClockIcon } from "@/modules/shared/icons/ClockIcon";
import { standardSchemaResolver } from "@hookform/resolvers/standard-schema";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { VERIFY_OTP_COOLDOWN_SECONDS } from "../../constants";
import { VerifyFormData, verifySchema } from "../../schemas";

export interface VerifyOTPRegisterFormProps {
  onSubmit?: (data: VerifyFormData) => Promise<void>;
  disabled?: boolean;
  resendCooldownSeconds?: number;
  onResendCode?: () => void | Promise<void>;
}

export const VerifyOTPRegisterForm = ({
  onSubmit,
  disabled = false,
  resendCooldownSeconds = VERIFY_OTP_COOLDOWN_SECONDS,
  onResendCode,
}: VerifyOTPRegisterFormProps) => {
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
          disabled={disabled || !isDirty || !isValid || isSubmitting}
          isLoading={isSubmitting}
          className="text-base-white w-full bg-neutral-950 hover:bg-neutral-800 active:bg-neutral-900 disabled:bg-neutral-200 disabled:text-neutral-400"
        >
          Verify & Complete Signup
        </AppButton>

        <div className="flex flex-col items-center gap-2 text-center">
          <p className="body-s text-neutral-500 dark:text-neutral-400">
            Didn&apos;t receive the code?
          </p>
          {resendLeft > 0 ? (
            <div className="body-s flex items-center gap-1.5 text-neutral-600 dark:text-neutral-400">
              <ClockIcon size={18} className="shrink-0 text-neutral-500" />
              <span>Resend code in {formatMmSs(resendLeft)}</span>
            </div>
          ) : (
            <button
              type="button"
              onClick={handleResend}
              disabled={disabled}
              className="body-s text-primary-500 hover:text-primary-400 font-semibold disabled:text-neutral-300"
            >
              Resend code
            </button>
          )}
        </div>
      </form>
    </Form>
  );
};
