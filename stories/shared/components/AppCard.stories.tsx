import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { AppCard } from "@/modules/shared/components/AppCard";
import { AppButton } from "@/modules/shared/components/AppButton";

const meta = {
  title: "Shared/Components/AppCard",
  component: AppCard,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["default", "sm"],
      description: "The size of the card",
    },
    title: {
      control: "text",
      description: "Card title",
    },
    description: {
      control: "text",
      description: "Card description",
    },
  },
  decorators: [
    (Story) => (
      <div className="w-[400px]">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof AppCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: "Card Title",
    description: "This is a card description that provides additional context.",
    children: (
      <p className="text-sm text-neutral-600">
        This is the card content area. You can put any content here.
      </p>
    ),
  },
};

export const WithFooter: Story = {
  args: {
    title: "Card with Footer",
    description: "A card that includes a footer section.",
    children: (
      <p className="text-sm text-neutral-600">
        Content goes here with additional information.
      </p>
    ),
    footer: (
      <div className="flex w-full justify-end gap-2">
        <AppButton variant="secondary" size="s">
          Cancel
        </AppButton>
        <AppButton size="s">Save</AppButton>
      </div>
    ),
  },
};

export const WithAction: Story = {
  args: {
    title: "Card with Action",
    description: "This card has an action button in the header.",
    action: <AppButton size="s">Edit</AppButton>,
    children: (
      <p className="text-sm text-neutral-600">
        The action button is positioned in the top-right corner of the header.
      </p>
    ),
  },
};

export const SmallSize: Story = {
  args: {
    size: "sm",
    title: "Small Card",
    description: "A compact card with smaller padding.",
    children: (
      <p className="text-sm text-neutral-600">
        This card uses the small size variant with reduced spacing.
      </p>
    ),
  },
};

export const TitleOnly: Story = {
  args: {
    title: "Simple Card",
    children: (
      <p className="text-sm text-neutral-600">
        A card with only a title and content, no description.
      </p>
    ),
  },
};

export const ContentOnly: Story = {
  args: {
    children: (
      <div className="space-y-2">
        <p className="text-sm text-neutral-600">
          This card has no header, just content.
        </p>
        <p className="text-sm text-neutral-600">
          Useful for simple content containers.
        </p>
      </div>
    ),
  },
};

export const CompleteCard: Story = {
  args: {
    title: "Project Overview",
    description: "Summary of your current project status",
    action: (
      <AppButton variant="secondary" size="s">
        View All
      </AppButton>
    ),
    children: (
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm text-neutral-600">Tasks Completed</span>
          <span className="text-sm font-bold text-neutral-950">24/30</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-neutral-600">Team Members</span>
          <span className="text-sm font-bold text-neutral-950">5</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-neutral-600">Due Date</span>
          <span className="text-sm font-bold text-neutral-950">
            May 15, 2026
          </span>
        </div>
      </div>
    ),
    footer: (
      <div className="flex w-full items-center justify-between">
        <span className="text-xs text-neutral-500">Last updated 2h ago</span>
        <AppButton size="s">Open Project</AppButton>
      </div>
    ),
  },
};

export const StatCard: Story = {
  args: {
    size: "sm",
    title: "Total Revenue",
    description: "Monthly earnings",
    children: (
      <div>
        <p className="text-2xl font-bold text-neutral-950">$45,231.89</p>
        <p className="text-xs text-green-600">+20.1% from last month</p>
      </div>
    ),
  },
};

export const ListCard: Story = {
  args: {
    title: "Recent Activity",
    children: (
      <div className="divide-y divide-neutral-100">
        {[
          "Created new task",
          "Updated project settings",
          "Added team member",
          "Completed milestone",
        ].map((item, i) => (
          <div
            key={i}
            className="flex items-center gap-3 py-2 first:pt-0 last:pb-0"
          >
            <div className="bg-primary-500 h-2 w-2 rounded-full" />
            <span className="text-sm text-neutral-700">{item}</span>
          </div>
        ))}
      </div>
    ),
    footer: (
      <AppButton variant="link" size="s">
        View all activity
      </AppButton>
    ),
  },
};
