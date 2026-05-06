"use client";

import { Form } from "@/components/ui/form";
import { BaseFormProps } from "@/lib/form";
import { FormColorPickerField } from "@/modules/shared/components/AppFormColorPicker";
import { FormInputFieldV2 } from "@/modules/shared/components/AppFormInput";
import { standardSchemaResolver } from "@hookform/resolvers/standard-schema";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { LabelFormData, labelFormSchema } from "../schemas/label-form-schema";

interface LabelFormProps extends Omit<BaseFormProps<LabelFormData>, "mode"> {
  mode: "create" | "edit";
}

const LabelForm = ({
  id,
  initialData,
  disabled,
  onSubmit,
  onStateChange,
}: LabelFormProps) => {
  const form = useForm<LabelFormData>({
    resolver: standardSchemaResolver(labelFormSchema),
    defaultValues: initialData ?? {
      name: "",
      color: "#FFFFFF",
      background: "#000000",
    },
    mode: "onChange",
  });

  const { isDirty, isValid, isSubmitting } = form.formState;

  useEffect(() => {
    form.reset(
      initialData ?? {
        name: "",
        color: "#FFFFFF",
        background: "#000000",
      },
    );
  }, [form, initialData]);

  useEffect(() => {
    onStateChange?.({
      isDirty,
      isValid,
      isSubmitting,
    });
  }, [isDirty, isSubmitting, isValid, onStateChange]);

  const handleSubmit = async (data: LabelFormData) => {
    await onSubmit?.(data);
  };

  return (
    <Form {...form}>
      <form
        id={id}
        className="flex flex-col gap-4 p-6"
        onSubmit={form.handleSubmit(handleSubmit)}
      >
        <FormInputFieldV2
          control={form.control}
          name="name"
          label="Label name"
          placeholder="Enter label name"
          disabled={disabled}
        />

        <FormColorPickerField
          control={form.control}
          name="color"
          label="Text color"
          placeholder="#RRGGBB"
          disabled={disabled}
        />

        <FormColorPickerField
          control={form.control}
          name="background"
          label="Background color"
          placeholder="#RRGGBB"
          disabled={disabled}
        />
      </form>
    </Form>
  );
};

export default LabelForm;
