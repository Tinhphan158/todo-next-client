import Link from "next/link";

import { cn } from "@/lib/utils";
import Image from "next/image";
import { usePathname } from "next/navigation";
import React from "react";
import { LoadingSpinnerIcon, LogoutIcon } from "../icons";
import AppConfirmPopover from "./AppConfirmPopover";

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
        "body-s flex items-center justify-between gap-2 rounded p-3 text-neutral-500 hover:bg-neutral-50 hover:text-neutral-950",
        isActive && "bg-neutral-50 text-neutral-950",
      )}
    >
      <div className="flex items-center gap-2">
        {icon}
        {title}
      </div>
      {slotRight}
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
  const isActive = (href: string) => pathname === href;

  return (
    <div className="flex min-h-full w-80 flex-col">
      <Link
        href={"/dashboard"}
        className="p-5 text-2xl font-bold tracking-tight text-neutral-950 dark:text-neutral-50"
      >
        TaskFlow
      </Link>
      <hr className="mb-5 border-neutral-100" />
      <div className="flex flex-1 flex-col gap-2 p-2">
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
      </div>
      <div className="m-2 flex flex-col gap-2 pb-10">
        <AppConfirmPopover
          trigger={
            <button
              type="button"
              disabled={logoutLoading}
              className="text-negative-500 hover:text-negative-600 flex items-center gap-2 rounded p-3 hover:cursor-pointer hover:bg-neutral-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <LogoutIcon />
              <span className="body-s font-medium">
                {logoutLoading ? <LoadingSpinnerIcon /> : "Logout"}
              </span>
            </button>
          }
          title="Are you sure you want to logout?"
          cancelButtonLabel="Cancel"
          confirmButtonLabel="Yes"
          onConfirm={onLogout}
          isConfirmLoading={logoutLoading}
        />
        <Link
          href="/dashboard"
          className="flex items-center gap-2 rounded p-2 hover:cursor-pointer hover:bg-neutral-50"
        >
          <Image
            src={user?.avatar || "/images/avatar-default.png"}
            alt="avatar"
            width={40}
            height={40}
            className="rounded-full"
          />
          <div className="flex flex-col">
            <span className="body-S font-medium text-neutral-950">
              {user?.name || "Admin TaskFlow"}
            </span>
            <span className="caption-s text-neutral-500">
              {user?.email || "admin@taskflow.com"}
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default AppSidebar;
