"use client";

import { Form, FormField, FormItem } from "@/components/ui/form";
import { BaseFormProps } from "@/lib/form";
import { FormCheckboxsField } from "@/modules/shared/components/AppFormCheckboxs";
import { FormDateInputField } from "@/modules/shared/components/AppFormDateInput";
import { FormInputFieldV2 } from "@/modules/shared/components/AppFormInput";
import { FormSelectField } from "@/modules/shared/components/AppFormSelect";
import { FormTextAreaField } from "@/modules/shared/components/AppFormTextArea";
import {
  TaskFormData,
  TaskFormInput,
  taskFormSchema,
} from "@/modules/workspace/schemas/task-form-schema";
import {
  TASK_PRIORITY_OPTIONS,
  TASK_STATUS_LABEL,
  TASK_STATUS_OPTIONS,
} from "@/modules/workspace/constants";
import type { Label, Task } from "@/store/types";
import { standardSchemaResolver } from "@hookform/resolvers/standard-schema";
import { useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";
import WorkspaceTaskRichTextEditor from "./WorkspaceTaskRichTextEditor";

export type WorkspaceTaskFormValue = TaskFormData;

interface WorkspaceTaskFormProps
  extends Omit<BaseFormProps<WorkspaceTaskFormValue>, "mode"> {
  labels: Label[];
}

export function taskToFormValue(task: Task): WorkspaceTaskFormValue {
  return {
    title: task.title ?? "",
    description: task.description ?? "",
    content: task.content ?? "",
    priority: task.priority ?? undefined,
    status: task.status ?? undefined,
    labelIds: task.labels?.map((label) => label.id) ?? [],
    startTime: task.startTime ?? undefined,
    endTime: task.endTime ?? undefined,
  };
}

const WorkspaceTaskForm = ({
  id,
  initialData,
  labels,
  disabled = false,
  onSubmit,
  onStateChange,
}: WorkspaceTaskFormProps) => {
  const form = useForm<TaskFormInput, unknown, TaskFormData>({
    resolver: standardSchemaResolver(taskFormSchema),
    defaultValues: initialData ?? {
      title: "",
      description: "",
      content: "",
      priority: undefined,
      status: "TODO",
      labelIds: [],
      startTime: undefined,
      endTime: undefined,
    },
    mode: "onChange",
  });

  const { isDirty, isValid, isSubmitting } = form.formState;
  const endTime = useWatch({
    control: form.control,
    name: "endTime",
  });

  useEffect(() => {
    form.reset(
      initialData ?? {
        title: "",
        description: "",
        content: "",
        priority: undefined,
        status: "TODO",
        labelIds: [],
        startTime: undefined,
        endTime: undefined,
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

  const handleSubmit = async (data: TaskFormData) => {
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
          name="title"
          disabled={disabled}
          label="Title"
          placeholder="Enter task title"
        />
        <FormTextAreaField
          control={form.control}
          name="description"
          label="Description"
          placeholder="Describe this task"
          rows={5}
          disabled={disabled}
        />
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <WorkspaceTaskRichTextEditor
                value={field.value}
                onChange={field.onChange}
              />
            </FormItem>
          )}
        />
        <FormDateInputField
          control={form.control}
          name="startTime"
          label="Start time / End time"
          type="range"
          endValue={endTime}
          disabled={disabled}
          startPlaceholder="DD-MM-YYYY"
          endPlaceholder="DD-MM-YYYY"
          onValueChange={(next) => {
            const range = next as { start?: Date; end?: Date } | undefined;
            form.setValue("endTime", range?.end?.toISOString(), {
              shouldDirty: true,
              shouldValidate: true,
            });
          }}
        />
        <FormSelectField
          control={form.control}
          name="status"
          label="Status"
          placeholder="Select status"
          disabled={disabled}
          items={TASK_STATUS_OPTIONS.map((status) => ({
            value: status,
            children: TASK_STATUS_LABEL[status],
          }))}
        />
        <FormSelectField
          control={form.control}
          name="priority"
          label="Priority"
          placeholder="Select priority"
          disabled={disabled}
          items={TASK_PRIORITY_OPTIONS.map((priority) => ({
            value: priority,
            children: priority,
          }))}
        />
        <FormCheckboxsField
          control={form.control}
          name="labelIds"
          label="Labels"
          options={labels.map((label) => ({
            value: label.id,
            label: (
              <span
                className="caption-s inline-flex items-center rounded-full px-2 py-0.5 font-medium"
                style={{
                  color: label.color,
                  background: label.background,
                }}
              >
                {label.name}
              </span>
            ),
          }))}
        />
      </form>
    </Form>
  );
};

export default WorkspaceTaskForm;
