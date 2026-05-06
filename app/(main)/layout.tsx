"use client";

import AppHeader from "@/modules/shared/components/AppHeader";
import { MESSAGE_TYPE, message } from "@/modules/shared/components/AppMessage";
import AppSidebar from "@/modules/shared/components/AppSidebar";
import { MainAuthGate } from "@/modules/shared/components/MainAuthGate";
import { getSidebarItems } from "@/modules/shared/constants/sidebar-items";
import { useLogoutMutation } from "@/store/api/authApi";
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

  const [logout, { isLoading: isLogoutLoading }] = useLogoutMutation();

  const handleLogout = async () => {
    try {
      await logout().unwrap();
      dispatch(baseApi.util.resetApiState());
      router.push("/login");
    } catch {
      message({
        type: MESSAGE_TYPE.ERROR,
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
