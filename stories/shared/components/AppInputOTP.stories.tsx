import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { AppInputOTP } from "@/module/shared/components/AppInputOTP";

const meta = {
  title: "Shared/Components/AppInputOTP",
  component: AppInputOTP,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    maxLength: {
      control: "number",
      description: "Number of OTP digits",
    },
    disabled: {
      control: "boolean",
      description: "Whether the input is disabled",
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
} satisfies Meta<typeof AppInputOTP>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    maxLength: 6,
  },
};

export const WithLabel: Story = {
  args: {
    label: "Verification Code",
    maxLength: 6,
  },
};

export const WithHelperText: Story = {
  args: {
    label: "OTP Code",
    helperText: "Enter the 6-digit code sent to your email",
    maxLength: 6,
  },
};

export const FourDigits: Story = {
  args: {
    label: "PIN Code",
    maxLength: 4,
  },
};

export const WithError: Story = {
  args: {
    label: "Verification Code",
    error: "Invalid verification code",
    maxLength: 6,
  },
};

export const Disabled: Story = {
  args: {
    label: "Verification Code",
    disabled: true,
    maxLength: 6,
  },
};

export const WithValue: Story = {
  args: {
    label: "Verification Code",
    value: "123456",
    maxLength: 6,
  },
};

export const NumericOnly: Story = {
  args: {
    label: "Numeric OTP",
    helperText: "Only numbers are allowed",
    maxLength: 6,
    pattern: "^[0-9]+$",
  },
};
