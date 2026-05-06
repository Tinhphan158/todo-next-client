import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { notity } from "@/modules/shared/components/AppNotification";
import { AppButton } from "@/modules/shared/components/AppButton";
import { Toaster } from "sonner";

const meta = {
  title: "Shared/Components/AppNotification",
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <>
        <Story />
        <Toaster />
      </>
    ),
  ],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

// Basic Examples
export const Normal: Story = {
  render: () => (
    <AppButton
      onClick={() =>
        notity({
          title: "Notification",
          description: "This is a normal notification.",
        })
      }
    >
      Show Normal
    </AppButton>
  ),
};

export const NoDescription: Story = {
  render: () => (
    <AppButton
      onClick={() =>
        notity({
          title: "Notification",
        })
      }
    >
      Show with no description
    </AppButton>
  ),
};

export const Success: Story = {
  render: () => (
    <AppButton
      onClick={() =>
        notity({
          type: "success",
          title: "Success",
          description: "Operation completed successfully!",
        })
      }
    >
      Show Success
    </AppButton>
  ),
};

export const Warning: Story = {
  render: () => (
    <AppButton
      onClick={() =>
        notity({
          type: "warning",
          title: "Warning",
          description: "Please review this warning carefully.",
        })
      }
    >
      Show Warning
    </AppButton>
  ),
};

export const Info: Story = {
  render: () => (
    <AppButton
      onClick={() =>
        notity({
          type: "info",
          title: "Info",
          description: "Here is some helpful information.",
        })
      }
    >
      Show Info
    </AppButton>
  ),
};

export const Error: Story = {
  render: () => (
    <AppButton
      onClick={() =>
        notity({
          type: "error",
          title: "Error",
          description: "Something went wrong. Please try again.",
        })
      }
    >
      Show Error
    </AppButton>
  ),
};

export const WithoutIcon: Story = {
  render: () => (
    <AppButton
      onClick={() =>
        notity({
          title: "Without Icon",
          description: "This notification has no icon.",
          hasIcon: false,
        })
      }
    >
      Without Icon
    </AppButton>
  ),
};

// All Types
export const AllTypes: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <AppButton
        onClick={() =>
          notity({
            title: "Normal",
            description: "This is a normal notification.",
          })
        }
      >
        Normal
      </AppButton>
      <AppButton
        onClick={() =>
          notity({
            type: "success",
            title: "Success",
            description: "Operation completed successfully!",
          })
        }
      >
        Success
      </AppButton>
      <AppButton
        onClick={() =>
          notity({
            type: "warning",
            title: "Warning",
            description: "Please review this warning carefully.",
          })
        }
      >
        Warning
      </AppButton>
      <AppButton
        onClick={() =>
          notity({
            type: "info",
            title: "Info",
            description: "Here is some helpful information.",
          })
        }
      >
        Info
      </AppButton>
      <AppButton
        onClick={() =>
          notity({
            type: "error",
            title: "Error",
            description: "Something went wrong. Please try again.",
          })
        }
      >
        Error
      </AppButton>
    </div>
  ),
};

// Different Descriptions
export const ShortDescription: Story = {
  render: () => (
    <AppButton
      onClick={() =>
        notity({
          title: "Short",
          description: "Brief message.",
        })
      }
    >
      Short Description
    </AppButton>
  ),
};

export const LongDescription: Story = {
  render: () => (
    <AppButton
      onClick={() =>
        notity({
          title: "Long Description",
          description:
            "This is a much longer description text that provides more details about the notification. It can contain multiple sentences and more comprehensive information for the user.",
        })
      }
    >
      Long Description
    </AppButton>
  ),
};

// Position Examples
export const TopLeft: Story = {
  render: () => (
    <AppButton
      onClick={() =>
        notity({
          title: "Top Left",
          description: "Notification positioned at top left.",
          position: "top-left",
        })
      }
    >
      Top Left Position
    </AppButton>
  ),
};

