"use client";

import { FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { cn } from "@/lib/utils";
import React from "react";
import { ControllerProps, FieldPath, FieldValues } from "react-hook-form";
import { InfoIcon } from "../icons";
import { AppHelperText } from "./AppHelperText";
import AppColorPicker from "./AppColorPicker";

interface FormColorPickerFieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> extends Omit<ControllerProps<TFieldValues, TName>, "render"> {
  label?: React.ReactNode;
  helperText?: React.ReactNode;
  className?: string;
  disabled?: boolean;
  placeholder?: string;
}

export const FormColorPickerField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  label,
  helperText,
  className = "",
  disabled = false,
  placeholder,
  ...props
}: FormColorPickerFieldProps<TFieldValues, TName>) => {
  return (
    <FormField
      {...props}
      render={({ field, fieldState }) => (
        <FormItem className={cn("flex w-full flex-col gap-1", className)}>
          <FormControl>
            <AppColorPicker
              value={field.value ? String(field.value) : ""}
              onChange={field.onChange}
              disabled={disabled}
              placeholder={placeholder}
              label={label ? <FormLabel>{label}</FormLabel> : undefined}
              helperText={helperText}
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
