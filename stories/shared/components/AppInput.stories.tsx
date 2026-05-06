import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { AppInputV2 } from "@/modules/shared/components/AppInput";
import { InfoIcon } from "@/modules/shared/icons";

const meta = {
  title: "Shared/Components/AppInput",
  component: AppInputV2,
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
} satisfies Meta<typeof AppInputV2>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: "Enter text...",
    size: "L",
  },
};

export const WithLabel: Story = {
  args: {
    label: "Email Address",
    placeholder: "Enter your email",
    size: "L",
  },
};

export const WithLabelEnd: Story = {
  args: {
    label: "Password",
    labelEnd: (
      <a href="#" className="text-primary-600 font-medium hover:underline">
        Forgot?
      </a>
    ),
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

export const WithStartIcon: Story = {
  args: {
    label: "Search",
    placeholder: "Search...",
    startIcon: <InfoIcon />,
    size: "L",
  },
};

export const WithEndIcon: Story = {
  args: {
    label: "Username",
    placeholder: "Enter username",
    endIcon: <InfoIcon />,
    size: "L",
  },
};

export const WithBothIcons: Story = {
  args: {
    label: "Full Name",
    placeholder: "Enter your full name",
    startIcon: <InfoIcon />,
    endIcon: <InfoIcon />,
    size: "L",
  },
};

export const SizeLarge: Story = {
  args: {
    label: "Large Input",
    placeholder: "Large size input",
    size: "L",
  },
};

export const SizeMedium: Story = {
  args: {
    label: "Medium Input",
    placeholder: "Medium size input",
    size: "M",
  },
};

export const SizeSmall: Story = {
  args: {
    label: "Small Input",
    placeholder: "Small size input",
    size: "S",
  },
};

export const Disabled: Story = {
  args: {
    label: "Disabled Input",
    placeholder: "This input is disabled",
    disabled: true,
    size: "L",
  },
};

export const DisabledWithValue: Story = {
  args: {
    label: "Disabled with Value",
    value: "Cannot edit this value",
    disabled: true,
    size: "L",
  },
};

export const WithTypeEmail: Story = {
  args: {
    label: "Email",
    type: "email",
    placeholder: "your@email.com",
    helperText: "We will never share your email",
    size: "L",
  },
};

export const WithTypePassword: Story = {
  args: {
    label: "Password",
    type: "password",
    placeholder: "Enter password",
    helperText: "Must contain uppercase, lowercase, and numbers",
    size: "L",
  },
};

export const WithError: Story = {
  args: {
    label: "Email Address",
    placeholder: "Enter your email",
    error: "Please enter a valid email address",
    size: "L",
  },
};

export const WithErrorAndHelperText: Story = {
  args: {
    label: "Password",
    placeholder: "Enter your password",
    helperText: "Password must be at least 8 characters",
    error: "Password is too short",
    size: "L",
  },
};

export const Complete: Story = {
  args: {
    label: "Complete Example",
    placeholder: "Enter text",
    helperText: "This is a complete input with all features",
    startIcon: <InfoIcon />,
    endIcon: <InfoIcon />,
    size: "L",
  },
};
