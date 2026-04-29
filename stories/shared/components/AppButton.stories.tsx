import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { AppButton } from "@/module/shared/components/AppButton";
import { InfoIcon } from "@/module/shared/icons";

const meta = {
  title: "Shared/Components/AppButton",
  component: AppButton,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "secondary", "ghost", "link"],
      description: "The visual style of the button",
    },
    size: {
      control: "select",
      options: ["xl", "l", "m", "s", "icon-xl", "icon-l", "icon-m", "icon-s"],
      description: "The size of the button",
    },
    isLoading: {
      control: "boolean",
      description: "Whether the button is in loading state",
    },
    disabled: {
      control: "boolean",
      description: "Whether the button is disabled",
    },
  },
} satisfies Meta<typeof AppButton>;

export default meta;
type Story = StoryObj<typeof meta>;

// Variant Stories
export const Primary: Story = {
  args: {
    variant: "primary",
    children: "Primary Button",
  },
};

export const Secondary: Story = {
  args: {
    variant: "secondary",
    children: "Secondary Button",
  },
};

export const Ghost: Story = {
  args: {
    variant: "ghost",
    children: "Ghost Button",
  },
};

export const Link: Story = {
  args: {
    variant: "link",
    children: "Link Button",
  },
};

// Size Stories
export const SizeExtraLarge: Story = {
  args: {
    size: "xl",
    children: "Extra Large",
  },
};

export const SizeLarge: Story = {
  args: {
    size: "l",
    children: "Large",
  },
};

export const SizeMedium: Story = {
  args: {
    size: "m",
    children: "Medium",
  },
};

export const SizeSmall: Story = {
  args: {
    size: "s",
    children: "Small",
  },
};

// With Icons
export const WithStartIcon: Story = {
  args: {
    variant: "primary",
    children: "With Start Icon",
    startIcon: <InfoIcon />,
  },
};

export const WithEndIcon: Story = {
  args: {
    variant: "primary",
    children: "With End Icon",
    endIcon: <InfoIcon />,
  },
};

export const WithBothIcons: Story = {
  args: {
    variant: "primary",
    children: "Both Icons",
    startIcon: <InfoIcon />,
    endIcon: <InfoIcon />,
  },
};

// Icon Only Buttons
export const IconOnlyExtraLarge: Story = {
  args: {
    variant: "primary",
    size: "icon-xl",
    children: <InfoIcon />,
  },
};

export const IconOnlyLarge: Story = {
  args: {
    variant: "primary",
    size: "icon-l",
    children: <InfoIcon />,
  },
};

export const IconOnlyMedium: Story = {
  args: {
    variant: "primary",
    size: "icon-m",
    children: <InfoIcon />,
  },
};

export const IconOnlySmall: Story = {
  args: {
    variant: "primary",
    size: "icon-s",
    children: <InfoIcon />,
  },
};

// Loading States
export const LoadingPrimary: Story = {
  args: {
    variant: "primary",
    children: "Loading",
    isLoading: true,
  },
};

export const LoadingSecondary: Story = {
  args: {
    variant: "secondary",
    children: "Loading",
    isLoading: true,
  },
};

export const LoadingGhost: Story = {
  args: {
    variant: "ghost",
    children: "Loading",
    isLoading: true,
  },
};

export const LoadingWithStartIcon: Story = {
  args: {
    variant: "primary",
    children: "Loading",
    startIcon: <InfoIcon />,
    isLoading: true,
  },
};

// Disabled States
export const DisabledPrimary: Story = {
  args: {
    variant: "primary",
    children: "Disabled",
    disabled: true,
  },
};

export const DisabledSecondary: Story = {
  args: {
    variant: "secondary",
    children: "Disabled",
    disabled: true,
  },
};

export const DisabledGhost: Story = {
  args: {
    variant: "ghost",
    children: "Disabled",
    disabled: true,
  },
};

export const DisabledLink: Story = {
  args: {
    variant: "link",
    children: "Disabled",
    disabled: true,
  },
};

// All Variants Side by Side
export const AllVariants: Story = {
  render: () => (
    <div className="flex gap-4">
      <AppButton variant="primary">Primary</AppButton>
      <AppButton variant="secondary">Secondary</AppButton>
      <AppButton variant="ghost">Ghost</AppButton>
      <AppButton variant="link">Link</AppButton>
    </div>
  ),
};

// All Sizes Side by Side
export const AllSizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <AppButton size="xl">Extra Large</AppButton>
      <AppButton size="l">Large</AppButton>
      <AppButton size="m">Medium</AppButton>
      <AppButton size="s">Small</AppButton>
    </div>
  ),
};

// Icon Sizes Side by Side
export const AllIconSizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <AppButton size="icon-xl">
        <InfoIcon />
      </AppButton>
      <AppButton size="icon-l">
        <InfoIcon />
      </AppButton>
      <AppButton size="icon-m">
        <InfoIcon />
      </AppButton>
      <AppButton size="icon-s">
        <InfoIcon />
      </AppButton>
    </div>
  ),
};
