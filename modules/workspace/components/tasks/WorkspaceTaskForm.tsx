"use client";

import { Form, FormField, FormItem } from "@/components/ui/form";
import { BaseFormProps } from "@/lib/form";
import AppDateInput from "@/modules/shared/components/AppDateInput";
import { FormInputFieldV2 } from "@/modules/shared/components/AppFormInput";
import { FormSelectField } from "@/modules/shared/components/AppFormSelect";
import { FormTextAreaField } from "@/modules/shared/components/AppFormTextArea";
import AppCheckBox from "@/modules/shared/components/AppCheckbox";
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
        <FormField
          control={form.control}
          name="startTime"
          render={({ field }) => {
            const dateRange = {
              start: field.value ? new Date(field.value) : undefined,
              end: endTime ? new Date(endTime) : undefined,
            };
            return (
              <FormItem className="flex flex-col gap-1">
                <p className="body-s font-medium text-neutral-700">
                  Start time / End time
                </p>
                <AppDateInput
                  type="range"
                  value={dateRange}
                  onChange={(next) => {
                    const range = next as
                      | { start?: Date; end?: Date }
                      | undefined;
                    field.onChange(range?.start?.toISOString());
                    form.setValue("endTime", range?.end?.toISOString(), {
                      shouldDirty: true,
                      shouldValidate: true,
                    });
                  }}
                  isDisabled={disabled}
                  startPlaceholder="DD-MM-YYYY"
                  endPlaceholder="DD-MM-YYYY"
                />
              </FormItem>
            );
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
        <FormField
          control={form.control}
          name="labelIds"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-2">
              <p className="body-s font-medium text-neutral-700">Labels</p>
              <div className="grid grid-cols-2 gap-2">
                {labels.map((label) => {
                  const selected = field.value?.includes(label.id) ?? false;
                  return (
                    <AppCheckBox
                      key={label.id}
                      value={selected}
                      label={
                        <span
                          className="caption-s inline-flex items-center rounded-full px-2 py-0.5 font-medium"
                          style={{
                            color: label.color,
                            background: label.background,
                          }}
                        >
                          {label.name}
                        </span>
                      }
                      onChange={() => {
                        const next = selected
                          ? (field.value ?? []).filter((id) => id !== label.id)
                          : [...(field.value ?? []), label.id];
                        field.onChange(next);
                      }}
                    />
                  );
                })}
              </div>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};

export default WorkspaceTaskForm;
