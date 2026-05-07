"use client";

import { Form } from "@/components/ui/form";
import { BaseFormProps } from "@/lib/form";
import { FormInputFieldV2 } from "@/modules/shared/components/AppFormInput";
import { standardSchemaResolver } from "@hookform/resolvers/standard-schema";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  WorkspaceFormData,
  workspaceFormSchema,
} from "../schemas/workspace-form-schema";

interface WorkspaceFormProps extends Omit<BaseFormProps<WorkspaceFormData>, "mode"> {
  mode: "create" | "edit";
}

const WorkspaceForm = ({
  id,
  initialData,
  disabled,
  onSubmit,
  onStateChange,
}: WorkspaceFormProps) => {
  const form = useForm<WorkspaceFormData>({
    resolver: standardSchemaResolver(workspaceFormSchema),
    defaultValues: initialData ?? { name: "" },
    mode: "onChange",
  });

  const { isDirty, isValid, isSubmitting } = form.formState;

  useEffect(() => {
    form.reset(initialData ?? { name: "" });
  }, [form, initialData]);

  useEffect(() => {
    onStateChange?.({
      isDirty,
      isValid,
      isSubmitting,
    });
  }, [isDirty, isSubmitting, isValid, onStateChange]);

  const handleSubmit = async (data: WorkspaceFormData) => {
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
          label="Workspace name"
          placeholder="Enter workspace name"
          disabled={disabled}
        />
      </form>
    </Form>
  );
};

export default WorkspaceForm;