export const TopRight: Story = {
  render: () => (
    <AppButton
      onClick={() =>
        notity({
          title: "Top Right",
          description: "Notification positioned at top right.",
          position: "top-right",
        })
      }
    >
      Top Right Position
    </AppButton>
  ),
};

export const TopCenter: Story = {
  render: () => (
    <AppButton
      onClick={() =>
        notity({
          title: "Top Center",
          description: "Notification positioned at top center.",
          position: "top-center",
        })
      }
    >
      Top Center Position
    </AppButton>
  ),
};

export const BottomLeft: Story = {
  render: () => (
    <AppButton
      onClick={() =>
        notity({
          title: "Bottom Left",
          description: "Notification positioned at bottom left.",
          position: "bottom-left",
        })
      }
    >
      Bottom Left Position
    </AppButton>
  ),
};

export const BottomRight: Story = {
  render: () => (
    <AppButton
      onClick={() =>
        notity({
          title: "Bottom Right",
          description: "Notification positioned at bottom right.",
          position: "bottom-right",
        })
      }
    >
      Bottom Right Position
    </AppButton>
  ),
};

export const BottomCenter: Story = {
  render: () => (
    <AppButton
      onClick={() =>
        notity({
          title: "Bottom Center",
          description: "Notification positioned at bottom center.",
          position: "bottom-center",
        })
      }
    >
      Bottom Center Position
    </AppButton>
  ),
};

// Offset Examples
export const WithOffset: Story = {
  render: () => (
    <AppButton
      onClick={() =>
        notity({
          title: "With Offset",
          description: "Notification with custom offset.",
          offset: { top: 20, right: 20 },
        })
      }
    >
      With Offset
    </AppButton>
  ),
};

export const WithMultipleOffsets: Story = {
  render: () => (
    <AppButton
      onClick={() =>
        notity({
          title: "Multiple Offsets",
          description: "Notification with multiple offset values.",
          offset: { top: 10, right: 10, bottom: 10, left: 10 },
        })
      }
    >
      Multiple Offsets
    </AppButton>
  ),
};

// Duration Examples
export const ShortDuration: Story = {
  render: () => (
    <AppButton
      onClick={() =>
        notity({
          title: "Short Duration",
          description: "This will disappear quickly (1s).",
          duration: 1000,
        })
      }
    >
      Short Duration (1s)
    </AppButton>
  ),
};

export const LongDuration: Story = {
  render: () => (
    <AppButton
      onClick={() =>
        notity({
          title: "Long Duration",
          description: "This will stay longer (10s).",
          duration: 10000,
        })
      }
    >
      Long Duration (10s)
    </AppButton>
  ),
};

// Combined Examples
export const CustomPositionAndOffset: Story = {
  render: () => (
    <AppButton
      onClick={() =>
        notity({
          type: "success",
          title: "Custom Settings",
          description: "Custom position, offset, and duration.",
          position: "bottom-right",
          offset: { bottom: 40, right: 40 },
          duration: 6000,
        })
      }
    >
      Custom Position & Offset
    </AppButton>
  ),
};

// Progress Examples
export const WithProgress: Story = {
  render: () => (
    <AppButton
      onClick={() =>
        notity({
          title: "With Progress",
          description: "This notification has a progress bar.",
          hasProgress: true,
        })
      }
    >
      With Progress
    </AppButton>
  ),
};

export const WithoutProgress: Story = {
  render: () => (
    <AppButton
      onClick={() =>
        notity({
          title: "Without Progress",
          description: "This notification has no progress bar.",
          hasProgress: false,
        })
      }
    >
      Without Progress
    </AppButton>
  ),
};

export const LongDurationProgress: Story = {
  render: () => (
    <AppButton
      onClick={() =>
        notity({
          type: "info",
          title: "Long Duration Progress",
          description: "Watch the progress bar over 10 seconds.",
          duration: 10000,
          hasProgress: true,
        })
      }
    >
      10s Duration with Progress
    </AppButton>
  ),
};
