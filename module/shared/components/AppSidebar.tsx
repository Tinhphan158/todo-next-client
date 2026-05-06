"use client";
import {
  Sidebar,
  SidebarContent,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import { LoadingSpinnerIcon, LogoutIcon } from "../icons";
import { AppButton } from "./AppButton";
import AppDialog from "./AppDialog";

interface ItemSidebarProps {
  icon: React.ReactNode;
  title: string;
  href: string;
  slotRight?: React.ReactNode;
  isActive?: boolean;
}

const ItemSidebar = ({
  icon,
  title,
  href,
  slotRight,
  isActive,
}: ItemSidebarProps) => {
  return (
    <Link
      href={href}
      className={cn(
        "body-s flex items-center justify-between gap-2 rounded-r p-3 text-neutral-500 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:p-2 hover:bg-neutral-50 hover:text-neutral-950",
        isActive &&
          "border-primary-500 border-l-3 bg-neutral-50 font-bold text-neutral-950",
      )}
    >
      <div className="flex items-center gap-2 group-data-[collapsible=icon]:gap-0">
        {icon}
        <span className="group-data-[collapsible=icon]:hidden">{title}</span>
      </div>
      <div className="group-data-[collapsible=icon]:hidden">{slotRight}</div>
    </Link>
  );
};

interface AppSidebarProps {
  items: ItemSidebarProps[];
  onLogout: () => void | Promise<void>;
  logoutLoading?: boolean;
  user?: {
    name?: string;
    email?: string;
    avatar?: string;
  };
}

const AppSidebar = ({
  items,
  onLogout,
  logoutLoading = false,
  user,
}: AppSidebarProps) => {
  const pathname = usePathname();
  const isActive = (href: string) => pathname.startsWith(href);

  const [isLogoutDialogOpen, setIsLogoutDialogOpen] = useState(false);

  return (
    <SidebarProvider
      className="w-auto shrink-0"
      style={{ "--sidebar-width": "20rem" } as React.CSSProperties}
      defaultOpen
    >
      <div className="fixed top-4 left-3 z-50 md:hidden">
        <SidebarTrigger />
      </div>

      <Sidebar
        collapsible="icon"
        className="**:data-[sidebar=sidebar]:bg-base-white border-r border-neutral-100"
      >
        <div className="relative flex min-h-[72px] items-center">
          <SidebarTrigger className="absolute top-5 right-2 hidden md:inline-flex" />
          <Link
            href={"/dashboard"}
            className="ml-3 text-2xl font-bold tracking-tight text-neutral-950 group-data-[collapsible=icon]:hidden dark:text-neutral-50"
          >
            TaskFlow
          </Link>
        </div>

        <hr className="mb-5 border-neutral-100 group-data-[collapsible=icon]:hidden" />

        <SidebarContent className="gap-2 p-2">
          {items.map((item) => (
            <ItemSidebar
              key={item.href}
              icon={item.icon}
              title={item.title}
              href={item.href}
              slotRight={item.slotRight}
              isActive={isActive(item.href)}
            />
          ))}
          <AppDialog
            open={isLogoutDialogOpen}
            onOpenChange={setIsLogoutDialogOpen}
            trigger={
              <button
                type="button"
                disabled={logoutLoading}
                className="text-negative-500 hover:text-negative-600 flex min-w-full items-center gap-2 rounded p-3 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:p-2 hover:cursor-pointer hover:bg-neutral-50 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <LogoutIcon />
                <span className="body-s font-medium group-data-[collapsible=icon]:hidden">
                  {logoutLoading ? <LoadingSpinnerIcon /> : "Logout"}
                </span>
              </button>
            }
            title="Are you sure you want to logout?"
            description="You will be signed out of your current TaskFlow session. You can sign back in anytime."
            content={
              <div className="flex w-full justify-end gap-2">
                <AppButton
                  variant="secondary"
                  onClick={() => setIsLogoutDialogOpen(false)}
                >
                  Cancel
                </AppButton>
                <AppButton
                  className="bg-negative-500 text-base-white hover:bg-negative-600 active:bg-negative-700 data-[loading=true]:bg-negative-200 disabled:bg-neutral-100 disabled:text-neutral-300"
                  isLoading={logoutLoading}
                  onClick={onLogout}
                >
                  Logout
                </AppButton>
              </div>
            }
          />
        </SidebarContent>

        <Link
          href="/dashboard"
          className="flex items-center gap-2 rounded px-2 py-4 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-2 group-data-[collapsible=icon]:py-2 hover:cursor-pointer"
        >
          <Image
            src={user?.avatar || "/images/avatar-default.png"}
            alt="avatar"
            width={40}
            height={40}
            className="size-10 rounded-full border border-neutral-100 object-contain"
          />
          <div className="flex flex-col group-data-[collapsible=icon]:hidden">
            <span className="body-S font-medium text-neutral-950">
              {user?.name || "Admin TaskFlow"}
            </span>
            <span className="caption-s text-neutral-500">
              {user?.email || "admin@taskflow.com"}
            </span>
          </div>
        </Link>
      </Sidebar>
    </SidebarProvider>
  );
};

export default AppSidebar;
