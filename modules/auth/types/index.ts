export const STEP_REGISTER = {
  REGISTER: "register",
  VERIFY: "verify",
  SUCCESS: "success",
};

export type StepRegister = (typeof STEP_REGISTER)[keyof typeof STEP_REGISTER];

export const STEP_FORGOT_PASSWORD = {
  VERIFY_EMAIL: "verify-email",
  VERIFY_OTP: "verify-otp",
  UPDATE_PASSWORD: "update-password",
  SUCCESS: "success",
};

export type StepForgotPassword =
  (typeof STEP_FORGOT_PASSWORD)[keyof typeof STEP_FORGOT_PASSWORD];
