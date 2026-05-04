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
import { STEP_REGISTER, StepRegister } from "../types";

const RegisterPage = () => {
  const [step, setStep] = useState<StepRegister>(STEP_REGISTER.VERIFY);
  const [email, setEmail] = useState<string>("");

  const handleRegisterSubmit = async (data: RegisterFormData) => {
    console.log(data);
    alert(JSON.stringify(data, null, 2));

    // TODO: Send email verification code to user, handle API call and error handling
    setEmail(data.email);
    setStep(STEP_REGISTER.VERIFY);
  };

  const handleVerifySubmit = async (data: VerifyFormData) => {
    console.log(data);
    alert(JSON.stringify(data, null, 2));
    setStep(STEP_REGISTER.SUCCESS);
  };

  const handleResendCode = async () => {
    console.log("Resend code");
  };

  const handleBack = () => {
    if (step === STEP_REGISTER.VERIFY) setStep(STEP_REGISTER.REGISTER);
  };

  const renderStep = () => {
    switch (step) {
      case STEP_REGISTER.REGISTER:
        return (
          <RegisterFormContainer
            key="register-form-container"
            onSubmit={handleRegisterSubmit}
          />
        );
      case STEP_REGISTER.VERIFY:
        return (
          <VerifyOTPRegisterFormContainer
            key="verify-otp-register-form-container"
            email={email}
            onBack={handleBack}
            onSubmit={handleVerifySubmit}
            onResendCode={handleResendCode}
          />
        );
      case STEP_REGISTER.SUCCESS:
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
