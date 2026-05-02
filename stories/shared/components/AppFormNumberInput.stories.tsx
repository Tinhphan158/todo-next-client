import * as React from "react";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { AppFormNumberInput } from "@/module/shared/components/AppFormNumberInput";
import { InfoIcon } from "@/module/shared/icons";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { AppButton } from "@/module/shared/components/AppButton";

const meta = {
  title: "Shared/Components/AppFormNumberInput",
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
    const form = useForm({
      defaultValues: {
        quantity: 0,
      },
    });

    return (
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit((data) => alert(JSON.stringify(data, null, 2)))}
          className="space-y-4"
        >
          <AppFormNumberInput
            control={form.control}
            name="quantity"
            label="Quantity"
            placeholder="Enter quantity"
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
        age: 0,
      },
    });

    return (
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit((data) => alert(JSON.stringify(data, null, 2)))}
          className="space-y-4"
        >
          <AppFormNumberInput
            control={form.control}
            name="age"
            label="Age"
            placeholder="Enter your age"
            rules={{
              required: "Age is required",
              min: {
                value: 1,
                message: "Age must be at least 1",
              },
              max: {
                value: 120,
                message: "Age must be less than 120",
              },
            }}
          />
          <AppButton type="submit">Submit</AppButton>
        </form>
      </Form>
    );
  },
};

export const WithDigitLimit: Story = {
  render: function WithDigitLimitRender() {
    const form = useForm({
      defaultValues: {
        pinCode: 0,
      },
    });

    return (
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit((data) => alert(JSON.stringify(data, null, 2)))}
          className="space-y-4"
        >
          <AppFormNumberInput
            control={form.control}
            name="pinCode"
            label="4-Digit PIN Code"
            placeholder="Enter PIN"
            digitLimit={4}
            rules={{
              required: "PIN is required",
              min: {
                value: 1000,
                message: "PIN must be 4 digits",
              },
              max: {
                value: 9999,
                message: "PIN must be 4 digits",
              },
            }}
          />
          <AppButton type="submit">Submit</AppButton>
        </form>
      </Form>
    );
  },
};

export const WithDecimal: Story = {
  render: function WithDecimalRender() {
    const form = useForm({
      defaultValues: {
        price: 1234.56,
      },
    });

    return (
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit((data) => alert(JSON.stringify(data, null, 2)))}
          className="space-y-4"
        >
          <AppFormNumberInput
            control={form.control}
            name="price"
            label="Price (Decimal)"
            placeholder="Enter price"
            allowDecimal={true}
            decimalPlaces={2}
            startIcon={<span>$</span>}
          />
          <AppButton type="submit">Submit</AppButton>
        </form>
      </Form>
    );
  },
};

export const WithThousandSeparator: Story = {
  render: function WithThousandSeparatorRender() {
    const form = useForm({
      defaultValues: {
        amount: 1000000.2345,
      },
    });

    return (
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit((data) => alert(JSON.stringify(data, null, 2)))}
          className="space-y-4"
        >
          <AppFormNumberInput
            control={form.control}
            name="amount"
            label="Amount (Formatted)"
            placeholder="Enter amount"
            allowDecimal={true}
            decimalPlaces={4}
            showThousandSeparator={true}
            startIcon={<span>$</span>}
          />
          <AppButton type="submit">Submit</AppButton>
        </form>
      </Form>
    );
  },
};

export const WithIcons: Story = {
  render: function WithIconsRender() {
    const form = useForm({
      defaultValues: {
        price: 0,
      },
    });

    return (
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit((data) => alert(JSON.stringify(data, null, 2)))}
          className="space-y-4"
        >
          <AppFormNumberInput
            control={form.control}
            name="price"
            label="Price"
            placeholder="Enter price"
            startIcon={<span>$</span>}
            endIcon={<InfoIcon />}
          />
          <AppButton type="submit">Submit</AppButton>
        </form>
      </Form>
    );
  },
};

export const SizeMedium: Story = {
  render: function SizeMediumRender() {
    const form = useForm({
      defaultValues: {
        count: 0,
      },
    });

    return (
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit((data) => alert(JSON.stringify(data, null, 2)))}
          className="space-y-4"
        >
          <AppFormNumberInput
            control={form.control}
            name="count"
            label="Count"
            placeholder="Enter count"
            size="M"
          />
          <AppButton type="submit">Submit</AppButton>
        </form>
      </Form>
    );
  },
};

