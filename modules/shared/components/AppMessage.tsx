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
export const MESSAGE_TYPE = {
  LOADING: "loading",
  SUCCESS: "success",
  WARNING: "warning",
  INFO: "info",
  ERROR: "error",
} as const;
export type MessageType = (typeof MESSAGE_TYPE)[keyof typeof MESSAGE_TYPE];

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
      type: MESSAGE_TYPE.LOADING,
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
  const { description, type = MESSAGE_TYPE.INFO } = props;

  const typeIconMap: Record<MessageType, React.ReactNode> = {
    [MESSAGE_TYPE.LOADING]: <LoadingIcon className="animate-spin" />,
    [MESSAGE_TYPE.SUCCESS]: <CheckIcon />,
    [MESSAGE_TYPE.WARNING]: <InfoIcon />,
    [MESSAGE_TYPE.INFO]: <InfoIcon />,
    [MESSAGE_TYPE.ERROR]: <DeleteCircleIcon />,
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
