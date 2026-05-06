import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { AppTextArea } from "@/modules/shared/components/AppTextArea";

const meta = {
  title: "Shared/Components/AppTextArea",
  component: AppTextArea,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["L", "M", "S"],
      description: "The size of the textarea",
    },
    disabled: {
      control: "boolean",
      description: "Whether the textarea is disabled",
    },
    placeholder: {
      control: "text",
      description: "Placeholder text",
    },
    rows: {
      control: "number",
      description: "Number of rows",
    },
    cols: {
      control: "number",
      description: "Number of columns",
    },
  },
  decorators: [
    (Story) => (
      <div className="w-[500px]">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof AppTextArea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: "Enter text...",
    size: "L",
    rows: 4,
  },
};

export const WithLabel: Story = {
  args: {
    label: "Description",
    placeholder: "Enter your description",
    size: "L",
    rows: 4,
  },
};

export const WithHelperText: Story = {
  args: {
    label: "Bio",
    placeholder: "Tell us about yourself",
    helperText: "Maximum 500 characters",
    size: "L",
    rows: 4,
  },
};

export const SizeLarge: Story = {
  args: {
    label: "Large Text Area",
    placeholder: "Large size textarea",
    size: "L",
    rows: 6,
  },
};

export const SizeMedium: Story = {
  args: {
    label: "Medium Text Area",
    placeholder: "Medium size textarea",
    size: "M",
    rows: 4,
  },
};

export const SizeSmall: Story = {
  args: {
    label: "Small Text Area",
    placeholder: "Small size textarea",
    size: "S",
    rows: 3,
  },
};

export const Disabled: Story = {
  args: {
    label: "Disabled Text Area",
    placeholder: "This textarea is disabled",
    disabled: true,
    size: "L",
    rows: 4,
  },
};

export const DisabledWithValue: Story = {
  args: {
    label: "Disabled with Value",
    value: "Cannot edit this text content",
    disabled: true,
    size: "L",
    rows: 4,
  },
};

export const Complete: Story = {
  args: {
    label: "Complete Example",
    placeholder: "Enter your message",
    helperText: "This is a complete textarea with all features",
    size: "L",
    rows: 5,
  },
};
