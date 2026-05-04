import * as React from "react";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { FormSelectField } from "@/module/shared/components/AppFormSelect";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { AppButton } from "@/module/shared/components/AppButton";

const meta = {
  title: "Shared/Components/AppFormSelect",
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="w-[500px]">
        <Story />
      </div>
    ),
  ],
} satisfies Meta;

export default meta;
type Story = StoryObj;

const fruits = [
  { value: "apple", children: "Apple" },
  { value: "banana", children: "Banana" },
  { value: "orange", children: "Orange" },
  { value: "grape", children: "Grape" },
  { value: "mango", children: "Mango" },
];

const countries = [
  { value: "us", children: "United States" },
  { value: "uk", children: "United Kingdom" },
  { value: "ca", children: "Canada" },
  { value: "au", children: "Australia" },
  { value: "de", children: "Germany" },
  { value: "fr", children: "France" },
  { value: "jp", children: "Japan" },
  { value: "cn", children: "China" },
];

export const Default: Story = {
  render: function DefaultRender() {
    const form = useForm({
      defaultValues: {
        fruit: "",
      },
    });

    return (
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit((data) =>
            alert(JSON.stringify(data, null, 2)),
          )}
          className="space-y-4"
        >
          <FormSelectField
            control={form.control}
            name="fruit"
            label="Favorite Fruit"
            placeholder="Select a fruit"
            items={fruits}
          />
          <AppButton type="submit">Submit</AppButton>
        </form>
      </Form>
    );
  },
};

export const WithValidation: Story = {
  render: function WithValidationRender() {
    const form = useForm({
      defaultValues: {
        country: "",
      },
    });

    return (
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit((data) =>
            alert(JSON.stringify(data, null, 2)),
          )}
          className="space-y-4"
        >
          <FormSelectField
            control={form.control}
            name="country"
            label="Country"
            placeholder="Select a country"
            items={countries}
            rules={{
              required: "Please select a country",
            }}
          />
          <AppButton type="submit">Submit</AppButton>
        </form>
      </Form>
    );
  },
};

export const WithDefaultValue: Story = {
  render: function WithDefaultValueRender() {
    const form = useForm({
      defaultValues: {
        fruit: "banana",
      },
    });

    return (
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit((data) =>
            alert(JSON.stringify(data, null, 2)),
          )}
          className="space-y-4"
        >
          <FormSelectField
            control={form.control}
            name="fruit"
            label="Favorite Fruit"
            placeholder="Select a fruit"
            items={fruits}
          />
          <AppButton type="submit">Submit</AppButton>
        </form>
      </Form>
    );
  },
};

export const Disabled: Story = {
  render: function DisabledRender() {
    const form = useForm({
      defaultValues: {
        fruit: "banana",
      },
    });

    return (
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit((data) =>
            alert(JSON.stringify(data, null, 2)),
          )}
          className="space-y-4"
        >
          <FormSelectField
            control={form.control}
            name="fruit"
            label="Favorite Fruit"
            placeholder="Select a fruit"
            items={fruits}
            disabled
          />
          <AppButton type="submit">Submit</AppButton>
        </form>
      </Form>
    );
  },
};

export const CompleteForm: Story = {
  render: function CompleteFormRender() {
    const form = useForm({
      defaultValues: {
        country: "",
        fruit: "",
        priority: "",
      },
    });

    const priorities = [
      { value: "low", children: "🔵 Low Priority" },
      { value: "medium", children: "🟡 Medium Priority" },
      { value: "high", children: "🔴 High Priority" },
      { value: "urgent", children: "🚨 Urgent" },
    ];

    return (
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit((data) =>
            alert(JSON.stringify(data, null, 2)),
          )}
          className="space-y-4"
        >
          <FormSelectField
            control={form.control}
            name="country"
            label="Country"
            placeholder="Select a country"
            items={countries}
            rules={{ required: "Country is required" }}
          />

          <FormSelectField
            control={form.control}
            name="fruit"
            label="Favorite Fruit"
            placeholder="Select a fruit"
            items={fruits}
            rules={{ required: "Fruit is required" }}
          />

          <FormSelectField
            control={form.control}
            name="priority"
            label="Priority Level"
            placeholder="Select priority"
            items={priorities}
            rules={{ required: "Priority is required" }}
          />

          <AppButton type="submit">Submit Form</AppButton>
        </form>
      </Form>
    );
  },
};
