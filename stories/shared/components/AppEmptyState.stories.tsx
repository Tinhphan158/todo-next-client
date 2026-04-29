import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import AppEmptyState from "@/module/shared/components/AppEmptyState";

const meta = {
  title: "Shared/Components/AppEmptyState",
  component: AppEmptyState,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    label: {
      description: "Text label to display below the empty state illustration",
      control: "text",
    },
  },
} satisfies Meta<typeof AppEmptyState>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "No data available",
  },
};

export const NoItems: Story = {
  args: {
    label: "No items found",
  },
};

export const NoResults: Story = {
  args: {
    label: "No search results",
  },
};

export const NoUsers: Story = {
  args: {
    label: "No users to display",
  },
};

export const NoOrders: Story = {
  args: {
    label: "No orders found",
  },
};

export const CustomMessage: Story = {
  args: {
    label: "Try adjusting your search criteria or filters",
  },
};

export const LongMessage: Story = {
  args: {
    label:
      "We could not find any records matching your current search and filter criteria",
  },
};
