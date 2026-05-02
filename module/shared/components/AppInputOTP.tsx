"use client";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { cn } from "@/lib/utils";
import React from "react";
import { AppHelperText } from "./AppHelperText";
import { InfoIcon } from "../icons/";

export interface AppInputOTPProps {
  label?: React.ReactNode;
  error?: string;
  helperText?: React.ReactNode;
  maxLength?: number;
  value?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  className?: string;
  pattern?: string;
}

export const AppInputOTP = React.forwardRef<HTMLInputElement, AppInputOTPProps>(
  (
    {
      label,
      helperText,
      error,
      maxLength = 6,
      value,
      onChange,
      disabled = false,
      className,
      pattern,
    },
    ref,
  ) => {
    return (
      <div className={cn("group flex w-full flex-col gap-1", className)}>
        {label && (
          <div className="body-s font-medium text-neutral-700">{label}</div>
        )}

        <InputOTP
          ref={ref}
          maxLength={maxLength}
          value={value}
          onChange={onChange}
          disabled={disabled}
          pattern={pattern}
        >
          <InputOTPGroup className="gap-2">
            {Array.from({ length: maxLength }, (_, i) => (
              <InputOTPSlot
                key={i}
                index={i}
                className={cn(
                  "size-11 rounded-lg border border-neutral-200 text-base font-medium text-neutral-700",
                  "first:rounded-lg last:rounded-lg",
                  "data-[active=true]:border-neutral-950 data-[active=true]:ring-0",
                  error && "border-negative-500",
                )}
              />
            ))}
          </InputOTPGroup>
        </InputOTP>

        {helperText && !error && (
          <AppHelperText showIcon icon={<InfoIcon />}>
            {helperText}
          </AppHelperText>
        )}

        {error && (
          <AppHelperText showIcon icon={<InfoIcon />} state="error">
            {error}
          </AppHelperText>
        )}
      </div>
    );
  },
);

AppInputOTP.displayName = "AppInputOTP";
