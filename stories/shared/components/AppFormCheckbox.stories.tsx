import * as React from "react";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { FormCheckboxField } from "@/module/shared/components/AppFormCheckbox";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { AppButton } from "@/module/shared/components/AppButton";

const meta = {
  title: "Shared/Components/AppFormCheckbox",
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

export const Default: Story = {
  render: function DefaultRender() {
    const form = useForm({
      defaultValues: {
        terms: false,
      },
    });

    return (
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit((data) => console.log(data))}
          className="space-y-4"
        >
          <FormCheckboxField
            control={form.control}
            name="terms"
            label="I agree to the terms and conditions"
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
        terms: false,
      },
    });

    return (
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit((data) => alert(JSON.stringify(data)))}
          className="space-y-4"
        >
          <FormCheckboxField
            control={form.control}
            name="terms"
            label="I agree to the terms and conditions"
            rules={{
              required: "You must accept the terms and conditions",
            }}
          />
          <AppButton type="submit">Submit</AppButton>
        </form>
      </Form>
    );
  },
};

export const WithDefaultChecked: Story = {
  render: function WithDefaultCheckedRender() {
    const form = useForm({
      defaultValues: {
        newsletter: true,
      },
    });

    return (
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit((data) => console.log(data))}
          className="space-y-4"
        >
          <FormCheckboxField
            control={form.control}
            name="newsletter"
            label="Subscribe to newsletter"
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
        disabled: true,
      },
    });

    return (
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit((data) => console.log(data))}
          className="space-y-4"
        >
          <FormCheckboxField
            control={form.control}
            name="disabled"
            label="This checkbox is disabled"
            disabled
          />
          <AppButton type="submit">Submit</AppButton>
        </form>
      </Form>
    );
  },
};

export const DeselectMode: Story = {
  render: function DeselectModeRender() {
    const form = useForm({
      defaultValues: {
        feature: true,
      },
    });

    return (
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit((data) => alert(JSON.stringify(data)))}
          className="space-y-4"
        >
          <FormCheckboxField
            control={form.control}
            name="feature"
            label="Enable feature (click to deselect)"
            isDeselect
            onDeselect={() => {
              alert("Deselect callback triggered!");
              form.setValue("feature", false);
            }}
          />
          <AppButton type="submit">Submit</AppButton>
        </form>
      </Form>
    );
  },
};

export const MultipleCheckboxes: Story = {
  render: function MultipleCheckboxesRender() {
    const form = useForm({
      defaultValues: {
        terms: false,
        newsletter: false,
        updates: false,
      },
    });

    return (
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit((data) => console.log(data))}
          className="space-y-4"
        >
          <FormCheckboxField
            control={form.control}
            name="terms"
            label="I agree to the terms and conditions"
          />
          <FormCheckboxField
            control={form.control}
            name="newsletter"
            label="Subscribe to newsletter"
          />
          <FormCheckboxField
            control={form.control}
            name="updates"
            label="Receive product updates"
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
        terms: false,
        privacy: false,
        marketing: false,
        newsletter: true,
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
          <div className="space-y-3">
            <h3 className="text-base-l font-bold text-neutral-950">
              Registration Agreement
            </h3>

            <FormCheckboxField
              control={form.control}
              name="terms"
              label="I agree to the terms and conditions"
              rules={{
                required: "You must accept the terms and conditions",
              }}
            />

            <FormCheckboxField
              control={form.control}
              name="privacy"
              label="I have read and accept the privacy policy"
              rules={{
                required: "You must accept the privacy policy",
              }}
            />
          </div>

          <div className="space-y-3 border-t border-neutral-200 pt-4">
            <h3 className="text-base-l font-bold text-neutral-950">
              Communication Preferences
            </h3>

            <FormCheckboxField
              control={form.control}
              name="newsletter"
              label="Subscribe to our newsletter"
            />

            <FormCheckboxField
              control={form.control}
              name="marketing"
              label="Receive marketing communications"
            />
          </div>

          <AppButton type="submit" className="w-full">
            Complete Registration
          </AppButton>
        </form>
      </Form>
    );
  },
};

export const WithCustomValidation: Story = {
  render: function WithCustomValidationRender() {
    const form = useForm({
      defaultValues: {
        age: false,
      },
    });

    return (
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit((data) => alert(JSON.stringify(data)))}
          className="space-y-4"
        >
          <FormCheckboxField
            control={form.control}
            name="age"
            label="I confirm that I am 18 years or older"
            rules={{
              required: "You must be 18 or older to continue",
              validate: (value) =>
                value === true || "You must confirm your age",
            }}
          />
          <AppButton type="submit">Continue</AppButton>
        </form>
      </Form>
    );
  },
};
