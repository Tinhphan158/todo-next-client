import * as React from "react";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { FormInputFieldV2 } from "@/modules/shared/components/AppFormInput";
import { InfoIcon } from "@/modules/shared/icons";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { AppButton } from "@/modules/shared/components/AppButton";

const meta = {
  title: "Shared/Components/AppFormInput",
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
        email: "",
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
          <FormInputFieldV2
            control={form.control}
            name="email"
            label="Email Address"
            placeholder="Enter your email"
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
        email: "",
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
          <FormInputFieldV2
            control={form.control}
            name="email"
            label="Email Address"
            placeholder="Enter your email"
            rules={{
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address",
              },
            }}
          />
          <AppButton type="submit">Submit</AppButton>
        </form>
      </Form>
    );
  },
};

export const WithIcons: Story = {
  render: function WithIconsRender() {
    const form = useForm({
      defaultValues: {
        username: "",
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
          <FormInputFieldV2
            control={form.control}
            name="username"
            label="Username"
            placeholder="Enter username"
            startIcon={<InfoIcon />}
            endIcon={<InfoIcon />}
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
        name: "",
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
          <FormInputFieldV2
            control={form.control}
            name="name"
            label="Name"
            placeholder="Enter your name"
            size="M"
          />
          <AppButton type="submit">Submit</AppButton>
        </form>
      </Form>
    );
  },
};

export const PasswordField: Story = {
  render: function PasswordFieldRender() {
    const form = useForm({
      defaultValues: {
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
          <FormInputFieldV2
            control={form.control}
            name="password"
            label="Password"
            type="password"
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

export const Disabled: Story = {
  render: function DisabledRender() {
    const form = useForm({
      defaultValues: {
        email: "disabled@example.com",
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
          <FormInputFieldV2
            control={form.control}
            name="email"
            label="Email Address"
            placeholder="Enter your email"
            disabled
          />
          <AppButton type="submit">Submit</AppButton>
        </form>
      </Form>
    );
  },
};

export const WithErrorState: Story = {
  render: function WithErrorStateRender() {
    const form = useForm({
      defaultValues: {
        email: "invalid-email",
      },
    });

    React.useEffect(() => {
      form.setError("email", {
        type: "manual",
        message: "Please enter a valid email address",
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
          <FormInputFieldV2
            control={form.control}
            name="email"
            label="Email Address"
            placeholder="Enter your email"
            rules={{
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address",
              },
            }}
          />
          <AppButton type="submit">Submit</AppButton>
        </form>
      </Form>
    );
  },
};

export const MultipleErrors: Story = {
  render: function MultipleErrorsRender() {
    const form = useForm({
      defaultValues: {
        email: "",
        password: "123",
      },
    });

    React.useEffect(() => {
      form.setError("email", {
        type: "manual",
        message: "Email is required",
      });
      form.setError("password", {
        type: "manual",
        message: "Password must be at least 8 characters",
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
          <FormInputFieldV2
            control={form.control}
            name="email"
            label="Email Address"
            placeholder="Enter your email"
            rules={{ required: "Email is required" }}
          />
          <FormInputFieldV2
            control={form.control}
            name="password"
            label="Password"
            type="password"
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

export const CompleteForm: Story = {
  render: function CompleteFormRender() {
    const form = useForm({
      defaultValues: {
        firstName: "",
        lastName: "",
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
          <FormInputFieldV2
            control={form.control}
            name="firstName"
            label="First Name"
            placeholder="Enter first name"
            rules={{ required: "First name is required" }}
          />
          <FormInputFieldV2
            control={form.control}
            name="lastName"
            label="Last Name"
            placeholder="Enter last name"
            rules={{ required: "Last name is required" }}
          />
          <FormInputFieldV2
            control={form.control}
            name="email"
            label="Email"
            type="email"
            placeholder="Enter email"
            rules={{
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address",
              },
            }}
          />
          <FormInputFieldV2
            control={form.control}
            name="password"
            label="Password"
            type="password"
            placeholder="Enter password"
            rules={{
              required: "Password is required",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters",
              },
            }}
          />
          <AppButton type="submit">Register</AppButton>
        </form>
      </Form>
    );
  },
};
