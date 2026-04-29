import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import AppInputTitle from "@/module/shared/components/AppInputTitle";

const meta: Meta<typeof AppInputTitle> = {
  title: "Shared/Components/AppInputTitle",
  component: AppInputTitle,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  argTypes: {
    title: {
      control: "text",
      description: "The title text to display",
      table: {
        type: { summary: "React.ReactNode" },
      },
    },
    count: {
      control: "number",
      description: "Total character count limit",
      table: {
        type: { summary: "number" },
        defaultValue: { summary: "0" },
      },
    },
    current: {
      control: "number",
      description: "Current character count",
      table: {
        type: { summary: "number" },
        defaultValue: { summary: "0" },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    title: "Question Title",
    count: 100,
    current: 25,
  },
};

export const WithoutCounter: Story = {
  args: {
    title: "Simple Title",
  },
};

export const SimpleTitle: Story = {
  args: {
    title: "Description",
    count: 0,
    current: 0,
  },
};

export const NearLimit: Story = {
  args: {
    title: "Answer Text",
    count: 500,
    current: 485,
  },
};

export const AtLimit: Story = {
  args: {
    title: "Comment",
    count: 250,
    current: 250,
  },
};

export const OverLimit: Story = {
  args: {
    title: "Bio",
    count: 200,
    current: 215,
  },
};

export const LongTitle: Story = {
  args: {
    title:
      "Very Long Input Title That Might Wrap to Multiple Lines in Some Cases",
    count: 1000,
    current: 456,
  },
};

export const CustomContent: Story = {
  args: {
    title: (
      <div className="flex items-center gap-2">
        <span className="text-red-500">*</span>
        <span>Required Field</span>
      </div>
    ),
    count: 300,
    current: 150,
  },
};

export const ZeroCount: Story = {
  args: {
    title: "New Field",
    count: 100,
    current: 0,
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="w-80 space-y-6">
      <div>
        <h3 className="mb-2 text-lg font-semibold">Title Only</h3>
        <AppInputTitle title="Simple Title" />
      </div>

      <div>
        <h3 className="mb-2 text-lg font-semibold">With Counter - Normal</h3>
        <AppInputTitle title="Question Title" count={100} current={25} />
      </div>

      <div>
        <h3 className="mb-2 text-lg font-semibold">Near Limit</h3>
        <AppInputTitle title="Answer Text" count={500} current={485} />
      </div>

      <div>
        <h3 className="mb-2 text-lg font-semibold">At Limit</h3>
        <AppInputTitle title="Comment" count={250} current={250} />
      </div>

      <div>
        <h3 className="mb-2 text-lg font-semibold">Over Limit</h3>
        <AppInputTitle title="Bio" count={200} current={215} />
      </div>

      <div>
        <h3 className="mb-2 text-lg font-semibold">Required Field</h3>
        <AppInputTitle
          title={
            <div className="flex items-center gap-1">
              <span className="text-red-500">*</span>
              <span>Required Field</span>
            </div>
          }
          count={300}
          current={150}
        />
      </div>
    </div>
  ),
};
