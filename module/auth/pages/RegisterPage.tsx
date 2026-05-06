"use client";

import { AppCard } from "@/module/shared/components/AppCard";
import { MESSAGE_TYPE, message } from "@/module/shared/components/AppMessage";
import {
  useRequestSignupOtpMutation,
  useSignupMutation,
  useVerifyOtpMutation,
} from "@/store/api/authApi";
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
  const [step, setStep] = useState<StepRegister>(STEP_REGISTER.REGISTER);
  const [email, setEmail] = useState<string>("");
  const [registerData, setRegisterData] = useState<{
    name: string;
    email: string;
    password: string;
  } | null>(null);

  const [requestSignupOtp] = useRequestSignupOtpMutation();
  const [verifyOtp] = useVerifyOtpMutation();
  const [signup] = useSignupMutation();

  const handleRegisterSubmit = async (data: RegisterFormData) => {
    try {
      await requestSignupOtp({
        name: data.name,
        email: data.email,
        password: data.password,
      }).unwrap();

      setRegisterData({
        name: data.name,
        email: data.email,
        password: data.password,
      });
      setEmail(data.email);
      setStep(STEP_REGISTER.VERIFY);
      message({ type: MESSAGE_TYPE.SUCCESS, description: "OTP sent to your email" });
    } catch (err: unknown) {
      const error = err as { data?: { message?: string } };
      message({
        type: MESSAGE_TYPE.ERROR,
        description: error.data?.message || "Failed to send OTP",
      });
    }
  };

  const handleVerifySubmit = async (data: VerifyFormData) => {
    try {
      await verifyOtp({
        email,
        otp: data.code,
        purpose: "SIGNUP",
      }).unwrap();

      await signup({ email }).unwrap();

      setStep(STEP_REGISTER.SUCCESS);
      message({
        type: MESSAGE_TYPE.SUCCESS,
        description: "Registration successful!",
      });
    } catch (err: unknown) {
      const error = err as { data?: { message?: string } };
      message({
        type: MESSAGE_TYPE.ERROR,
        description: error.data?.message || "Verification failed",
      });
    }
  };

  const handleResendCode = async () => {
    if (!registerData) return;
    try {
      await requestSignupOtp(registerData).unwrap();
      message({
        type: MESSAGE_TYPE.SUCCESS,
        description: "OTP resent to your email",
      });
    } catch (err: unknown) {
      const error = err as { data?: { message?: string } };
      message({
        type: MESSAGE_TYPE.ERROR,
        description: error.data?.message || "Failed to resend OTP",
      });
    }
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
