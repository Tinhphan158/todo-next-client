"use client";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import React from "react";
import { ControllerProps, FieldPath, FieldValues } from "react-hook-form";
import AppSelect, { AppSelectProps } from "./AppSelect";
import { cn } from "@/lib/utils";
import { AppHelperText } from "./AppHelperText";
import { InfoIcon } from "../icons";

interface FormSelectFieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> extends Omit<ControllerProps<TFieldValues, TName>, "render"> {
  label?: React.ReactNode;
  placeholder?: string;
  items: AppSelectProps["items"];
  className?: string;
  disabled?: boolean;
  valueType?: "string" | "number";
}

export const FormSelectField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  label,
  placeholder,
  items,
  className = "",
  disabled = false,
  valueType = "string",
  ...props
}: FormSelectFieldProps<TFieldValues, TName>) => {
  return (
    <FormField
      {...props}
      render={({ field, fieldState }) => (
        <FormItem className={cn("flex w-full flex-col gap-1", className)}>
          {/* Select field */}
          <FormControl>
            <AppSelect
              {...field}
              value={
                valueType === "string" ? field.value : String(field.value)
              }
              onChange={(value) =>
                valueType === "string"
                  ? field.onChange(value)
                  : field.onChange(Number(value))
              }
              label={label && <FormLabel>{label}</FormLabel>}
              placeholder={placeholder}
              items={items}
              disabled={disabled}
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
