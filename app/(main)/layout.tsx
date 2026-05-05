"use client";

import { message } from "@/module/shared/components/AppMessage";
import AppSidebar from "@/module/shared/components/AppSidebar";
import { MainAuthGate } from "@/module/shared/components/MainAuthGate";
import { getSidebarItems } from "@/module/shared/constants/sidebar-items";
import { useLogoutApiMutation } from "@/store/api/authApi";
import { baseApi } from "@/store/axios/baseApi";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useRouter } from "next/navigation";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const user = useAppSelector((s) => s.auth.user);
  const [logoutApi, { isLoading: isLogoutLoading }] = useLogoutApiMutation();

  const quantityNotification = 0;

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
        <main className="flex-1 bg-neutral-50">{children}</main>
      </div>
    </MainAuthGate>
  );
};

export default MainLayout;
