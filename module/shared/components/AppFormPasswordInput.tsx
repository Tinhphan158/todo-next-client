"use client";
import { FormControl, FormField, FormItem } from "@/components/ui/form";
import React from "react";
import { ControllerProps, FieldPath, FieldValues } from "react-hook-form";
import { AppPasswordInput } from "./AppPasswordInput";
import { cn } from "@/lib/utils";
import { AppHelperText } from "./AppHelperText";
import { InfoIcon } from "../icons";

interface FormInputFieldPasswordProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> extends Omit<ControllerProps<TFieldValues, TName>, "render"> {
  id?: string;
  label?: React.ReactNode;
  helperText?: React.ReactNode;
  placeholder?: string;
  size?: "L" | "M";
  className?: string;
  onFocus?: () => void;
  onBlur?: () => void;
  maxLength?: number;
  disabled?: boolean;
  inputSize?: number;
}

export const FormInputFieldPassword = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  id,
  label,
  helperText,
  placeholder,
  size = "L",
  className = "",
  maxLength,
  disabled = false,
  inputSize = 20,
  onFocus,
  onBlur,
  ...props
}: FormInputFieldPasswordProps<TFieldValues, TName>) => {
  return (
    <FormField
      {...props}
      render={({ field, fieldState }) => (
        <FormItem className={cn("flex w-full flex-col gap-1", className)}>
          <FormControl>
            <>
              <AppPasswordInput
                {...field}
                id={id}
                label={label}
                helperText={helperText}
                placeholder={placeholder}
                size={size}
                inputSize={inputSize}
                maxLength={maxLength}
                disabled={disabled}
                onFocus={onFocus}
                error={fieldState.error?.message}
                onBlur={() => {
                  field.onBlur();
                  onBlur?.();
                }}
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
