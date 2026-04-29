"use client";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";
import React from "react";
import { AppHelperText } from "./AppHelperText";
import { InfoIcon } from "../icons/";

export interface AppInputV2Props extends Omit<
  React.ComponentProps<typeof Input>,
  "size"
> {
  size?: "L" | "M" | "S";
  label?: React.ReactNode;
  error?: string;
  helperText?: React.ReactNode;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  inputSize?: number;
}

const inputVariants = cva(
  "flex items-center body-m bg-base-white border border-neutral-200 bg-grey-950 has-[input:focus]:border-[1.5px] has-[input:focus]:border-neutral-950 group-has-[:disabled]:bg-neutral-50 data-error:border-negative-500",
  {
    variants: {
      variant: {},
      size: {
        L: "rounded-[10px] p-3 gap-2 body-s",
        M: "rounded-[8px] py-2 px-[10px] gap-2 body-s",
        S: "rounded-[8px] py-1 px-2 caption-s",
      },
    },
    defaultVariants: {
      size: "L",
    },
  },
);

const iconVariants = cva("text-neutral-500 flex items-center", {
  variants: {
    size: {
      L: "[&_svg]:w-6 [&_svg]:h-6",
      M: "[&_svg]:w-6 [&_svg]:h-6",
      S: "[&_svg]:w-5 [&_svg]:h-5",
    },
  },
  defaultVariants: {
    size: "L",
  },
});

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

export const AppInputV2 = React.forwardRef<HTMLInputElement, AppInputV2Props>(
  (
    {
      label,
      helperText,
      size,
      inputSize = 20,
      startIcon,
      endIcon,
      error,
      ...props
    },
    ref,
  ) => {
    return (
      <div className="group flex w-full flex-col gap-1">
        {label && (
          <div className="flex items-center gap-2">
            <div className="body-s flex-1 font-medium text-neutral-700">
              {label}
            </div>
          </div>
        )}

        <div
          data-error={error}
          className={cn(
            inputVariants({
              size,
              className: "has-disabled:bg-grey-900 bg-base-white",
            }),
          )}
        >
          {startIcon && (
            <div
              className={cn(
                iconVariants({
                  size,
                }),
              )}
            >
              {startIcon}
            </div>
          )}
          <input
            {...props}
            size={inputSize}
            ref={ref}
            className={cn(
              placeholderVariants({ size }),
              "bg-base-white disabled:text-grey-200 min-w-0 flex-1 font-bold text-neutral-950 outline-none disabled:cursor-not-allowed disabled:bg-neutral-50",
            )}
          />
          {endIcon && (
            <div
              className={cn(
                iconVariants({
                  size,
                }),
              )}
            >
              {endIcon}
            </div>
          )}
        </div>

        {helperText && (
          <AppHelperText showIcon icon={<InfoIcon />}>
            {helperText}
          </AppHelperText>
        )}
      </div>
    );
  },
);

AppInputV2.displayName = "AppInputV2";
