"use client";

import AppHeader from "@/module/shared/components/AppHeader";
import { message } from "@/module/shared/components/AppMessage";
import AppSidebar from "@/module/shared/components/AppSidebar";
import { MainAuthGate } from "@/module/shared/components/MainAuthGate";
import { getSidebarItems } from "@/module/shared/constants/sidebar-items";
import { useLogoutApiMutation } from "@/store/api/authApi";
import { baseApi } from "@/store/axios/baseApi";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { usePathname, useRouter } from "next/navigation";
import { useMemo } from "react";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const user = useAppSelector((s) => s.auth.user);
  const pathname = usePathname();
  const titleHeader = useMemo(() => {
    const title = getSidebarItems().find((item) =>
      pathname.startsWith(item.href),
    )?.title;
    return title ?? "Dashboard";
  }, [pathname]);
  const quantityNotification = 0;

  const [logoutApi, { isLoading: isLogoutLoading }] = useLogoutApiMutation();

  const handleLogout = async () => {
    try {
      await logoutApi().unwrap();
      dispatch(baseApi.util.resetApiState());
      router.push("/login");
    } catch {
      message({
        type: "error",
        description: "Logout failed. Please try again.",
      });
    }
  };

  return (
    <MainAuthGate>
      <div className="flex min-h-screen">
        <AppSidebar
          items={getSidebarItems(quantityNotification)}
          onLogout={handleLogout}
          logoutLoading={isLogoutLoading}
          user={
            user
              ? {
                  name: user.name,
                  email: user.email,
                  avatar: user.avatar ?? undefined,
                }
              : undefined
          }
        />
        <main className="flex-1 bg-neutral-50">
          <AppHeader title={titleHeader} />
          <div className="p-4">{children}</div>
        </main>
      </div>
    </MainAuthGate>
  );
};

export default MainLayout;
