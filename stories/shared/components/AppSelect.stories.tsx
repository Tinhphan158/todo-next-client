import * as React from "react";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import AppSelect from "@/module/shared/components/AppSelect";

const meta = {
  title: "Shared/Components/AppSelect",
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    disabled: {
      control: "boolean",
      description: "Whether the select is disabled",
    },
    placeholder: {
      control: "text",
      description: "Placeholder text when no value is selected",
    },
  },
  decorators: [
    (Story) => (
      <div className="w-[400px]">
        <Story />
      </div>
    ),
  ],
} satisfies Meta;

export default meta;
type Story = StoryObj;

const sampleItems = [
  { value: "apple", children: "Apple" },
  { value: "banana", children: "Banana" },
  { value: "orange", children: "Orange" },
  { value: "grape", children: "Grape" },
  { value: "mango", children: "Mango" },
];

const countries = [
  { value: "us", children: "United States" },
  { value: "uk", children: "United Kingdom" },
  { value: "ca", children: "Canada" },
  { value: "au", children: "Australia" },
  { value: "de", children: "Germany" },
  { value: "fr", children: "France" },
  { value: "jp", children: "Japan" },
  { value: "cn", children: "China" },
];

export const Default: Story = {
  render: function DefaultRender(args) {
    const [value, setValue] = React.useState<string>("");

    return (
      <AppSelect
        {...args}
        items={sampleItems}
        value={value}
        onChange={setValue}
        placeholder="Select a fruit"
      />
    );
  },
};

export const WithLabel: Story = {
  render: function WithLabelRender(args) {
    const [value, setValue] = React.useState<string>("");

    return (
      <AppSelect
        {...args}
        items={sampleItems}
        value={value}
        onChange={setValue}
        placeholder="Select a fruit"
        label={
          <label className="text-body-s text-neutral-950">Favorite Fruit</label>
        }
      />
    );
  },
};

export const WithPreselectedValue: Story = {
  render: function WithPreselectedValueRender(args) {
    const [value, setValue] = React.useState<string>("banana");

    return (
      <AppSelect
        {...args}
        items={sampleItems}
        value={value}
        onChange={setValue}
        placeholder="Select a fruit"
        label={
          <label className="text-body-s text-neutral-950">Favorite Fruit</label>
        }
      />
    );
  },
};

export const Disabled: Story = {
  render: function DisabledRender(args) {
    const [value, setValue] = React.useState<string>("");

    return (
      <AppSelect
        {...args}
        items={sampleItems}
        value={value}
        onChange={setValue}
        placeholder="Select a fruit"
        label={
          <label className="text-body-s text-neutral-950">Favorite Fruit</label>
        }
        disabled
      />
    );
  },
};

export const DisabledWithValue: Story = {
  render: function DisabledWithValueRender(args) {
    const [value, setValue] = React.useState<string>("banana");

    return (
      <AppSelect
        {...args}
        items={sampleItems}
        value={value}
        onChange={setValue}
        placeholder="Select a fruit"
        label={
          <label className="text-body-s text-neutral-950">Favorite Fruit</label>
        }
        disabled
      />
    );
  },
};

export const LongList: Story = {
  render: function LongListRender(args) {
    const [value, setValue] = React.useState<string>("");

    return (
      <AppSelect
        {...args}
        items={countries}
        value={value}
        onChange={setValue}
        placeholder="Select a country"
        label={<label className="text-body-s text-neutral-950">Country</label>}
      />
    );
  },
};

export const ManyItems: Story = {
  render: function ManyItemsRender(args) {
    const [value, setValue] = React.useState<string>("");

    const items = Array.from({ length: 20 }, (_, i) => ({
      value: `item-${i + 1}`,
      children: `Item ${i + 1}`,
    }));

    return (
      <AppSelect
        {...args}
        items={items}
        value={value}
        onChange={setValue}
        placeholder="Select an item"
        label={<label className="text-body-s text-neutral-950">Items</label>}
      />
    );
  },
};

export const WithCustomContent: Story = {
  render: function WithCustomContentRender(args) {
    const [value, setValue] = React.useState<string>("");

    const customItems = [
      { value: "low", children: "🔵 Low Priority" },
      { value: "medium", children: "🟡 Medium Priority" },
      { value: "high", children: "🔴 High Priority" },
      { value: "urgent", children: "🚨 Urgent" },
    ];

    return (
      <AppSelect
        {...args}
        items={customItems}
        value={value}
        onChange={setValue}
        placeholder="Select priority"
        label={
          <label className="text-body-s text-neutral-950">Priority Level</label>
        }
      />
    );
  },
};

export const WithStatusColors: Story = {
  render: function WithStatusColorsRender(args) {
    const [value, setValue] = React.useState<string>("");

    const statusItems = [
      {
        value: "active",
        children: <span className="text-positives-500">Active</span>,
      },
      {
        value: "inactive",
        children: <span className="text-negative-500">Inactive</span>,
      },
    ];

    return (
      <AppSelect
        {...args}
        items={statusItems}
        value={value}
        onChange={setValue}
        placeholder="Select status"
        label={<label className="text-body-s text-neutral-950">Status</label>}
      />
    );
  },
};
