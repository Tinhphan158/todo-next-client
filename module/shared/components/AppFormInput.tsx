"use client";
import { FormControl, FormField, FormItem } from "@/components/ui/form";
import React from "react";
import { ControllerProps, FieldPath, FieldValues } from "react-hook-form";
import { AppInputV2 } from "./AppInput";
import { cn } from "@/lib/utils";
import { AppHelperText } from "./AppHelperText";
import { InfoIcon } from "../icons";

interface FormInputFieldV2Props<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> extends Omit<ControllerProps<TFieldValues, TName>, "render"> {
  id?: string;
  label?: React.ReactNode;
  labelEnd?: React.ReactNode;
  helperText?: React.ReactNode;
  placeholder?: string;
  size?: "L" | "M";
  type?: string;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  className?: string;
  onFocus?: () => void;
  onBlur?: () => void;
  maxLength?: number;
  disabled?: boolean;
  inputSize?: number;
}

export const FormInputFieldV2 = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  id,
  label,
  labelEnd,
  helperText,
  placeholder,
  size = "L",
  type = "text",
  startIcon,
  endIcon,
  className = "",
  maxLength,
  disabled = false,
  inputSize = 20,
  onFocus,
  onBlur,
  ...props
}: FormInputFieldV2Props<TFieldValues, TName>) => {
  return (
    <FormField
      {...props}
      render={({ field, fieldState }) => (
        <FormItem className={cn("flex w-full flex-col gap-1", className)}>
          {/* Input field */}
          <FormControl>
            <>
              <AppInputV2
                {...field}
                id={id}
                label={label}
                labelEnd={labelEnd}
                helperText={helperText}
                type={type}
                placeholder={placeholder}
                size={size}
                inputSize={inputSize}
                startIcon={startIcon}
                endIcon={endIcon}
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
