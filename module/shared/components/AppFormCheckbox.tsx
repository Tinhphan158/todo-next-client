"use client";
import { FormControl, FormField, FormItem } from "@/components/ui/form";
import React from "react";
import { ControllerProps, FieldPath, FieldValues } from "react-hook-form";
import AppCheckBox from "./AppCheckbox";
import { AppHelperText } from "./AppHelperText";
import { InfoIcon } from "../icons";
import { cn } from "@/lib/utils";

interface FormCheckboxFieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> extends Omit<ControllerProps<TFieldValues, TName>, "render"> {
  label?: React.ReactNode;
  className?: string;
  disabled?: boolean;
  isDeselect?: boolean;
  onDeselect?: () => void;
}

export const FormCheckboxField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  label,
  className = "",
  disabled = false,
  isDeselect = false,
  onDeselect,
  ...props
}: FormCheckboxFieldProps<TFieldValues, TName>) => {
  return (
    <FormField
      {...props}
      render={({ field, fieldState }) => (
        <FormItem
          className={cn("flex flex-col justify-center gap-1", className)}
        >
          {/* Checkbox field */}
          <FormControl>
            <AppCheckBox
              name={field.name}
              value={field.value}
              onChange={field.onChange}
              onDeselect={onDeselect}
              label={label}
              disabled={disabled}
              isDeselect={isDeselect}
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
