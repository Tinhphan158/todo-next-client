import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { useState } from "react";
import AppDatePicker from "@/modules/shared/components/AppDatePicker";

const meta = {
  title: "Shared/Components/AppDatePicker",
  component: AppDatePicker,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    type: {
      control: "select",
      options: ["single", "range"],
      description: "The selection type of the date picker",
    },
    startPlaceholder: {
      control: "text",
      description: "Placeholder text for the start date input",
    },
    endPlaceholder: {
      control: "text",
      description:
        "Placeholder text for the end date input (only for range type)",
    },
  },
} satisfies Meta<typeof AppDatePicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Single: Story = {
  args: {
    type: "single",
  },
};

export const Range: Story = {
  args: {
    type: "range",
  },
};

export const WithSelectedDate: Story = {
  args: {
    type: "single",
    value: new Date("2026-01-16"),
  },
};

export const WithSelectedRange: Story = {
  args: {
    type: "range",
    value: { start: new Date("2026-01-07"), end: new Date("2026-01-14") },
  },
};

export const WithRangePartial: Story = {
  args: {
    type: "range",
    value: { start: new Date("2026-01-07") },
  },
};

export const WithCustomPlaceholders: Story = {
  args: {
    type: "range",
    startPlaceholder: "Check-in date",
    endPlaceholder: "Check-out date",
  },
};

export const SingleWithPlaceholder: Story = {
  args: {
    type: "single",
    startPlaceholder: "Select a date",
  },
};

export const InteractiveSingle: Story = {
  render: () => {
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(
      new Date("2026-01-16"),
    );
    return (
      <div>
        <AppDatePicker
          type="single"
          value={selectedDate}
          startPlaceholder="Pick a date"
          onChange={(date) => setSelectedDate(date as Date)}
        />
        <div className="mt-4 text-sm">
          Selected: {selectedDate?.toLocaleDateString()}
        </div>
      </div>
    );
  },
};

export const InteractiveRange: Story = {
  render: () => {
    const [range, setRange] = useState<{ start?: Date; end?: Date }>({});
    return (
      <div>
        <AppDatePicker
          type="range"
          value={range}
          startPlaceholder="Start date"
          endPlaceholder="End date"
          onChange={(range) => setRange(range as { start?: Date; end?: Date })}
        />
        <div className="mt-4 text-sm">
          Start: {range.start?.toLocaleDateString() || "Not selected"}
          <br />
          End: {range.end?.toLocaleDateString() || "Not selected"}
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
