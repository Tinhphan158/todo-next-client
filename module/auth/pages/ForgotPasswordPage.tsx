"use client";

import { AppCard } from "@/module/shared/components/AppCard";
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

  const handleSubmitEmail = async (data: ForgotPasswordVerifyEmailFormData) => {
    console.log(data);
    setStep(STEP_FORGOT_PASSWORD.VERIFY_OTP);
  };
  const handleSubmitOtp = async (data: VerifyFormData) => {
    console.log(data);
    setStep(STEP_FORGOT_PASSWORD.UPDATE_PASSWORD);
  };
  const handleSubmitUpdatePassword = async (
    data: ForgotPasswordNewPasswordFormData,
  ) => {
    console.log(data);
    alert("Password updated successfully");
    setStep(STEP_FORGOT_PASSWORD.SUCCESS);
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
            key="verify-otp-form"
            onSubmit={handleSubmitOtp}
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
