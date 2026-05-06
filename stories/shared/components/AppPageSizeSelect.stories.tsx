import * as React from "react";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import AppPageSizeSelect from "@/modules/shared/components/AppPageSizeSelect";

const meta = {
  title: "Shared/Components/AppPageSizeSelect",
  component: AppPageSizeSelect,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    items: {
      description: "Array of page size options",
      control: "object",
    },
    value: {
      description: "Current selected page size value",
      control: "text",
    },
    onChange: {
      description: "Callback function when selection changes",
      action: "onChange",
    },
    disabled: {
      description: "Whether the select is disabled",
      control: "boolean",
    },
    placeholder: {
      description: "Placeholder text when no value is selected",
      control: "text",
    },
    label: {
      description: "Optional label for the select",
      control: "text",
    },
    size: {
      description: "Size variant of the select",
      control: "select",
      options: ["L", "M"],
    },
  },
} satisfies Meta<typeof AppPageSizeSelect>;

export default meta;
type Story = StoryObj<typeof meta>;

const defaultItems = [
  { value: "10", children: "10" },
  { value: "25", children: "25" },
  { value: "50", children: "50" },
  { value: "100", children: "100" },
];

export const Default: Story = {
  args: {
    items: defaultItems,
    placeholder: "Select page size",
    size: "L",
  },
};

export const WithLabel: Story = {
  args: {
    items: defaultItems,
    placeholder: "Select page size",
    label: "Items per page",
    size: "L",
  },
};

export const WithValue: Story = {
  args: {
    items: defaultItems,
    value: "25",
    placeholder: "Select page size",
    label: "Items per page",
    size: "L",
  },
};

export const SizeM: Story = {
  args: {
    items: defaultItems,
    placeholder: "Select page size",
    label: "Items per page",
    size: "M",
  },
};

export const Disabled: Story = {
  args: {
    items: defaultItems,
    value: "25",
    placeholder: "Select page size",
    label: "Items per page",
    disabled: true,
    size: "L",
  },
};

export const Interactive: Story = {
  render: function InteractiveRender(args) {
    const [value, setValue] = React.useState<string>("");

    return (
      <AppPageSizeSelect
        {...args}
        value={value}
        onChange={(newValue) => {
          setValue(newValue);
          args.onChange?.(newValue);
        }}
      />
    );
  },
  args: {
    items: defaultItems,
    placeholder: "Select page size",
    label: "Items per page",
    size: "L",
  },
};

export const CustomPageSizes: Story = {
  args: {
    items: [
      { value: "5", children: "5 per page" },
      { value: "15", children: "15 per page" },
      { value: "30", children: "30 per page" },
      { value: "75", children: "75 per page" },
      { value: "150", children: "150 per page" },
    ],
    placeholder: "Choose page size",
    label: "Results per page",
    size: "L",
  },
};

export const ManyOptions: Story = {
  args: {
    items: [
      { value: "5", children: "5" },
      { value: "10", children: "10" },
      { value: "15", children: "15" },
      { value: "20", children: "20" },
      { value: "25", children: "25" },
      { value: "50", children: "50" },
      { value: "75", children: "75" },
      { value: "100", children: "100" },
      { value: "150", children: "150" },
      { value: "200", children: "200" },
    ],
    placeholder: "Select page size",
    label: "Items per page",
    value: "25",
    size: "L",
  },
};
