"use client";
import { AppCard } from "@/module/shared/components/AppCard";
import { LoginForm } from "../components/login";
import { LoginFormData } from "../schemas/login-schema";

const LoginPage = () => {
  const handleSubmit = async (data: LoginFormData) => {
    console.log(data);
    alert(JSON.stringify(data, null, 2));
  };

  return (
    <AppCard className="w-full max-w-md px-2 pt-5 pb-10">
      <header className="mb-6 flex flex-col items-center gap-1 text-center sm:mb-8">
        <p className="text-2xl font-bold tracking-tight text-neutral-950 dark:text-neutral-50">
          TaskFlow
        </p>
        <p className="text-lg font-medium text-neutral-500 dark:text-neutral-400">
          Login to continue
        </p>
      </header>
      <LoginForm key="login-form" onSubmit={handleSubmit} />
    </AppCard>
  );
};

export default LoginPage;
