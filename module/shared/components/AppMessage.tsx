"use client";

import { cva } from "class-variance-authority";
import React from "react";
import { toast as sonnerToast, Toaster } from "sonner";
import { CheckIcon, DeleteCircleIcon, InfoIcon, LoadingIcon } from "../icons";

const ID = "app-message";

export const AppMessage = () => {
  return (
    <Toaster
      id={ID}
      className="whitespace-nowrap [--width:auto]!"
      offset={{ top: 64 }}
    />
  );
};

export type MessageType = "loading" | "success" | "warning" | "info" | "error";

interface AppMessageProps {
  id: string | number;
  type?: MessageType;
  duration?: number;
  position?:
    | "top-left"
    | "top-right"
    | "bottom-left"
    | "bottom-right"
    | "top-center"
    | "bottom-center";
  offset?: { top?: number; bottom?: number; left?: number; right?: number };
  description?: string;
}

const appMessageVariants = cva(
  "rounded-[4px] border py-2.5 px-4 flex gap-2 [&_svg]:w-4 [&_svg]:h-4 flex items-center bg bg-base-white",
  {
    variants: {
      type: {
        loading: "[&_svg]:text-neutral-500 border-neutral-500",
        success: "[&_svg]:text-positive-500 border-positive-500",
        warning: "[&_svg]:text-warning-500 border-warning-500",
        info: "[&_svg]:text-info-500 border-info-500",
        error: "[&_svg]:text-negative-500 border-negative-500",
      },
    },
    defaultVariants: {
      type: "loading",
    },
  },
);

export function message({
  type,
  description,
  position = "top-center",
  duration = 3 * 1000,
  offset,
}: Omit<AppMessageProps, "id">) {
  return sonnerToast.custom(
    (id) => (
      <Message
        id={id}
        type={type}
        description={description}
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
      className: "w-full flex justify-center",
    },
  );
}

const Message = (props: AppMessageProps) => {
  const { description, type = "info" } = props;

  const typeIconMap: Record<MessageType, React.ReactNode> = {
    loading: <LoadingIcon className="animate-spin" />,
    success: <CheckIcon />,
    warning: <InfoIcon />,
    info: <InfoIcon />,
    error: <DeleteCircleIcon />,
  };

  return (
    <div className={appMessageVariants({ type })}>
      {typeIconMap[type]}
      <span className="caption-m font-medium text-neutral-700">
        {description}
      </span>
    </div>
  );
};
