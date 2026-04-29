"use client";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import React from "react";
import { ControllerProps, FieldPath, FieldValues } from "react-hook-form";
import AppDatePicker from "./AppDatePicker";
import { cn } from "@/lib/utils";
import { AppHelperText } from "./AppHelperText";
import { InfoIcon } from "../icons";

interface FormDatePickerFieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> extends Omit<ControllerProps<TFieldValues, TName>, "render"> {
  id?: string;
  label?: React.ReactNode;
  helperText?: React.ReactNode;
  type?: "single" | "range";
  className?: string;
  startPlaceholder?: string;
  endPlaceholder?: string;
}

export const FormDatePickerField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  id,
  label,
  type = "range",
  className = "",
  startPlaceholder,
  endPlaceholder,
  disabled,
  ...props
}: FormDatePickerFieldProps<TFieldValues, TName>) => {
  return (
    <FormField
      {...props}
      render={({ field, fieldState }) => (
        <FormItem className={cn("flex w-full flex-col gap-1", className)}>
          <FormControl>
            <>
              {label && <FormLabel htmlFor={id}>{label}</FormLabel>}
              <AppDatePicker
                value={field.value}
                onChange={(value) => {
                  field.onChange(value);
                  field.onBlur();
                }}
                type={type}
                startPlaceholder={startPlaceholder}
                endPlaceholder={endPlaceholder}
                disabled={disabled}
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
