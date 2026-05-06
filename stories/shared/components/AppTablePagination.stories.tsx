import * as React from "react";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import AppTablePagination from "@/modules/shared/components/AppTablePagination";

const meta = {
  title: "Shared/Components/AppTablePagination",
  component: AppTablePagination,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div style={{ width: "800px" }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    totalItems: {
      description: "Total number of items across all pages",
      control: "number",
    },
    totalPages: {
      description: "Total number of pages",
      control: "number",
    },
    currentPage: {
      description: "Current active page (1-indexed)",
      control: "number",
    },
    currentPageSize: {
      description: "Current number of items per page",
      control: "number",
    },
    size: {
      description: "Size variant of the pagination components",
      control: "select",
      options: ["L", "M"],
    },
    disabled: {
      description: "Whether the pagination is disabled",
      control: "boolean",
    },
    pageSizeOptions: {
      description: "Available page size options",
      control: "object",
    },
    onPageChange: {
      description: "Callback function when page changes",
      action: "onPageChange",
    },
    onPageSizeChange: {
      description: "Callback function when page size changes",
      action: "onPageSizeChange",
    },
    formatTotalItemTitle: {
      description: "Function to format the total items display text",
      control: "object",
    },
  },
} satisfies Meta<typeof AppTablePagination>;

export default meta;
type Story = StoryObj<typeof meta>;

const defaultPageSizeOptions = [
  { value: 10, children: "10" },
  { value: 25, children: "25" },
  { value: 50, children: "50" },
  { value: 100, children: "100" },
];

export const Default: Story = {
  args: {
    totalItems: 250,
    totalPages: 10,
    currentPage: 1,
    currentPageSize: 25,
    size: "L",
    pageSizeOptions: defaultPageSizeOptions,
    formatTotalItemTitle: (total) => `${total} items`,
  },
};

export const WithCustomFormat: Story = {
  args: {
    totalItems: 1247,
    totalPages: 50,
    currentPage: 5,
    currentPageSize: 25,
    size: "L",
    pageSizeOptions: defaultPageSizeOptions,
    formatTotalItemTitle: (total) => `Total: ${total.toLocaleString()} records`,
  },
};

export const SizeM: Story = {
  args: {
    totalItems: 150,
    totalPages: 6,
    currentPage: 3,
    currentPageSize: 25,
    size: "M",
    pageSizeOptions: defaultPageSizeOptions,
    formatTotalItemTitle: (total) => `${total} items`,
  },
};

export const LargeDataset: Story = {
  args: {
    totalItems: 10000,
    totalPages: 100,
    currentPage: 45,
    currentPageSize: 100,
    size: "L",
    pageSizeOptions: [
      { value: 25, children: "25" },
      { value: 50, children: "50" },
      { value: 100, children: "100" },
      { value: 200, children: "200" },
    ],
    formatTotalItemTitle: (total) => `${total.toLocaleString()} total items`,
  },
};

export const SmallDataset: Story = {
  args: {
    totalItems: 15,
    totalPages: 2,
    currentPage: 1,
    currentPageSize: 10,
    size: "L",
    pageSizeOptions: [
      { value: 5, children: "5" },
      { value: 10, children: "10" },
      { value: 15, children: "15" },
    ],
    formatTotalItemTitle: (total) => `${total} items`,
  },
};

export const Disabled: Story = {
  args: {
    totalItems: 250,
    totalPages: 10,
    currentPage: 5,
    currentPageSize: 25,
    size: "L",
    disabled: true,
    pageSizeOptions: defaultPageSizeOptions,
    formatTotalItemTitle: (total) => `${total} items`,
  },
};

export const Interactive: Story = {
  render: function InteractiveRender(args) {
    const [currentPage, setCurrentPage] = React.useState(args.currentPage || 1);
    const [currentPageSize, setCurrentPageSize] = React.useState(
      args.currentPageSize || 25,
    );

    const totalPages = Math.ceil((args.totalItems || 0) / currentPageSize);

    return (
      <AppTablePagination
        {...args}
        currentPage={currentPage}
        currentPageSize={currentPageSize}
        totalPages={totalPages}
        onPageChange={(page) => {
          setCurrentPage(page);
          args.onPageChange?.(page);
        }}
        onPageSizeChange={(pageSize) => {
          setCurrentPageSize(pageSize);
          setCurrentPage(1); // Reset to first page when page size changes
          args.onPageSizeChange?.(pageSize);
        }}
      />
    );
  },
  args: {
    totalItems: 500,
    currentPage: 1,
    currentPageSize: 25,
    size: "L",
    pageSizeOptions: defaultPageSizeOptions,
    formatTotalItemTitle: (total) => `${total} items`,
  },
};

export const NoItems: Story = {
  args: {
    totalItems: 0,
    totalPages: 0,
    currentPage: 1,
    currentPageSize: 25,
    size: "L",
    pageSizeOptions: defaultPageSizeOptions,
    formatTotalItemTitle: (total) =>
      total === 0 ? "No items" : `${total} items`,
  },
};

export const CustomPageSizes: Story = {
  args: {
    totalItems: 300,
    totalPages: 20,
    currentPage: 8,
    currentPageSize: 15,
    size: "L",
    pageSizeOptions: [
      { value: 15, children: "15 per page" },
      { value: 30, children: "30 per page" },
      { value: 60, children: "60 per page" },
    ],
    formatTotalItemTitle: (total) => `Showing ${total} results`,
  },
};
