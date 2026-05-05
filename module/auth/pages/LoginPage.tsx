"use client";

import { message } from "@/module/shared/components/AppMessage";
import { AppCard } from "@/module/shared/components/AppCard";
import { useLoginMutation } from "@/store/api/authApi";
import { useAppDispatch } from "@/store/hooks";
import { setCredentials } from "@/store/slices/authSlice";
import { useRouter } from "next/navigation";
import { LoginForm } from "../components/login";
import { LoginFormData } from "../schemas/login-schema";

const LoginPage = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [login] = useLoginMutation();

  const handleSubmit = async (data: LoginFormData) => {
    try {
      const result = await login({
        email: data.email,
        password: data.password,
      }).unwrap();

      dispatch(
        setCredentials({
          accessToken: result.accessToken,
          refreshToken: result.refreshToken,
          user: {
            id: result.id,
            name: result.name,
            email: result.email,
            avatar: result.avatar,
          },
        }),
      );

      message({ type: "success", description: "Login successful!" });
      router.push("/dashboard");
    } catch (err: unknown) {
      const error = err as { data?: { message?: string } };
      message({
        type: "error",
        description: error.data?.message || "Invalid email or password",
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
