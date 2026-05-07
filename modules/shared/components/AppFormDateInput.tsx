"use client";

import { FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { cn } from "@/lib/utils";
import React from "react";
import { ControllerProps, FieldPath, FieldValues } from "react-hook-form";
import { InfoIcon } from "../icons";
import { AppHelperText } from "./AppHelperText";
import AppDateInput from "./AppDateInput";

interface FormDateInputFieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> extends Omit<ControllerProps<TFieldValues, TName>, "render"> {
  label?: React.ReactNode;
  className?: string;
  type?: "single" | "range";
  size?: "L" | "M" | "S";
  startPlaceholder?: string;
  endPlaceholder?: string;
  disabled?: boolean;
  endValue?: string;
  onValueChange?: (
    value: Date | { start?: Date; end?: Date } | undefined,
  ) => void;
}

export const FormDateInputField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  label,
  className = "",
  type = "single",
  size = "L",
  startPlaceholder,
  endPlaceholder,
  disabled = false,
  endValue,
  onValueChange,
  ...props
}: FormDateInputFieldProps<TFieldValues, TName>) => {
  return (
    <FormField
      {...props}
      render={({ field, fieldState }) => {
        const value =
          type === "range"
            ? {
                start:
                  typeof field.value === "string" && field.value
                    ? new Date(field.value)
                    : undefined,
                end: endValue ? new Date(endValue) : undefined,
              }
            : typeof field.value === "string" && field.value
              ? new Date(field.value)
              : undefined;

        return (
          <FormItem className={cn("flex w-full flex-col gap-1", className)}>
            {label && <FormLabel>{label}</FormLabel>}
            <FormControl>
              <AppDateInput
                type={type}
                size={size}
                value={value}
                isDisabled={disabled}
                startPlaceholder={startPlaceholder}
                endPlaceholder={endPlaceholder}
                onChange={(next) => {
                  if (type === "range") {
                    const range = next as { start?: Date; end?: Date } | undefined;
                    field.onChange(range?.start?.toISOString());
                    onValueChange?.(range);
                    return;
                  }

                  const single = next as Date | undefined;
                  field.onChange(single?.toISOString());
                  onValueChange?.(single);
                }}
              />
            </FormControl>
            {fieldState.error?.message && (
              <AppHelperText showIcon icon={<InfoIcon />} state="error">
                {fieldState.error.message}
              </AppHelperText>
            )}
          </FormItem>
        );
      }}
    />
  );
};
