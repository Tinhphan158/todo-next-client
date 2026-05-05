"use client";

import { useAppSelector } from "@/store/hooks";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

const FORBIDDEN_PATH = "/forbidden";

interface MainAuthGateProps {
  children: React.ReactNode;
}

export function MainAuthGate({ children }: MainAuthGateProps) {
  const pathname = usePathname();
  const router = useRouter();
  const accessToken = useAppSelector((s) => s.auth.accessToken);

  const isForbiddenPage = pathname === FORBIDDEN_PATH;
  const allowedWithoutAuth = isForbiddenPage;

  useEffect(() => {
    if (allowedWithoutAuth) return;
    if (!accessToken) {
      router.replace("/login");
    }
  }, [allowedWithoutAuth, accessToken, router]);

  if (!allowedWithoutAuth && !accessToken) {
    return null;
  }

  return <>{children}</>;
}
