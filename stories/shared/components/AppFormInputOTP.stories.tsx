import * as React from "react";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { AppFormInputOTP } from "@/modules/shared/components/AppFormInputOTP";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { AppButton } from "@/modules/shared/components/AppButton";

const meta = {
  title: "Shared/Components/AppFormInputOTP",
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
        otp: "",
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
          <AppFormInputOTP
            control={form.control}
            name="otp"
            label="Verification Code"
          />
          <AppButton type="submit">Verify</AppButton>
        </form>
      </Form>
    );
  },
};

export const WithValidation: Story = {
  render: function WithValidationRender() {
    const form = useForm({
      defaultValues: {
        otp: "",
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
          <AppFormInputOTP
            control={form.control}
            name="otp"
            label="Enter OTP"
            helperText="We sent a 6-digit code to your email"
            rules={{
              required: "OTP is required",
              minLength: {
                value: 6,
                message: "Please enter all 6 digits",
              },
            }}
          />
          <AppButton type="submit">Submit</AppButton>
        </form>
      </Form>
    );
  },
};

export const FourDigitPIN: Story = {
  render: function FourDigitPINRender() {
    const form = useForm({
      defaultValues: {
        pin: "",
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
          <AppFormInputOTP
            control={form.control}
            name="pin"
            label="Enter PIN"
            maxLength={4}
            rules={{
              required: "PIN is required",
              minLength: {
                value: 4,
                message: "Please enter all 4 digits",
              },
            }}
          />
          <AppButton type="submit">Confirm</AppButton>
        </form>
      </Form>
    );
  },
};

export const WithErrorState: Story = {
  render: function WithErrorStateRender() {
    const form = useForm({
      defaultValues: {
        otp: "123",
      },
    });

    React.useEffect(() => {
      form.setError("otp", {
        type: "manual",
        message: "Invalid verification code. Please try again.",
      });
    }, [form]);

    return (
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit((data) =>
            alert(JSON.stringify(data, null, 2)),
          )}
          className="space-y-4"
        >
          <AppFormInputOTP
            control={form.control}
            name="otp"
            label="Verification Code"
          />
          <AppButton type="submit">Verify</AppButton>
        </form>
      </Form>
    );
  },
};

export const Disabled: Story = {
  render: function DisabledRender() {
    const form = useForm({
      defaultValues: {
        otp: "654321",
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
          <AppFormInputOTP
            control={form.control}
            name="otp"
            label="Verification Code"
            disabled
          />
          <AppButton type="submit">Verify</AppButton>
        </form>
      </Form>
    );
  },
};
