import { RegisterForm } from ".";
import { RegisterFormData } from "../../schemas";

interface RegisterFormContainerProps {
  onSubmit: (data: RegisterFormData) => Promise<void>;
}

export const RegisterFormContainer = ({
  onSubmit,
}: RegisterFormContainerProps) => {
  return (
    <div>
      <header className="mb-6 flex flex-col items-center gap-1 text-center sm:mb-8">
        <p className="text-2xl font-bold tracking-tight text-neutral-950 dark:text-neutral-50">
          TaskFlow
        </p>
        <p className="text-lg font-medium text-neutral-500 dark:text-neutral-400">
          Register to continue
        </p>
      </header>
      <RegisterForm key="register-form" onSubmit={onSubmit} />
    </div>
  );
};
