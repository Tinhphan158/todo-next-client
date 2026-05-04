import { maskEmail } from "@/module/shared/helpers/mask-email";
import { ArrowLeftIcon, Lock1Icon } from "@/module/shared/icons";
import { VerifyOTPRegisterForm } from ".";
import { VerifyFormData } from "../../schemas";

interface VerifyOTPRegisterFormContainerProps {
  email: string;
  onBack: () => void;
  onSubmit: (data: VerifyFormData) => Promise<void>;
  onResendCode: () => Promise<void>;
}

export const VerifyOTPRegisterFormContainer = ({
  email,
  onBack,
  onSubmit,
  onResendCode,
}: VerifyOTPRegisterFormContainerProps) => {
  return (
    <div>
      <header className="relative mb-6 flex flex-col items-center gap-3 text-center">
        <button
          type="button"
          onClick={onBack}
          className="body-s absolute top-0 left-0 flex items-center gap-1 self-start font-medium text-neutral-600 transition-colors hover:cursor-pointer hover:text-neutral-950"
        >
          <ArrowLeftIcon size={20} />
          Back
        </button>
        <div className="text-base-white flex size-12 shrink-0 items-center justify-center rounded-xl bg-neutral-950">
          <Lock1Icon size={22} className="text-base-white" />
        </div>
        <h2 className="text-xl font-bold tracking-tight text-neutral-950 dark:text-neutral-50">
          Verify your account
        </h2>
        <p className="body-s max-w-sm text-neutral-600 dark:text-neutral-400">
          A 6-digit code has been sent to{" "}
          <span className="font-medium text-neutral-800 dark:text-neutral-200">
            {maskEmail(email)}
          </span>
        </p>
      </header>
      <VerifyOTPRegisterForm
        key={`verify-otp-register-form-${email}`}
        onSubmit={onSubmit}
        onResendCode={onResendCode}
      />
    </div>
  );
};
