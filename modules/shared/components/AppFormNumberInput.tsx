"use client";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import React from "react";
import { ControllerProps, FieldPath, FieldValues } from "react-hook-form";
import { AppNumberInput } from "./AppNumberInput";
import { cn } from "@/lib/utils";
import { AppHelperText } from "./AppHelperText";
import { InfoIcon } from "../icons";

interface AppFormNumberInputProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> extends Omit<ControllerProps<TFieldValues, TName>, "render"> {
  label?: React.ReactNode;
  helperText?: React.ReactNode;
  placeholder?: string;
  size?: "L" | "M";
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  className?: string;
  onFocus?: () => void;
  onBlur?: () => void;
  digitLimit?: number;
  allowDecimal?: boolean;
  decimalPlaces?: number;
  showThousandSeparator?: boolean;
  disabled?: boolean;
  inputSize?: number;
  maxLength?: number;
}

export const AppFormNumberInput = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  label,
  helperText,
  placeholder,
  size = "L",
  startIcon,
  endIcon,
  className = "",
  digitLimit,
  allowDecimal = false,
  decimalPlaces = 2,
  showThousandSeparator = false,
  disabled = false,
  inputSize = 20,
  maxLength,
  onFocus,
  onBlur,
  ...props
}: AppFormNumberInputProps<TFieldValues, TName>) => {
  return (
    <FormField
      {...props}
      render={({ field, fieldState }) => (
        <FormItem className={cn("flex w-full flex-col gap-1", className)}>
          <FormControl>
            <AppNumberInput
              {...field}
              label={
                label && <FormLabel data-error={undefined}>{label}</FormLabel>
              }
              helperText={helperText}
              placeholder={placeholder}
              size={size}
              inputSize={inputSize}
              startIcon={startIcon}
              endIcon={endIcon}
              disabled={disabled}
              digitLimit={digitLimit}
              allowDecimal={allowDecimal}
              decimalPlaces={decimalPlaces}
              showThousandSeparator={showThousandSeparator}
              maxLength={maxLength}
              error={fieldState.error?.message}
              onFocus={onFocus}
              onBlur={() => {
                field.onBlur();
                onBlur?.();
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
