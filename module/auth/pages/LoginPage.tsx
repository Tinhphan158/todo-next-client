"use client";

import { message } from "@/module/shared/components/AppMessage";
import { AppCard } from "@/module/shared/components/AppCard";
import { useAppDispatch } from "@/store/hooks";
import { setUser } from "@/store/slices/authSlice";
import { useRouter } from "next/navigation";
import { LoginForm } from "../components/login";
import { LoginFormData } from "../schemas/login-schema";

const LoginPage = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleSubmit = async (data: LoginFormData) => {
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: data.email,
          password: data.password,
        }),
      });

      const body = (await res.json().catch(() => ({}))) as {
        message?: string | string[];
        id?: number;
        name?: string;
        email?: string;
        avatar?: string | null;
      };

      if (!res.ok) {
        const msg = body.message;
        const description = Array.isArray(msg)
          ? msg.join(", ")
          : msg || "Invalid email or password";
        message({ type: "error", description });
        return;
      }

      dispatch(
        setUser({
          id: body.id as number,
          name: body.name as string,
          email: body.email as string,
          avatar: body.avatar ?? null,
        }),
      );

      message({ type: "success", description: "Login successful!" });
      router.push("/dashboard");
    } catch {
      message({
        type: "error",
        description: "Invalid email or password",
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
