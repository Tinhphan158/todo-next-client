import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";
import { LoadingIcon } from "../icons/LoadingIcon";

const buttonVariants = cva(
  "flex items-center justify-center transition-all duration-200 data-[loading=true]:cursor-not-allowed",
  {
    variants: {
      variant: {
        primary:
          "bg-primary-500 text-base-white hover:bg-primary-400 active:bg-primary-600 disabled:bg-neutral-100 disabled:text-neutral-300 data-[loading=true]:bg-primary-200",
        secondary:
          "bg-base-white border text-neutral-950 border-neutral-200 hover:border-neutral-950 active:border-neutral-950 disabled:bg-neutral-100 disabled:border-neutral-200 disabled:text-neutral-300 data-[loading=true]:bg-base-white data-[loading=true]:text-neutral-300 data-[loading=true]:border-neutral-200",
        ghost:
          "border bg-base-white border-primary-500 text-primary-500 hover:border-primary-300 hover:text-primary-300 active:border-primary-600 active:text-primary-600 disabled:border-neutral-200 disabled:text-neutral-300 data-[loading=true]:border-primary-200 data-[loading=true]:text-primary-200",
        link: "text-primary-500 hover:text-primary-300 active:text-primary-600 disabled:text-neutral-300",
      },
      size: {
        xl: "py-4 px-5 gap-2 rounded-[8px] button-l font-bold",
        l: "py-3 px-4 gap-1 rounded-[8px] button-l font-bold",
        m: "py-2 px-3 gap-1 rounded-[8px] button-m font-bold",
        s: "py-1 px-2 gap-1 rounded-[6px] button-s font-bold",
        "icon-xl": "rounded-[8px] [&_svg]:w-6 [&_svg]:h-6 p-4",
        "icon-l": "rounded-[8px] [&_svg]:w-6 [&_svg]:h-6 p-3",
        "icon-m": "rounded-[8px] [&_svg]:w-6 [&_svg]:h-6 p-2",
        "icon-s": "rounded-[6px] [&_svg]:w-4 [&_svg]:h-4 p-2",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "m",
    },
  },
);

const iconVariants = cva("flex items-center", {
  variants: {
    size: {
      xl: "[&_svg]:w-6 [&_svg]:h-6",
      l: "[&_svg]:w-6 [&_svg]:h-6",
      m: "[&_svg]:w-5 [&_svg]:h-5",
      s: "[&_svg]:w-[18px] [&_svg]:h-[18px]",
    },
  },
  defaultVariants: {
    size: "m",
  },
});

const AppButton = ({
  className,
  variant = "primary",
  size = "m",
  children,
  startIcon,
  endIcon,
  isLoading = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    startIcon?: React.ReactNode;
    endIcon?: React.ReactNode;
    isLoading?: boolean;
  }) => {
  return (
    <button
      className={cn(buttonVariants({ variant, size }), className)}
      data-loading={isLoading}
      {...props}
    >
      {startIcon && !isLoading && (
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        <div className={cn(iconVariants({ size: size as any }))}>
          {startIcon}
        </div>
      )}
      {isLoading && <LoadingIcon className="animate-spin" />}
      {children}
      {endIcon && (
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        <div className={cn(iconVariants({ size: size as any }))}>{endIcon}</div>
      )}
    </button>
  );
};

export { AppButton, buttonVariants };
