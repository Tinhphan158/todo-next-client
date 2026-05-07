"use client";

import { FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { cn } from "@/lib/utils";
import React from "react";
import { ControllerProps, FieldPath, FieldValues } from "react-hook-form";
import { InfoIcon } from "../icons";
import { AppHelperText } from "./AppHelperText";
import AppCheckBox from "./AppCheckbox";

interface CheckboxOption {
  value: number;
  label: React.ReactNode;
}

interface FormCheckboxsFieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> extends Omit<ControllerProps<TFieldValues, TName>, "render"> {
  label?: React.ReactNode;
  className?: string;
  options: CheckboxOption[];
}

export const FormCheckboxsField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  label,
  className = "",
  options,
  ...props
}: FormCheckboxsFieldProps<TFieldValues, TName>) => {
  return (
    <FormField
      {...props}
      render={({ field, fieldState }) => {
        const selectedValues = (field.value as number[] | undefined) ?? [];

        return (
          <FormItem className={cn("flex flex-col gap-2", className)}>
            {label && <FormLabel>{label}</FormLabel>}
            <FormControl>
              <div className="grid grid-cols-2 gap-2">
                {options.map((option) => {
                  const selected = selectedValues.includes(option.value);
                  return (
                    <AppCheckBox
                      key={option.value}
                      value={selected}
                      label={option.label}
                      onChange={() => {
                        const next = selected
                          ? selectedValues.filter((id) => id !== option.value)
                          : [...selectedValues, option.value];
                        field.onChange(next);
                      }}
                    />
                  );
                })}
              </div>
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
