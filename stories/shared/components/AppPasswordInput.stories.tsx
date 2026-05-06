import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { AppPasswordInput } from "@/modules/shared/components/AppPasswordInput";

const meta = {
  title: "Shared/Components/AppPasswordInput",
  component: AppPasswordInput,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["L", "M", "S"],
      description: "The size of the input",
    },
    disabled: {
      control: "boolean",
      description: "Whether the input is disabled",
    },
    placeholder: {
      control: "text",
      description: "Placeholder text",
    },
    error: {
      control: "text",
      description: "Error message to display",
    },
  },
  decorators: [
    (Story) => (
      <div className="w-[400px]">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof AppPasswordInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: "Enter your password...",
    size: "L",
  },
};

export const WithLabel: Story = {
  args: {
    label: "Password",
    placeholder: "Enter your password",
    size: "L",
  },
};

export const WithHelperText: Story = {
  args: {
    label: "Password",
    placeholder: "Enter your password",
    helperText: "Password must be at least 8 characters",
    size: "L",
  },
};

export const SizeLarge: Story = {
  args: {
    label: "Password",
    placeholder: "Large size password input",
    size: "L",
  },
};

export const SizeMedium: Story = {
  args: {
    label: "Password",
    placeholder: "Medium size password input",
    size: "M",
  },
};

export const SizeSmall: Story = {
  args: {
    label: "Password",
    placeholder: "Small size password input",
    size: "S",
  },
};

export const Disabled: Story = {
  args: {
    label: "Password",
    placeholder: "This input is disabled",
    disabled: true,
    size: "L",
  },
};

export const DisabledWithValue: Story = {
  args: {
    label: "Password",
    value: "password123",
    disabled: true,
    size: "L",
  },
};

export const WithDefaultValue: Story = {
  args: {
    label: "Current Password",
    placeholder: "Enter current password",
    defaultValue: "secret123",
    size: "L",
  },
};

export const WithError: Story = {
  args: {
    label: "Password",
    placeholder: "Enter your password",
    error: "Password must be at least 8 characters long",
    size: "L",
  },
};

export const WithErrorAndHelperText: Story = {
  args: {
    label: "New Password",
    placeholder: "Create a new password",
    helperText: "Must contain uppercase, lowercase, and numbers",
    error: "Password does not meet requirements",
    size: "L",
  },
};

export const Complete: Story = {
  args: {
    label: "Password",
    placeholder: "Create a password",
    helperText: "Must contain uppercase, lowercase, and numbers",
    size: "L",
  },
};
