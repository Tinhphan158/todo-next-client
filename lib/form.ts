"use client";

import { useEffect } from "react";
import { DefaultValues, FieldValues, Resolver, useForm } from "react-hook-form";

export interface FormState<T extends FieldValues> {
  data?: T;
  isDirty: boolean;
  isValid: boolean;
  isSubmitting: boolean;
  errors?: Record<keyof T, string | undefined>;
}

export interface BaseFormProps<T extends FieldValues> {
  id?: string;
  resolver?: Resolver<T>;
  mode?: "all" | "onChange" | "onBlur" | "onSubmit" | "onTouched";
  initialData?: DefaultValues<T>;
  disabled?: boolean;
  onSubmit?: (data: T) => Promise<void>;
  onStateChange?: (state: FormState<T>) => void;
  onSuccess?: (data: T) => void;
  onError?: (error: unknown) => void;
  onReset?: () => void;
}

const useBaseForm = <T extends FieldValues>({
  initialData,
  onStateChange,
  onSubmit,
  onError,
  onReset,
  onSuccess,
  resolver,
  mode,
}: BaseFormProps<T>) => {
  const form = useForm<T>({
    resolver: resolver,
    defaultValues: initialData,
    mode: mode,
  });
  const { formState, handleSubmit, reset } = form;

  const { isDirty, isValid, isSubmitting, dirtyFields, errors } = formState;

  useEffect(() => {
    onStateChange?.({
      isDirty: isDirty,
      isValid: isValid,
      isSubmitting: isSubmitting,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isValid, isDirty, isSubmitting]);

  const submit = handleSubmit(async (data) => {
    try {
      await onSubmit?.(data);
      onSuccess?.(data);
    } catch (err) {
      onError?.(err);
    }
  });

  const resetForm = () => {
    reset(initialData);
    onReset?.();
  };

  return {
    form,
    submit,
    resetForm,
    isDirty,
    isValid,
    isSubmitting,
    dirtyFields,
    errors,
  };
};

export default useBaseForm;
