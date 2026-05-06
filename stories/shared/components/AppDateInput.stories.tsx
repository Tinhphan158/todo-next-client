import * as React from "react";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import AppDateInput from "@/modules/shared/components/AppDateInput";

const meta = {
  title: "Shared/Components/AppDateInput",
  component: AppDateInput,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    type: {
      control: "select",
      options: ["single", "range"],
      description: "Type of date input - single or range",
    },
    size: {
      control: "select",
      options: ["L", "M", "S"],
      description: "The size of the date input",
    },
    isDisabled: {
      control: "boolean",
      description: "Whether the date input is disabled",
    },
    startPlaceholder: {
      control: "text",
      description: "Placeholder text for the start date input",
    },
    endPlaceholder: {
      control: "text",
      description: "Placeholder text for the end date input (range type only)",
    },
  },
  decorators: [
    (Story) => (
      <div className="w-[400px]">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof AppDateInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    type: "single",
    size: "L",
    isDisabled: false,
  },
};

export const WithValue: Story = {
  render: function WithValueRender() {
    const [value, setValue] = React.useState<Date>(new Date());

    return (
      <AppDateInput
        type="single"
        value={value}
        onChange={(date) => setValue(date as Date)}
        size="L"
      />
    );
  },
};

export const SizeLarge: Story = {
  args: {
    type: "single",
    size: "L",
  },
};

export const SizeMedium: Story = {
  args: {
    type: "single",
    size: "M",
  },
};

export const SizeSmall: Story = {
  args: {
    type: "single",
    size: "S",
  },
};

export const Disabled: Story = {
  args: {
    type: "single",
    size: "L",
    isDisabled: true,
  },
};

export const DisabledWithValue: Story = {
  render: function DisabledWithValueRender() {
    const [value] = React.useState<Date>(new Date());

    return (
      <AppDateInput type="single" value={value} size="L" isDisabled={true} />
    );
  },
};

export const RangeDefault: Story = {
  args: {
    type: "range",
    size: "L",
  },
};

export const RangeWithValues: Story = {
  render: function RangeWithValuesRender() {
    const [value, setValue] = React.useState<{ start?: Date; end?: Date }>({
      start: new Date(2025, 11, 1),
      end: new Date(2025, 11, 31),
    });

    return (
      <AppDateInput
        type="range"
        value={value}
        onChange={(date) => setValue(date as { start?: Date; end?: Date })}
        size="L"
      />
    );
  },
};

export const RangeWithStartOnly: Story = {
  render: function RangeWithStartOnlyRender() {
    const [value, setValue] = React.useState<{ start?: Date; end?: Date }>({
      start: new Date(2025, 11, 15),
    });

    return (
      <AppDateInput
        type="range"
        value={value}
        onChange={(date) => setValue(date as { start?: Date; end?: Date })}
        size="L"
      />
    );
  },
};

export const RangeSizeMedium: Story = {
  args: {
    type: "range",
    size: "M",
  },
};

export const RangeSizeSmall: Story = {
  args: {
    type: "range",
    size: "S",
  },
};

export const RangeDisabled: Story = {
  args: {
    type: "range",
    size: "L",
    isDisabled: true,
  },
};

export const AllSizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <span className="w-8 text-neutral-500">L:</span>
        <AppDateInput type="single" size="L" />
      </div>
      <div className="flex items-center gap-2">
        <span className="w-8 text-neutral-500">M:</span>
        <AppDateInput type="single" size="M" />
      </div>
      <div className="flex items-center gap-2">
        <span className="w-8 text-neutral-500">S:</span>
        <AppDateInput type="single" size="S" />
      </div>
    </div>
  ),
};

export const BothTypes: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <span className="w-20 text-neutral-500">Single:</span>
        <AppDateInput type="single" size="L" />
      </div>
      <div className="flex items-center gap-2">
        <span className="w-20 text-neutral-500">Range:</span>
        <AppDateInput type="range" size="L" />
      </div>
    </div>
  ),
};

export const WithPlaceholder: Story = {
  args: {
    type: "single",
    size: "L",
    startPlaceholder: "Select a date",
  },
};

export const RangeWithPlaceholders: Story = {
  args: {
    type: "range",
    size: "L",
    startPlaceholder: "Start date",
    endPlaceholder: "End date",
  },
};

export const RangeWithStartPlaceholderOnly: Story = {
  args: {
    type: "range",
    size: "L",
    startPlaceholder: "From",
  },
};

export const RangeWithEndPlaceholderOnly: Story = {
  args: {
    type: "range",
    size: "L",
    endPlaceholder: "To",
  },
};

export const InteractiveSingle: Story = {
  render: function InteractiveSingleRender() {
    const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(
      new Date("2026-12-01"),
    );
    return (
      <div>
        <AppDateInput
          type="single"
          value={selectedDate}
          onChange={(date) => setSelectedDate(date as Date)}
          size="L"
          startPlaceholder="Select date"
        />
        <div className="mt-4 text-sm">
          Selected: {selectedDate ? selectedDate.toISOString() : "Not selected"}
        </div>
      </div>
    );
  },
};

export const InteractiveRange: Story = {
  render: function InteractiveRangeRender() {
    const [range, setRange] = React.useState<{ start?: Date; end?: Date }>({
      start: new Date("2026-12-01"),
      end: new Date("2026-12-15"),
    });
    return (
      <div>
        <AppDateInput
          type="range"
          value={range}
          onChange={(range) => setRange(range as { start?: Date; end?: Date })}
          size="L"
          startPlaceholder="Start date"
          endPlaceholder="End date"
        />
        <div className="mt-4 text-sm">
          Start: {range.start ? range.start.toISOString() : "Not selected"}
          <br />
          End: {range.end ? range.end.toISOString() : "Not selected"}
        </div>
        <button
          onClick={() => setRange({})}
          className="mt-2 rounded border px-3 py-1 text-sm"
        >
          Clear Selection
        </button>
      </div>
    );
  },
};
