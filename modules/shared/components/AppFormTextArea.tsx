"use client";
import { FormControl, FormField, FormItem } from "@/components/ui/form";
import React from "react";
import { ControllerProps, FieldPath, FieldValues } from "react-hook-form";
import { AppTextArea } from "./AppTextArea";
import { cn } from "@/lib/utils";
import { AppHelperText } from "./AppHelperText";
import { InfoIcon } from "../icons";

interface FormTextAreaFieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> extends Omit<ControllerProps<TFieldValues, TName>, "render"> {
  id?: string;
  label?: React.ReactNode;
  helperText?: React.ReactNode;
  size?: "L" | "M" | "S";
  className?: string;
  rows?: number;
  placeholder?: string;
  disabled?: boolean;
  maxLength?: number;
}

export const FormTextAreaField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  id,
  label,
  helperText,
  size = "L",
  className = "",
  rows,
  placeholder,
  disabled = false,
  maxLength,
  ...props
}: FormTextAreaFieldProps<TFieldValues, TName>) => {
  return (
    <FormField
      {...props}
      render={({ field, fieldState }) => (
        <FormItem className={cn("flex w-full flex-col gap-1", className)}>
          <FormControl>
            <AppTextArea
              {...field}
              id={id}
              label={label}
              helperText={helperText}
              size={size}
              rows={rows}
              placeholder={placeholder}
              disabled={disabled}
              maxLength={maxLength}
              error={!!fieldState.error?.message}
              onBlur={() => {
                field.onBlur();
              }}
            />
          </FormControl>
          {fieldState.error?.message && (
            <AppHelperText showIcon icon={<InfoIcon />} state="error">
              {fieldState.error.message}
            </AppHelperText>
          )}
        </FormItem>
      )}
    />
  );
};
