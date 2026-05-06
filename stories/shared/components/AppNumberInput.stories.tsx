import * as React from "react";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { AppNumberInput } from "@/modules/shared/components/AppNumberInput";
import { InfoIcon } from "@/modules/shared/icons";

const meta = {
  title: "Shared/Components/AppNumberInput",
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="w-[500px]">
        <Story />
      </div>
    ),
  ],
} satisfies Meta;

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: function DefaultRender() {
    const [value, setValue] = React.useState<number>(0);

    return (
      <div className="space-y-4">
        <AppNumberInput
          label="Quantity"
          placeholder="Enter quantity"
          value={value}
          onChange={setValue}
        />
        <div className="text-sm text-gray-600">Current value: {value}</div>
      </div>
    );
  },
};

export const WithDecimal: Story = {
  render: function WithDecimalRender() {
    const [value, setValue] = React.useState<number>(1234.56);

    return (
      <div className="space-y-4">
        <AppNumberInput
          label="Price (Decimal)"
          placeholder="Enter price"
          value={value}
          onChange={setValue}
          allowDecimal={true}
          decimalPlaces={2}
          startIcon={<span>$</span>}
        />
        <div className="text-sm text-gray-600">Current value: {value}</div>
      </div>
    );
  },
};

export const WithThousandSeparator: Story = {
  render: function WithThousandSeparatorRender() {
    const [value, setValue] = React.useState<number>(1000000.2345);

    return (
      <div className="space-y-4">
        <AppNumberInput
          label="Amount (Formatted)"
          placeholder="Enter amount"
          value={value}
          onChange={setValue}
          allowDecimal={true}
          decimalPlaces={4}
          showThousandSeparator={true}
          startIcon={<span>$</span>}
        />
        <div className="text-sm text-gray-600">Current value: {value}</div>
      </div>
    );
  },
};

export const WithDigitLimit: Story = {
  render: function WithDigitLimitRender() {
    const [value, setValue] = React.useState<number>(0);

    return (
      <div className="space-y-4">
        <AppNumberInput
          label="4-Digit PIN Code"
          placeholder="Enter PIN"
          value={value}
          onChange={setValue}
          digitLimit={4}
        />
        <div className="text-sm text-gray-600">Current value: {value}</div>
      </div>
    );
  },
};

export const WithIcons: Story = {
  render: function WithIconsRender() {
    const [value, setValue] = React.useState<number>(0);

    return (
      <div className="space-y-4">
        <AppNumberInput
          label="Price"
          placeholder="Enter price"
          value={value}
          onChange={setValue}
          startIcon={<span>$</span>}
          endIcon={<InfoIcon />}
        />
        <div className="text-sm text-gray-600">Current value: {value}</div>
      </div>
    );
  },
};

export const SizeMedium: Story = {
  render: function SizeMediumRender() {
    const [value, setValue] = React.useState<number>(0);

    return (
      <div className="space-y-4">
        <AppNumberInput
          label="Count"
          placeholder="Enter count"
          value={value}
          onChange={setValue}
          size="M"
        />
        <div className="text-sm text-gray-600">Current value: {value}</div>
      </div>
    );
  },
};

export const Disabled: Story = {
  render: function DisabledRender() {
    const [value, setValue] = React.useState<number>(100);

    return (
      <div className="space-y-4">
        <AppNumberInput
          label="Read Only Value"
          placeholder="Enter value"
          value={value}
          onChange={setValue}
          disabled
        />
        <div className="text-sm text-gray-600">Current value: {value}</div>
      </div>
    );
  },
};

export const RealTimeFormatting: Story = {
  render: function RealTimeFormattingRender() {
    const [value, setValue] = React.useState<number>(0);

    return (
      <div className="space-y-4">
        <AppNumberInput
          label="Large Number with Real-time Formatting"
          placeholder="Type a large number"
          helperText="Watch the thousand separators appear as you type!"
          value={value}
          onChange={setValue}
          allowDecimal={true}
          decimalPlaces={2}
          showThousandSeparator={true}
          digitLimit={10}
        />
        <div className="text-sm text-gray-600">Current value: {value}</div>
        <div className="text-xs text-gray-500">Try typing: 1234567890</div>
      </div>
    );
  },
};
