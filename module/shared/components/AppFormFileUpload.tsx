"use client";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import React from "react";
import { ControllerProps, FieldPath, FieldValues } from "react-hook-form";
import { cn } from "@/lib/utils";
import { AppHelperText } from "./AppHelperText";
import { InfoIcon } from "../icons";
import AppFileUpload from "./AppFileUpload";

interface FormFileUploadProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> extends Omit<ControllerProps<TFieldValues, TName>, "render"> {
  id?: string;
  label?: React.ReactNode;
  helperText?: React.ReactNode;
  placeholer?: string;
  accept?: string;
  uploadButtonLabel?: string;
  changeButtonLabel?: string;
  className?: string;
}

export const FormFileUploadField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  id,
  label,
  helperText,
  placeholer,
  accept,
  uploadButtonLabel,
  changeButtonLabel,
  className = "",
  disabled,
  ...props
}: FormFileUploadProps<TFieldValues, TName>) => {
  return (
    <FormField
      {...props}
      render={({ field, fieldState }) => (
        <FormItem className={cn("flex w-full flex-col gap-1", className)}>
          {label && (
            <FormLabel
              className="body-s font-medium text-neutral-700"
              htmlFor={id}
            >
              {label}
            </FormLabel>
          )}
          <FormControl>
            <>
              <AppFileUpload
                value={field.value}
                onChange={(value) => {
                  field.onChange(value);
                  field.onBlur();
                }}
                placeholer={placeholer}
                accept={accept}
                disabled={disabled}
                uploadButtonLabel={uploadButtonLabel}
                changeButtonLabel={changeButtonLabel}
              />
              {helperText && !fieldState.error?.message && (
                <AppHelperText showIcon icon={<InfoIcon />}>
                  {helperText}
                </AppHelperText>
              )}
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
