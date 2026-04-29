"use client";

import React from "react";
import { toast as sonnerToast, Toaster } from "sonner";
import { InfoIcon } from "../icons";
import { cva } from "class-variance-authority";

type NotificationType = "normal" | "success" | "warning" | "info" | "error";
const ID = "app-notification";

export const AppNotification = () => {
  return <Toaster id={ID} offset={{ top: 96, right: 24 }} />;
};

interface AppNotificationProps {
  id: string | number;
  type?: NotificationType;
  hasIcon?: boolean;
  icon?: React.ReactNode;
  duration?: number;
  hasProgress?: boolean;
  position?:
    | "top-left"
    | "top-right"
    | "bottom-left"
    | "bottom-right"
    | "top-center"
    | "bottom-center";
  offset?: { top?: number; bottom?: number; left?: number; right?: number };
  description?: string;
  title: string;
}

const appNotificationVariants = cva(
  "flex flex-col w-[262px] rounded-[8px] border p-4 gap-2 overflow-hidden",
  {
    variants: {
      type: {
        normal:
          "[&_[data-progress=true]]:bg-neutral-100 bg-base-white border-neutral-100 [&_svg]:text-neutral-950",
        success:
          "[&_[data-progress=true]]:bg-positives-500 bg-positives-50 border-positives-500 [&_svg]:text-positives-500",
        warning:
          "[&_[data-progress=true]]:bg-warning-500 bg-warning-50 border-warning-500 [&_svg]:text-warning-500",
        info: "[&_[data-progress=true]]:bg-info-500 bg-info-50 border-info-500 [&_svg]:text-info-500",
        error:
          "[&_[data-progress=true]]:bg-negative-500 bg-negative-50 border-negative-500 [&_svg]:text-negative-500",
      },
    },
    defaultVariants: {
      type: "normal",
    },
  },
);

const appNotificationProgressVariants = cva("h-[3px] absolute bottom-0", {
  variants: {
    type: {
      normal: "bg-neutral-100",
      success: "bg-positives-500",
      warning: "bg-warning-500",
      info: "bg-info-500",
      error: "bg-negative-500",
    },
  },
  defaultVariants: {
    type: "normal",
  },
});

export function notity({
  type,
  title,
  description,
  hasIcon,
  hasProgress,
  position = "top-right",
  duration = 3 * 1000,
  offset,
}: Omit<AppNotificationProps, "id">) {
  return sonnerToast.custom(
    (id) => (
      <Notification
        id={id}
        type={type}
        title={title}
        description={description}
        hasIcon={hasIcon}
        hasProgress={hasProgress}
        duration={duration}
      />
    ),
    {
      duration: duration,
      position: position,
      style: {
        marginTop: `${offset?.top}px`,
        marginRight: `${offset?.right}px`,
        marginLeft: `${offset?.left}px`,
        marginBottom: `${offset?.bottom}px`,
      },
      toasterId: ID,
    },
  );
}

/** A fully custom toast that still maintains the animations and interactions. */
const Notification = (props: AppNotificationProps) => {
  const {
    title,
    description,
    type = "normal",
    hasIcon = true,
    hasProgress = true,
    duration = 4000,
  } = props;
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    const startTime = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const percentage = Math.min((elapsed / duration) * 100, 100);
      setProgress(percentage);

      if (elapsed >= duration) {
        clearInterval(interval);
      }
    }, 16);

    return () => clearInterval(interval);
  }, [duration]);

  return (
    <div className="relative overflow-hidden rounded-[8px]">
      <div className={appNotificationVariants({ type })}>
        <div className="peer flex items-center gap-2">
          {hasIcon && <InfoIcon className="h-6 w-6" />}
          <span className="body-s font-bold text-neutral-950">{title}</span>
        </div>
        {description && (
          <p className="body-s font-medium text-neutral-500 peer-has-[svg]:pl-8">
            {description}
          </p>
        )}
      </div>

      {hasProgress && (
        <div
          data-progress
          className={appNotificationProgressVariants({ type })}
          style={{ width: `${progress}%` }}
        />
      )}
    </div>
  );
};
