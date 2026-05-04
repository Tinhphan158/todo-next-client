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

const ForgotPasswordPage = () => {
  const [step, setStep] = useState<
    "verify-email" | "verify-otp" | "update-password" | "success"
  >("verify-email");

  const handleSubmitEmail = async (data: ForgotPasswordVerifyEmailFormData) => {
    console.log(data);
    setStep("verify-otp");
  };
  const handleSubmitOtp = async (data: VerifyFormData) => {
    console.log(data);
    setStep("update-password");
  };
  const handleSubmitUpdatePassword = async (
    data: ForgotPasswordNewPasswordFormData,
  ) => {
    console.log(data);
    alert("Password updated successfully");
    setStep("success");
  };

  const renderStep = () => {
    switch (step) {
      case "verify-email":
        return (
          <VerifyEmailForm
            key="verify-email-form"
            onSubmit={handleSubmitEmail}
          />
        );
      case "verify-otp":
        return (
          <VerifyOTPRecoverPasswordForm
            key="verify-otp-form"
            onSubmit={handleSubmitOtp}
          />
        );
      case "update-password":
        return (
          <UpdateNewPasswordForm
            key="update-password-form"
            onSubmit={handleSubmitUpdatePassword}
          />
        );
      case "success":
        return <UpdateSuccessStep key="update-success-step" />;
    }
  };
  return (
    <AppCard className="w-full max-w-md px-2 py-10">{renderStep()}</AppCard>
  );
};

export default ForgotPasswordPage;
