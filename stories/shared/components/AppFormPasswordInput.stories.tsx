import * as React from "react";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { FormInputFieldPassword } from "@/module/shared/components/AppFormPasswordInput";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { AppButton } from "@/module/shared/components/AppButton";

const meta = {
  title: "Shared/Components/AppFormPasswordInput",
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
        password: "",
      },
    });

    return (
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit((data) => console.log(data))}
          className="space-y-4"
        >
          <FormInputFieldPassword
            control={form.control}
            name="password"
            label="Password"
            placeholder="Enter password"
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
        password: "",
      },
    });

    return (
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit((data) => alert(JSON.stringify(data)))}
          className="space-y-4"
        >
          <FormInputFieldPassword
            control={form.control}
            name="password"
            label="Password"
            placeholder="Enter password"
            rules={{
              required: "Password is required",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters",
              },
            }}
          />
          <AppButton type="submit">Submit</AppButton>
        </form>
      </Form>
    );
  },
};

export const SizeMedium: Story = {
  render: function SizeMediumRender() {
    const form = useForm({
      defaultValues: {
        password: "",
      },
    });

    return (
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit((data) => console.log(data))}
          className="space-y-4"
        >
          <FormInputFieldPassword
            control={form.control}
            name="password"
            label="Password"
            placeholder="Enter password"
            size="M"
          />
          <AppButton type="submit">Submit</AppButton>
        </form>
      </Form>
    );
  },
};

export const WithHelperText: Story = {
  render: function WithHelperTextRender() {
    const form = useForm({
      defaultValues: {
        password: "",
      },
    });

    return (
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit((data) => console.log(data))}
          className="space-y-4"
        >
          <FormInputFieldPassword
            control={form.control}
            name="password"
            label="Password"
            placeholder="Enter password"
            helperText="Must be at least 8 characters long"
          />
          <AppButton type="submit">Submit</AppButton>
        </form>
      </Form>
    );
  },
};

export const WithMaxLength: Story = {
  render: function WithMaxLengthRender() {
    const form = useForm({
      defaultValues: {
        password: "",
      },
    });

    return (
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit((data) => console.log(data))}
          className="space-y-4"
        >
          <FormInputFieldPassword
            control={form.control}
            name="password"
            label="Password"
            placeholder="Enter password"
            maxLength={16}
            rules={{
              maxLength: {
                value: 16,
                message: "Password must be at most 16 characters",
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
        password: "password123",
      },
    });

    return (
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit((data) => console.log(data))}
          className="space-y-4"
        >
          <FormInputFieldPassword
            control={form.control}
            name="password"
            label="Password"
            placeholder="Enter password"
            disabled
          />
          <AppButton type="submit">Submit</AppButton>
        </form>
      </Form>
    );
  },
};

export const WithConfirmPassword: Story = {
  render: function WithConfirmPasswordRender() {
    const form = useForm({
      defaultValues: {
        password: "",
        confirmPassword: "",
      },
    });

    return (
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit((data) => alert(JSON.stringify(data)))}
          className="space-y-4"
        >
          <FormInputFieldPassword
            control={form.control}
            name="password"
            label="Password"
            placeholder="Enter password"
            rules={{
              required: "Password is required",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters",
              },
            }}
          />
          <FormInputFieldPassword
            control={form.control}
            name="confirmPassword"
            label="Confirm Password"
            placeholder="Confirm password"
            rules={{
              required: "Please confirm your password",
              validate: (value, formValues) =>
                value === formValues.password || "Passwords do not match",
            }}
          />
          <AppButton type="submit">Submit</AppButton>
        </form>
      </Form>
    );
  },
};

export const CompleteLoginForm: Story = {
  render: function CompleteLoginFormRender() {
    const form = useForm({
      defaultValues: {
        email: "",
        password: "",
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
          <FormInputFieldPassword
            control={form.control}
            name="email"
            label="Email"
            placeholder="Enter email"
            rules={{
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address",
              },
            }}
          />
          <FormInputFieldPassword
            control={form.control}
            name="password"
            label="Password"
            placeholder="Enter password"
            rules={{
              required: "Password is required",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters",
              },
            }}
          />
          <AppButton type="submit">Login</AppButton>
        </form>
      </Form>
    );
  },
};

export const WithErrorState: Story = {
  render: function WithErrorStateRender() {
    const form = useForm({
      defaultValues: {
        password: "123",
      },
    });

    React.useEffect(() => {
      form.setError("password", {
        type: "manual",
        message: "Password is too short - must be at least 8 characters",
      });
    }, [form]);

    return (
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit((data) => console.log(data))}
          className="space-y-4"
        >
          <div className="rounded-lg border border-red-200 bg-red-50 p-4">
            <p className="text-sm text-red-800">
              Error state: Shows red borders and error message when validation
              fails
            </p>
          </div>
          <FormInputFieldPassword
            control={form.control}
            name="password"
            label="Password"
            placeholder="Enter password"
            helperText="Password must be at least 8 characters"
            rules={{
              required: "Password is required",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters",
              },
            }}
          />
          <AppButton type="submit">Submit</AppButton>
        </form>
      </Form>
    );
  },
};

export const MultiplePasswordErrors: Story = {
  render: function MultiplePasswordErrorsRender() {
    const form = useForm({
      defaultValues: {
        password: "weak",
        confirmPassword: "different",
      },
    });

    React.useEffect(() => {
      form.setError("password", {
        type: "manual",
        message: "Password does not meet security requirements",
      });
      form.setError("confirmPassword", {
        type: "manual",
        message: "Passwords do not match",
      });
    }, [form]);

    return (
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit((data) => console.log(data))}
          className="space-y-4"
        >
          <div className="rounded-lg border border-orange-200 bg-orange-50 p-4">
            <p className="text-sm text-orange-800">
              Multiple validation errors: Both password fields show error states
            </p>
          </div>
          <FormInputFieldPassword
            control={form.control}
            name="password"
            label="New Password"
            placeholder="Enter new password"
            helperText="Must include uppercase, lowercase, numbers, and symbols"
            rules={{
              required: "Password is required",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters",
              },
              pattern: {
                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/,
                message:
                  "Password must include uppercase, lowercase, numbers, and symbols",
              },
            }}
          />
          <FormInputFieldPassword
            control={form.control}
            name="confirmPassword"
            label="Confirm Password"
            placeholder="Confirm new password"
            rules={{
              required: "Please confirm your password",
              validate: (value, formValues) =>
                value === formValues.password || "Passwords do not match",
            }}
          />
          <AppButton type="submit">Submit</AppButton>
        </form>
      </Form>
    );
  },
};

export const WithStrongPasswordRequirements: Story = {
  render: function WithStrongPasswordRequirementsRender() {
    const form = useForm({
      defaultValues: {
        password: "",
      },
    });

    return (
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit((data) => console.log(data))}
          className="space-y-4"
        >
          <FormInputFieldPassword
            control={form.control}
            name="password"
            label="Password"
            placeholder="Enter a strong password"
            maxLength={32}
            rules={{
              required: "Password is required",
              minLength: {
                value: 12,
                message: "Password must be at least 12 characters",
              },
              pattern: {
                value:
                  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{12,}$/,
                message:
                  "Password must include uppercase, lowercase, numbers, and symbols",
              },
            }}
          />
          <AppButton type="submit">Create Account</AppButton>
        </form>
      </Form>
    );
  },
};
