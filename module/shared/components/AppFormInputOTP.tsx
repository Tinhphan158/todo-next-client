"use client";
import { FormControl, FormField, FormItem } from "@/components/ui/form";
import React from "react";
import { ControllerProps, FieldPath, FieldValues } from "react-hook-form";
import { AppInputOTP } from "./AppInputOTP";
import { cn } from "@/lib/utils";
import { AppHelperText } from "./AppHelperText";
import { InfoIcon } from "../icons";

interface AppFormInputOTPProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> extends Omit<ControllerProps<TFieldValues, TName>, "render"> {
  label?: React.ReactNode;
  helperText?: React.ReactNode;
  maxLength?: number;
  className?: string;
  disabled?: boolean;
  pattern?: string;
}

export const AppFormInputOTP = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  label,
  helperText,
  maxLength = 6,
  className = "",
  disabled = false,
  pattern,
  ...props
}: AppFormInputOTPProps<TFieldValues, TName>) => {
  return (
    <FormField
      {...props}
      render={({ field, fieldState }) => (
        <FormItem className={cn("flex w-full flex-col gap-1", className)}>
          <FormControl>
            <>
              <AppInputOTP
                label={label}
                helperText={helperText}
                maxLength={maxLength}
                value={field.value}
                onChange={field.onChange}
                disabled={disabled}
                pattern={pattern}
                error={fieldState.error?.message}
              />
              {fieldState.error?.message && (
                <AppHelperText showIcon icon={<InfoIcon />} state="error">
                  {fieldState.error.message}
                </AppHelperText>
              )}
            </>
          </FormControl>
        </FormItem>
      )}
    />
  );
};
