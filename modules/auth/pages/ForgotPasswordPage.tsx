"use client";

import { AppCard } from "@/modules/shared/components/AppCard";
import { MESSAGE_TYPE, message } from "@/modules/shared/components/AppMessage";
import {
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useVerifyOtpMutation,
} from "@/store/apis/authApi";
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
        type: MESSAGE_TYPE.SUCCESS,
        description: "OTP sent to your email for password reset",
      });
    } catch (err: unknown) {
      const error = err as { data?: { message?: string } };
      message({
        type: MESSAGE_TYPE.ERROR,
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
      message({
        type: MESSAGE_TYPE.SUCCESS,
        description: "OTP verified successfully",
      });
    } catch (err: unknown) {
      const error = err as { data?: { message?: string } };
      message({
        type: MESSAGE_TYPE.ERROR,
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
      message({
        type: MESSAGE_TYPE.SUCCESS,
        description: "Password updated successfully",
      });
    } catch (err: unknown) {
      const error = err as { data?: { message?: string } };
      message({
        type: MESSAGE_TYPE.ERROR,
        description: error.data?.message || "Failed to reset password",
      });
    }
  };

  const handleResendCode = async () => {
    if (!email) return;
    try {
      await forgotPassword({ email }).unwrap();
      message({
        type: MESSAGE_TYPE.SUCCESS,
        description: "OTP resent to your email",
      });
    } catch (err: unknown) {
      const error = err as { data?: { message?: string } };
      message({
        type: MESSAGE_TYPE.ERROR,
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
