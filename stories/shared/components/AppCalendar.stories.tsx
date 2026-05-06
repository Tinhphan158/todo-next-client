import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { useState } from "react";
import AppCalendar from "@/modules/shared/components/AppCalendar";

const meta = {
  title: "Shared/Components/AppCalendar",
  component: AppCalendar,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    type: {
      control: "select",
      options: ["single", "range"],
      description: "The selection type of the calendar",
    },
    initialMonth: {
      control: "date",
      description: "The initial month to display",
    },
  },
} satisfies Meta<typeof AppCalendar>;

export default meta;
type Story = StoryObj<typeof meta>;

// Single Date Selection
export const Single: Story = {
  args: {
    type: "single",
  },
};

// Range Selection
export const Range: Story = {
  args: {
    type: "range",
  },
};

// With Selected Date
export const WithSelectedDate: Story = {
  args: {
    type: "single",
    value: new Date("2026-01-16"),
  },
};

// With Selected Range
export const WithSelectedRange: Story = {
  args: {
    type: "range",
    value: { start: new Date("2026-01-07"), end: new Date("2026-01-14") },
  },
};

// With Initial Month
export const WithInitialMonth: Story = {
  args: {
    type: "single",
    initialMonth: new Date("2025-06-01"),
  },
};

// With Range Partial
export const WithRangePartial: Story = {
  args: {
    type: "range",
    value: { start: new Date("2026-01-07") },
  },
};

// With Single Start Date
export const WithRangeStartDate: Story = {
  args: {
    type: "range",
    value: { start: new Date("2026-01-07") },
  },
};

// With Disabled Dates
export const WithDisabledDates: Story = {
  args: {
    type: "single",
    disabledCondition: (date: Date) => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return date < today;
    },
  },
};

// Interactive Single Date Selection
export const InteractiveSingle: Story = {
  render: () => {
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(
      new Date("2026-01-16"),
    );
    return (
      <div>
        <AppCalendar
          type="single"
          value={selectedDate}
          onChange={(date) => setSelectedDate(date as Date)}
        />
        <div className="mt-4 text-sm">
          Selected: {selectedDate?.toLocaleDateString()}
        </div>
      </div>
    );
  },
};

// Interactive Range Selection
export const InteractiveRange: Story = {
  render: () => {
    const [range, setRange] = useState<{ start?: Date; end?: Date }>({});
    return (
      <div>
        <AppCalendar
          type="range"
          value={range}
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