export const Disabled: Story = {
  render: function DisabledRender() {
    const form = useForm({
      defaultValues: {
        readOnlyValue: 100,
      },
    });

    return (
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit((data) => alert(JSON.stringify(data, null, 2)))}
          className="space-y-4"
        >
          <AppFormNumberInput
            control={form.control}
            name="readOnlyValue"
            label="Read Only Value"
            placeholder="Enter value"
            disabled
          />
          <AppButton type="submit">Submit</AppButton>
        </form>
      </Form>
    );
  },
};

export const LongDigitLimit: Story = {
  render: function LongDigitLimitRender() {
    const form = useForm({
      defaultValues: {
        phoneNumber: 0,
      },
    });

    return (
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit((data) => alert(JSON.stringify(data, null, 2)))}
          className="space-y-4"
        >
          <AppFormNumberInput
            control={form.control}
            name="phoneNumber"
            label="Phone Number (10 digits max)"
            placeholder="Enter phone number"
            digitLimit={10}
            rules={{
              required: "Phone number is required",
              min: {
                value: 1000000000,
                message: "Phone number must be 10 digits",
              },
            }}
          />
          <AppButton type="submit">Submit</AppButton>
        </form>
      </Form>
    );
  },
};

export const AdvancedDecimalExample: Story = {
  render: function AdvancedDecimalExampleRender() {
    const form = useForm({
      defaultValues: {
        weight: 123.456,
        temperature: -15.75,
        percentage: 98.5,
      },
    });

    return (
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit((data) => alert(JSON.stringify(data, null, 2)))}
          className="space-y-4"
        >
          <AppFormNumberInput
            control={form.control}
            name="weight"
            label="Weight (kg)"
            placeholder="Enter weight"
            allowDecimal={true}
            decimalPlaces={3}
            showThousandSeparator={true}
            digitLimit={10}
          />
          <AppFormNumberInput
            control={form.control}
            name="temperature"
            label="Temperature (°C)"
            placeholder="Enter temperature"
            allowDecimal={true}
            decimalPlaces={2}
            showThousandSeparator={false}
          />
          <AppFormNumberInput
            control={form.control}
            name="percentage"
            label="Percentage (%)"
            placeholder="Enter percentage"
            allowDecimal={true}
            decimalPlaces={1}
            endIcon={<span>%</span>}
            rules={{
              min: { value: 0, message: "Must be at least 0%" },
              max: { value: 100, message: "Must be at most 100%" },
            }}
          />
          <AppButton type="submit">Submit</AppButton>
        </form>
      </Form>
    );
  },
};

export const OrderQuantityForm: Story = {
  render: function OrderQuantityFormRender() {
    const form = useForm({
      defaultValues: {
        itemQuantity: 1,
        unitPrice: 1234.99,
        shippingCode: 0,
      },
    });

    const watchedValues = form.watch();
    const total =
      (watchedValues.itemQuantity || 0) * (watchedValues.unitPrice || 0);

    return (
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit((data) =>
            alert(JSON.stringify({ ...data, total }, null, 2)),
          )}
          className="space-y-4"
        >
          <AppFormNumberInput
            control={form.control}
            name="itemQuantity"
            label="Item Quantity"
            placeholder="Enter quantity"
            rules={{
              required: "Quantity is required",
              min: { value: 1, message: "Minimum quantity is 1" },
              max: { value: 999, message: "Maximum quantity is 999" },
            }}
            digitLimit={3}
          />
          <AppFormNumberInput
            control={form.control}
            name="unitPrice"
            label="Unit Price"
            placeholder="Enter price"
            startIcon={<span>$</span>}
            allowDecimal={true}
            decimalPlaces={2}
            showThousandSeparator={true}
            rules={{
              required: "Price is required",
              min: { value: 0.01, message: "Price must be greater than 0" },
            }}
            digitLimit={6}
          />
          <AppFormNumberInput
            control={form.control}
            name="shippingCode"
            label="Shipping Code"
            placeholder="Enter 5-digit code"
            rules={{
              required: "Shipping code is required",
              min: { value: 10000, message: "Code must be 5 digits" },
              max: { value: 99999, message: "Code must be 5 digits" },
            }}
            digitLimit={5}
          />
          <div className="rounded bg-gray-50 p-3">
            <strong>
              Total: $
              {total.toLocaleString("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </strong>
          </div>
          <AppButton type="submit">Place Order</AppButton>
        </form>
      </Form>
    );
  },
};
