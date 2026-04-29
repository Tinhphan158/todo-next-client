import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import AppTooltip from "@/module/shared/components/AppTooltip";
import { AppButton } from "@/module/shared/components/AppButton";
import { InfoIcon } from "@/module/shared/icons";

const meta = {
  title: "Shared/Components/AppTooltip",
  component: AppTooltip,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    align: {
      control: "select",
      options: ["start", "center", "end"],
      description: "Alignment of the tooltip relative to the trigger",
    },
    side: {
      control: "select",
      options: ["top", "right", "bottom", "left"],
      description: "Side where the tooltip appears",
    },
    offset: {
      control: "number",
      description: "Offset distance from the trigger",
    },
  },
} satisfies Meta<typeof AppTooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

// Basic Usage
export const Default: Story = {
  args: {
    trigger: <AppButton>Hover me</AppButton>,
    content: "This is a tooltip",
  },
};

// Different Sides
export const Top: Story = {
  args: {
    trigger: <AppButton>Top Tooltip</AppButton>,
    content: "This tooltip appears on top",
    side: "top",
  },
};

export const Right: Story = {
  args: {
    trigger: <AppButton>Right Tooltip</AppButton>,
    content: "This tooltip appears on the right",
    side: "right",
  },
};

export const Bottom: Story = {
  args: {
    trigger: <AppButton>Bottom Tooltip</AppButton>,
    content: "This tooltip appears on the bottom",
    side: "bottom",
  },
};

export const Left: Story = {
  args: {
    trigger: <AppButton>Left Tooltip</AppButton>,
    content: "This tooltip appears on the left",
    side: "left",
  },
};

// Different Alignments
export const AlignStart: Story = {
  args: {
    trigger: <AppButton>Start Aligned</AppButton>,
    content: "This tooltip is aligned to the start",
    align: "start",
    side: "top",
  },
};

export const AlignCenter: Story = {
  args: {
    trigger: <AppButton>Center Aligned</AppButton>,
    content: "This tooltip is aligned to the center",
    align: "center",
    side: "top",
  },
};

export const AlignEnd: Story = {
  args: {
    trigger: <AppButton>End Aligned</AppButton>,
    content: "This tooltip is aligned to the end",
    align: "end",
    side: "top",
  },
};

// With Offset
export const WithOffset: Story = {
  args: {
    trigger: <AppButton>With Offset</AppButton>,
    content: "This tooltip has custom offset",
    side: "top",
    offset: 20,
  },
};

// Different Trigger Types
export const IconTrigger: Story = {
  args: {
    trigger: (
      <button className="rounded-full p-2 hover:bg-gray-100">
        <InfoIcon />
      </button>
    ),
    content: "Information tooltip",
    side: "top",
  },
};

export const TextTrigger: Story = {
  args: {
    trigger: (
      <span className="cursor-help underline decoration-dotted">
        Hover over this text
      </span>
    ),
    content: "This is helpful information about the text",
    side: "top",
  },
};

// Rich Content
export const RichContent: Story = {
  args: {
    trigger: <AppButton>Rich Content</AppButton>,
    content: (
      <div className="space-y-2">
        <div className="font-semibold">Tooltip Title</div>
        <div className="text-sm text-gray-600">
          This tooltip contains multiple elements including:
        </div>
        <ul className="list-inside list-disc text-sm">
          <li>Bulleted lists</li>
          <li>Different text styles</li>
          <li>Multiple paragraphs</li>
        </ul>
      </div>
    ),
    side: "right",
  },
};

export const LongContent: Story = {
  args: {
    trigger: <AppButton>Long Content</AppButton>,
    content: (
      <div>
        This is a very long tooltip content that demonstrates how the tooltip
        handles longer text. The tooltip has a fixed width of 254px and will
        wrap content accordingly. This can be useful for providing detailed
        explanations or instructions.
      </div>
    ),
    side: "top",
  },
};

// All Sides Demo
export const AllSides: Story = {
  render: () => (
    <div className="grid grid-cols-3 gap-8 p-8">
      <div></div>
      <AppTooltip
        trigger={<AppButton>Top</AppButton>}
        content="Tooltip on top"
        side="top"
      />
      <div></div>

      <AppTooltip
        trigger={<AppButton>Left</AppButton>}
        content="Tooltip on left"
        side="left"
      />
      <div className="flex items-center justify-center">
        <span className="text-gray-500">Hover any button</span>
      </div>
      <AppTooltip
        trigger={<AppButton>Right</AppButton>}
        content="Tooltip on right"
        side="right"
      />

      <div></div>
      <AppTooltip
        trigger={<AppButton>Bottom</AppButton>}
        content="Tooltip on bottom"
        side="bottom"
      />
      <div></div>
    </div>
  ),
};

// All Alignments Demo
export const AllAlignments: Story = {
  render: () => (
    <div className="flex flex-col items-center gap-4">
      <AppTooltip
        trigger={<AppButton>Start Aligned</AppButton>}
        content="Start aligned tooltip"
        side="top"
        align="start"
      />
      <AppTooltip
        trigger={<AppButton>Center Aligned</AppButton>}
        content="Center aligned tooltip"
        side="top"
        align="center"
      />
      <AppTooltip
        trigger={<AppButton>End Aligned</AppButton>}
        content="End aligned tooltip"
        side="top"
        align="end"
      />
    </div>
  ),
};
