"use client";

import { message } from "@/module/shared/components/AppMessage";
import { AppCard } from "@/module/shared/components/AppCard";
import {
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useVerifyOtpMutation,
} from "@/store/api/authApi";
import { useState } from "react";
import {
  UpdateNewPasswordForm,
  UpdateSuccessStep,
  VerifyEmailForm,
  VerifyOTPRecoverPasswordForm,
} from "../components/forget-password";
import {
  ForgotPasswordNewPasswordFormData,
  ForgotPasswordVerifyEmailFormData,
  VerifyFormData,
} from "../schemas";
import { STEP_FORGOT_PASSWORD, StepForgotPassword } from "../types";

const ForgotPasswordPage = () => {
  const [step, setStep] = useState<StepForgotPassword>(
    STEP_FORGOT_PASSWORD.VERIFY_EMAIL,
  );
  const [email, setEmail] = useState("");

  const [forgotPassword] = useForgotPasswordMutation();
  const [verifyOtp] = useVerifyOtpMutation();
  const [resetPassword] = useResetPasswordMutation();

  const handleSubmitEmail = async (data: ForgotPasswordVerifyEmailFormData) => {
    try {
      await forgotPassword({ email: data.email }).unwrap();
      setEmail(data.email);
      setStep(STEP_FORGOT_PASSWORD.VERIFY_OTP);
      message({
        type: "success",
        description: "OTP sent to your email for password reset",
      });
    } catch (err: unknown) {
      const error = err as { data?: { message?: string } };
      message({
        type: "error",
        description: error.data?.message || "Failed to send reset code",
      });
    }
  };

  const handleSubmitOtp = async (data: VerifyFormData) => {
    try {
      await verifyOtp({
        email,
        otp: data.code,
        purpose: "RESET_PASSWORD",
      }).unwrap();
      setStep(STEP_FORGOT_PASSWORD.UPDATE_PASSWORD);
      message({ type: "success", description: "OTP verified successfully" });
    } catch (err: unknown) {
      const error = err as { data?: { message?: string } };
      message({
        type: "error",
        description: error.data?.message || "Invalid or expired code",
      });
    }
  };

  const handleSubmitUpdatePassword = async (
    data: ForgotPasswordNewPasswordFormData,
  ) => {
    try {
      await resetPassword({
        email,
        newPassword: data.password,
      }).unwrap();
      setStep(STEP_FORGOT_PASSWORD.SUCCESS);
      message({ type: "success", description: "Password updated successfully" });
    } catch (err: unknown) {
      const error = err as { data?: { message?: string } };
      message({
        type: "error",
        description: error.data?.message || "Failed to reset password",
      });
    }
  };

  const handleResendCode = async () => {
    if (!email) return;
    try {
      await forgotPassword({ email }).unwrap();
      message({
        type: "success",
        description: "OTP resent to your email",
      });
    } catch (err: unknown) {
      const error = err as { data?: { message?: string } };
      message({
        type: "error",
        description: error.data?.message || "Failed to resend code",
      });
    }
  };

  const renderStep = () => {
    switch (step) {
      case STEP_FORGOT_PASSWORD.VERIFY_EMAIL:
        return (
          <VerifyEmailForm
            key="verify-email-form"
            onSubmit={handleSubmitEmail}
          />
        );
      case STEP_FORGOT_PASSWORD.VERIFY_OTP:
        return (
          <VerifyOTPRecoverPasswordForm
            key={`verify-otp-form-${email}`}
            onSubmit={handleSubmitOtp}
            onResendCode={handleResendCode}
          />
        );
      case STEP_FORGOT_PASSWORD.UPDATE_PASSWORD:
        return (
          <UpdateNewPasswordForm
            key="update-password-form"
            onSubmit={handleSubmitUpdatePassword}
          />
        );
      case STEP_FORGOT_PASSWORD.SUCCESS:
        return <UpdateSuccessStep key="update-success-step" />;
    }
  };
  return (
    <AppCard className="w-full max-w-md px-2 py-10">{renderStep()}</AppCard>
  );
};

export default ForgotPasswordPage;
