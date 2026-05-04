"use client";

import { AppCard } from "@/module/shared/components/AppCard";
import { useState } from "react";
import {
  RegisterFormContainer,
  RegisterSuccessStep,
  VerifyOTPRegisterFormContainer,
} from "../components/register";
import { RegisterFormData } from "../schemas/register-schema";
import { VerifyFormData } from "../schemas/verify-schema";

const RegisterPage = () => {
  const [step, setStep] = useState<"register" | "verify" | "success">("verify");
  const [email, setEmail] = useState<string>("");

  const handleRegisterSubmit = async (data: RegisterFormData) => {
    console.log(data);
    alert(JSON.stringify(data, null, 2));

    // TODO: Send email verification code to user, handle API call and error handling
    setEmail(data.email);
    setStep("verify");
  };

  const handleVerifySubmit = async (data: VerifyFormData) => {
    console.log(data);
    alert(JSON.stringify(data, null, 2));
    setStep("success");
  };

  const handleResendCode = async () => {
    console.log("Resend code");
  };

  const handleBack = () => {
    if (step === "verify") setStep("register");
  };

  const renderStep = () => {
    switch (step) {
      case "register":
        return (
          <RegisterFormContainer
            key="register-form-container"
            onSubmit={handleRegisterSubmit}
          />
        );
      case "verify":
        return (
          <VerifyOTPRegisterFormContainer
            key="verify-otp-register-form-container"
            email={email}
            onBack={handleBack}
            onSubmit={handleVerifySubmit}
            onResendCode={handleResendCode}
          />
        );
      case "success":
        return <RegisterSuccessStep key="register-success-step" />;
      default:
        return null;
    }
  };

  return (
    <AppCard className="w-full max-w-md px-2 py-10">{renderStep()}</AppCard>
  );
};

export default RegisterPage;
