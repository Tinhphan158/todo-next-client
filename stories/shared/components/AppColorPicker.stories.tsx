import AppColorPicker from "@/modules/shared/components/AppColorPicker";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import * as React from "react";

const meta = {
  title: "Shared/Components/AppColorPicker",
  component: AppColorPicker,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="w-[360px]">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof AppColorPicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: function DefaultRender(args) {
    const [value, setValue] = React.useState("#3366FF");
    return <AppColorPicker {...args} value={value} onChange={setValue} />;
  },
  args: {
    label: "Pick a color",
    helperText: "Return value format: #RRGGBB",
  },
};

export const Empty: Story = {
  render: function EmptyRender(args) {
    const [value, setValue] = React.useState("");
    return <AppColorPicker {...args} value={value} onChange={setValue} />;
  },
  args: {
    label: "Theme color",
    placeholder: "#RRGGBB",
  },
};

export const Disabled: Story = {
  args: {
    value: "#22C55E",
    disabled: true,
    label: "Readonly color",
  },
};
