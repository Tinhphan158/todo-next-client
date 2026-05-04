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
import AppFrameUpload from "./AppFrameUpload";

interface FormFrameUploadProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> extends Omit<ControllerProps<TFieldValues, TName>, "render"> {
  id?: string;
  label?: React.ReactNode;
  helperText?: React.ReactNode;
  uploadLabel?: string;
  accept?: string;
  uploadButtonLabel?: string;
  changeButtonLabel?: string;
  className?: string;
  aspect?: "video" | "square";
  showDeleteButton?: boolean;
  onChange?: (file: File) => void;
}

export const FormFrameUploadField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  id,
  label,
  uploadLabel,
  accept,
  uploadButtonLabel,
  changeButtonLabel,
  aspect,
  showDeleteButton,
  className = "",
  disabled,
  onChange,
  ...props
}: FormFrameUploadProps<TFieldValues, TName>) => {
  return (
    <FormField
      {...props}
      render={({ field, fieldState }) => (
        <FormItem className={cn("flex flex-col gap-1", className)}>
          {label && (
            <FormLabel
              data-error={undefined}
              htmlFor={id}
              className="body-s font-medium text-neutral-700"
            >
              {label}
            </FormLabel>
          )}
          <FormControl className="flex-1">
            <AppFrameUpload
              value={field.value}
              onChange={(value) => {
                field.onChange(value);
                field.onBlur();

                if (value?.file) {
                  onChange?.(value.file);
                }
              }}
              label={uploadLabel}
              accept={accept}
              uploadButtonLabel={uploadButtonLabel}
              changeButtonLabel={changeButtonLabel}
              aspect={aspect}
              showDeleteButton={showDeleteButton}
              error={!!fieldState.error?.message}
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
