"use client";
import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";
import React from "react";
import { AppHelperText } from "./AppHelperText";
import { InfoIcon } from "../icons/";

interface AppTextAreaProps extends Omit<
  React.ComponentProps<"textarea">,
  "size"
> {
  size?: "L" | "M" | "S";
  label?: React.ReactNode;
  helperText?: React.ReactNode;
  error?: boolean;
}

const textAreaVariants = cva(
  "flex items-start bg-base-white border border-neutral-200 bg-grey-950 focus-within:border-[1.5px] focus-within:border-neutral-950 group-has-[:disabled]:bg-neutral-50",
  {
    variants: {
      size: {
        L: "rounded-[10px] p-3 body-s",
        M: "rounded-[8px] py-2 px-[10px] body-s",
        S: "rounded-[8px] py-1 px-2 caption-s",
      },
    },
    defaultVariants: {
      size: "L",
    },
  },
);

const placeholderVariants = cva(
  "placeholder:text-neutral-300 placeholder:font-medium",
  {
    variants: {
      size: {
        L: "placeholder:body-s",
        M: "placeholder:body-s",
        S: "placeholder:caption-m",
      },
    },
    defaultVariants: {
      size: "L",
    },
  },
);

export const AppTextArea = React.forwardRef<
  HTMLTextAreaElement,
  AppTextAreaProps
>(({ label, helperText, size, error, ...props }, ref) => {
  return (
    <div className="group flex w-full flex-col gap-1">
      {label && (
        <div className="flex min-h-6 items-center gap-2">
          <label className="body-s flex-1 font-medium text-neutral-700">
            {label}
          </label>
        </div>
      )}

      <div
        data-error={error ? "" : undefined}
        className={cn(
          textAreaVariants({
            size,
            className:
              "has-disabled:bg-grey-900 bg-base-white data-error:border-negative-500",
          }),
        )}
      >
        <textarea
          {...props}
          ref={ref}
          className={cn(
            placeholderVariants({ size }),
            "bg-base-white disabled:bg-grey-900 disabled:text-grey-200 w-full resize-none font-bold text-neutral-950 outline-none disabled:cursor-not-allowed disabled:bg-neutral-50",
          )}
        />
      </div>

      {helperText && (
        <AppHelperText showIcon icon={<InfoIcon />}>
          {helperText}
        </AppHelperText>
      )}
    </div>
  );
});

AppTextArea.displayName = "AppTextArea";
