import { Form } from "@/components/ui/form";
import { AppButton } from "@/module/shared/components/AppButton";
import { FormColorPickerField } from "@/module/shared/components/AppFormColorPicker";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import * as React from "react";
import { useForm } from "react-hook-form";

const meta = {
  title: "Shared/Components/AppFormColorPicker",
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="w-[420px]">
        <Story />
      </div>
    ),
  ],
} satisfies Meta;

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: function DefaultRender() {
    const form = useForm({
      defaultValues: {
        color: "#3366FF",
      },
    });

    return (
      <Form {...form}>
        <form
          className="space-y-4"
          onSubmit={form.handleSubmit((data) =>
            alert(JSON.stringify(data, null, 2)),
          )}
        >
          <FormColorPickerField
            control={form.control}
            name="color"
            label="Workspace color"
            helperText="Use a hex value like #FFAA00"
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
        color: "",
      },
    });

    return (
      <Form {...form}>
        <form
          className="space-y-4"
          onSubmit={form.handleSubmit((data) =>
            alert(JSON.stringify(data, null, 2)),
          )}
        >
          <FormColorPickerField
            control={form.control}
            name="color"
            label="Label color"
            placeholder="#RRGGBB"
            rules={{
              required: "Color is required",
              pattern: {
                value: /^#[0-9A-Fa-f]{6}$/,
                message: "Color must be a valid hex code",
              },
            }}
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
        color: "#EF4444",
      },
    });

    return (
      <Form {...form}>
        <form className="space-y-4">
          <FormColorPickerField
            control={form.control}
            name="color"
            label="Locked color"
            disabled
          />
        </form>
      </Form>
    );
  },
};
