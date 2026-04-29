import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { FormDatePickerField } from "@/module/shared/components/AppFormDatePicker";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { AppButton } from "@/module/shared/components/AppButton";
import { useState, useEffect } from "react";

const meta = {
  title: "Shared/Components/AppFormDatePicker",
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

export const SingleDate: Story = {
  render: function SingleDateRender() {
    const form = useForm({
      defaultValues: {
        date: undefined,
      },
    });

    return (
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit((data) => console.log(data))}
          className="space-y-4"
        >
          <FormDatePickerField
            control={form.control}
            name="date"
            label="Select Date"
            type="single"
            startPlaceholder="Pick a date"
          />
          <AppButton type="submit">Submit</AppButton>
        </form>
      </Form>
    );
  },
};

export const DateRange: Story = {
  render: function DateRangeRender() {
    const form = useForm({
      defaultValues: {
        dateRange: undefined,
      },
    });

    return (
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit((data) => console.log(data))}
          className="space-y-4"
        >
          <FormDatePickerField
            control={form.control}
            name="dateRange"
            label="Select Date Range"
            type="range"
            startPlaceholder="Start date"
            endPlaceholder="End date"
          />
          <AppButton type="submit">Submit</AppButton>
        </form>
      </Form>
    );
  },
};

export const WithValidation: Story = {
  render: function WithValidationRender() {
    const form = useForm({
      defaultValues: {
        startDate: undefined,
      },
    });

    return (
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit((data) => alert(JSON.stringify(data)))}
          className="space-y-4"
        >
          <FormDatePickerField
            control={form.control}
            name="startDate"
            label="Start Date"
            type="single"
            startPlaceholder="Select start date"
            rules={{
              required: "Date is required",
            }}
          />
          <AppButton type="submit">Submit</AppButton>
        </form>
      </Form>
    );
  },
};

export const WithHelperText: Story = {
  render: function WithHelperTextRender() {
    const form = useForm({
      defaultValues: {
        period: undefined,
      },
    });

    return (
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit((data) => console.log(data))}
          className="space-y-4"
        >
          <FormDatePickerField
            control={form.control}
            name="period"
            label="Select Period"
            helperText="Choose a date range to filter results"
            type="range"
            startPlaceholder="From"
            endPlaceholder="To"
          />
          <AppButton type="submit">Submit</AppButton>
        </form>
      </Form>
    );
  },
};

export const WithCustomPlaceholders: Story = {
  render: function WithCustomPlaceholdersRender() {
    const form = useForm({
      defaultValues: {
        booking: undefined,
      },
    });

    return (
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit((data) => console.log(data))}
          className="space-y-4"
        >
          <FormDatePickerField
            control={form.control}
            name="booking"
            label="Hotel Booking"
            type="range"
            startPlaceholder="Check-in date"
            endPlaceholder="Check-out date"
          />
          <AppButton type="submit">Book Now</AppButton>
        </form>
      </Form>
    );
  },
};

export const CompleteForm: Story = {
  render: function CompleteFormRender() {
    const form = useForm({
      defaultValues: {
        eventName: "",
        startDate: undefined,
        endDate: undefined,
        registrationDeadline: undefined,
      },
    });

    return (
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit((data) =>
            alert(JSON.stringify(data, null, 2)),
          )}
          className="space-y-4"
        >
          <FormDatePickerField
            control={form.control}
            name="startDate"
            label="Start Date"
            type="single"
            startPlaceholder="Event start date"
            rules={{ required: "Start date is required" }}
          />
          <FormDatePickerField
            control={form.control}
            name="endDate"
            label="End Date"
            type="single"
            startPlaceholder="Event end date"
            rules={{ required: "End date is required" }}
          />
          <FormDatePickerField
            control={form.control}
            name="registrationDeadline"
            label="Registration Period"
            helperText="Select the registration window"
            type="range"
            startPlaceholder="Registration opens"
            endPlaceholder="Registration closes"
            rules={{ required: "Registration period is required" }}
          />
          <AppButton type="submit">Create Event</AppButton>
        </form>
      </Form>
    );
  },
};

export const InteractiveWithExternalState: Story = {
  render: function InteractiveWithExternalStateRender() {
    const [externalDate, setExternalDate] = useState<Date | undefined>(
      undefined,
    );
    const [externalRange, setExternalRange] = useState<
      { start?: Date; end?: Date } | undefined
    >(undefined);

    const form = useForm<{
      date: Date | undefined;
      range: { start?: Date; end?: Date } | undefined;
    }>({
      defaultValues: {
        date: undefined,
        range: undefined,
      },
    });

    useEffect(() => {
      form.setValue("date", externalDate);
    }, [externalDate, form]);

    useEffect(() => {
      form.setValue("range", externalRange);
    }, [externalRange, form]);

    const handleExternalUpdate = () => {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      setExternalDate(tomorrow);

      const startDate = new Date();
      const endDate = new Date();
      endDate.setDate(endDate.getDate() + 7);
      setExternalRange({ start: startDate, end: endDate });
    };

    const handleReset = () => {
      setExternalDate(undefined);
      setExternalRange(undefined);
      form.reset();
    };

    return (
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit((data) => console.log(data))}
          className="space-y-4"
        >
          <FormDatePickerField
            control={form.control}
            name="date"
            label="Single Date"
            type="single"
            startPlaceholder="Select a date"
          />
          <FormDatePickerField
            control={form.control}
            name="range"
            label="Date Range"
            type="range"
            startPlaceholder="Start date"
            endPlaceholder="End date"
          />

          <div className="flex gap-2">
            <AppButton type="button" onClick={handleExternalUpdate}>
              Set External Values
            </AppButton>
            <AppButton type="button" onClick={handleReset} variant="secondary">
              Reset
            </AppButton>
            <AppButton type="submit">Submit</AppButton>
          </div>

          <div className="mt-4 rounded border p-3 text-sm">
            <div className="font-semibold">External State:</div>
            <div>
              Single Date: {externalDate?.toLocaleDateString() || "None"}
            </div>
            <div>
              Range Start:{" "}
              {externalRange?.start?.toLocaleDateString() || "None"}
            </div>
            <div>
              Range End: {externalRange?.end?.toLocaleDateString() || "None"}
            </div>
          </div>
        </form>
      </Form>
    );
  },
};
