"use client";

import { AppCard } from "@/modules/shared/components/AppCard";
import { MESSAGE_TYPE, message } from "@/modules/shared/components/AppMessage";
import { useLoginMutation } from "@/store/api/authApi";
import { useRouter } from "next/navigation";
import { LoginForm } from "../components/login";
import { LoginFormData } from "../schemas/login-schema";

const LoginPage = () => {
  const router = useRouter();
  const [login] = useLoginMutation();

  const handleSubmit = async (data: LoginFormData) => {
    try {
      await login({
        email: data.email,
        password: data.password,
      }).unwrap();
      message({ type: MESSAGE_TYPE.SUCCESS, description: "Login successful!" });
      router.push("/dashboard");
    } catch (error) {
      const err = error as {
        data?: { message?: string | string[] };
      };
      const msg = err.data?.message;
      const description = Array.isArray(msg)
        ? msg.join(", ")
        : msg || "Invalid email or password";
      message({
        type: MESSAGE_TYPE.ERROR,
        description,
      });
    }
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
