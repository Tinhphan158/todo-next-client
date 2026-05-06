import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { useState } from "react";
import AppTabs from "@/modules/shared/components/AppTabs";

const meta: Meta<typeof AppTabs> = {
  title: "Shared/Components/AppTabs",
  component: AppTabs,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  argTypes: {
    items: {
      control: "object",
      description: "Array of tab items to display",
      table: {
        type: { summary: "TabItem[]" },
      },
    },
    selectedTab: {
      control: "text",
      description: "ID of the currently selected tab",
      table: {
        type: { summary: "string" },
      },
    },
    size: {
      control: "select",
      options: ["L", "M"],
      description: "Size variant of the tabs",
      table: {
        type: { summary: "TabSize" },
        defaultValue: { summary: "L" },
      },
    },
    disabled: {
      control: "boolean",
      description: "Whether all tabs are disabled",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    onClick: {
      action: "clicked",
      description: "Callback function when a tab is clicked",
      table: {
        type: { summary: "(id: string) => void" },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const basicTabs = [
  {
    id: "tab1",
    children: "Overview",
  },
  {
    id: "tab2",
    children: "Details",
  },
  {
    id: "tab3",
    children: "Settings",
  },
];

const tabsWithIcons = [
  {
    id: "dashboard",
    icon: <span>📊</span>,
    children: "Dashboard",
  },
  {
    id: "users",
    icon: <span>👥</span>,
    children: "Users",
  },
  {
    id: "settings",
    icon: <span>⚙️</span>,
    children: "Settings",
  },
  {
    id: "reports",
    icon: <span>📈</span>,
    children: "Reports",
  },
];

export const Primary: Story = {
  args: {
    items: basicTabs,
    selectedTab: "tab1",
    size: "L",
    disabled: false,
  },
};

export const SizeLarge: Story = {
  args: {
    items: basicTabs,
    selectedTab: "tab2",
    size: "L",
    disabled: false,
  },
};

export const SizeMedium: Story = {
  args: {
    items: basicTabs,
    selectedTab: "tab2",
    size: "M",
    disabled: false,
  },
};

export const WithIcons: Story = {
  args: {
    items: tabsWithIcons,
    selectedTab: "dashboard",
    size: "L",
    disabled: false,
  },
};

export const WithIconsMedium: Story = {
  args: {
    items: tabsWithIcons,
    selectedTab: "users",
    size: "M",
    disabled: false,
  },
};

export const Disabled: Story = {
  args: {
    items: basicTabs,
    selectedTab: "tab1",
    size: "L",
    disabled: true,
  },
};

export const NoSelection: Story = {
  args: {
    items: basicTabs,
    selectedTab: "",
    size: "L",
    disabled: false,
  },
};

export const SingleTab: Story = {
  args: {
    items: [
      {
        id: "only",
        children: "Only Tab",
      },
    ],
    selectedTab: "only",
    size: "L",
    disabled: false,
  },
};

export const ManyTabs: Story = {
  args: {
    items: [
      { id: "tab1", children: "Overview" },
      { id: "tab2", children: "Analytics" },
      { id: "tab3", children: "Reports" },
      { id: "tab4", children: "Settings" },
      { id: "tab5", children: "Users" },
      { id: "tab6", children: "Permissions" },
      { id: "tab7", children: "Integrations" },
    ],
    selectedTab: "tab3",
    size: "L",
    disabled: false,
  },
};

export const Interactive: Story = {
  render: function InteractiveRender() {
    const [selectedTab, setSelectedTab] = useState("tab1");

    return (
      <AppTabs
        items={basicTabs}
        selectedTab={selectedTab}
        size="L"
        disabled={false}
        onClick={setSelectedTab}
      />
    );
  },
};

export const InteractiveWithIcons: Story = {
  render: function InteractiveWithIconsRender() {
    const [selectedTab, setSelectedTab] = useState("dashboard");

    return (
      <AppTabs
        items={tabsWithIcons}
        selectedTab={selectedTab}
        size="L"
        disabled={false}
        onClick={setSelectedTab}
      />
    );
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="mb-4 text-lg font-semibold">Size Large</h3>
        <AppTabs
          items={basicTabs}
          selectedTab="tab2"
          size="L"
          disabled={false}
        />
      </div>

      <div>
        <h3 className="mb-4 text-lg font-semibold">Size Medium</h3>
        <AppTabs
          items={basicTabs}
          selectedTab="tab2"
          size="M"
          disabled={false}
        />
      </div>

      <div>
        <h3 className="mb-4 text-lg font-semibold">With Icons</h3>
        <AppTabs
          items={tabsWithIcons}
          selectedTab="users"
          size="L"
          disabled={false}
        />
      </div>

      <div>
        <h3 className="mb-4 text-lg font-semibold">Disabled State</h3>
        <AppTabs
          items={basicTabs}
          selectedTab="tab1"
          size="L"
          disabled={true}
        />
      </div>
    </div>
  ),
};
