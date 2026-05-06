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
  const hydrated = useAppSelector((s) => s.auth.hydrated);
  const user = useAppSelector((s) => s.auth.user);

  const isForbiddenPage = pathname === FORBIDDEN_PATH;
  const allowedWithoutAuth = isForbiddenPage;

  useEffect(() => {
    if (!hydrated || allowedWithoutAuth) return;
    if (!user) {
      router.replace("/login");
    }
  }, [allowedWithoutAuth, hydrated, user, router]);

  if (!hydrated || (!allowedWithoutAuth && !user)) {
    return null;
  }

  return <>{children}</>;
}
