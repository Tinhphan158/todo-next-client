"use client";

import { useAppDispatch } from "@/store/hooks";
import { setHydrated, setUser } from "@/store/slices/authSlice";
import { useEffect, useRef } from "react";

export function AuthSessionHydrator({
  children,
}: {
  children: React.ReactNode;
}) {
  const dispatch = useAppDispatch();
  const ran = useRef(false);

  useEffect(() => {
    if (ran.current) return;
    ran.current = true;

    fetch("/api/auth/session", { credentials: "include" })
      .then(async (res) => {
        const data = (await res.json()) as {
          user?: {
            id: number;
            name: string;
            email: string;
            avatar: string | null;
          } | null;
        };
        if (data?.user) {
          dispatch(setUser(data.user));
        }
      })
      .catch(() => {})
      .finally(() => {
        dispatch(setHydrated(true));
      });
  }, [dispatch]);

  return <>{children}</>;
}
