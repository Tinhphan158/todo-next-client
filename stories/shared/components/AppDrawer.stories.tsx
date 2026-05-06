import { AppButton } from "@/module/shared/components/AppButton";
import AppDrawer, {
  AppDrawerClose,
} from "@/module/shared/components/AppDrawer";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { useState } from "react";

const meta = {
  title: "Shared/Components/AppDrawer",
  component: AppDrawer,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    open: {
      control: "boolean",
      description: "Whether the drawer is open",
    },
    trigger: {
      control: false,
      description: "Element that triggers the drawer",
    },
    title: {
      control: "text",
      description: "Title displayed in the drawer header",
    },
    children: {
      control: false,
      description: "Content displayed in the drawer body",
    },
    headerAction: {
      control: false,
      description: "Action elements in the header",
    },
    footerAction: {
      control: false,
      description: "Action elements in the footer",
    },
  },
} satisfies Meta<typeof AppDrawer>;

export default meta;
type Story = StoryObj<typeof meta>;

// Basic Examples
export const Default: Story = {
  args: {
    trigger: <AppButton>Open Drawer</AppButton>,
    title: <span>Drawer Title</span>,
    children: (
      <div className="p-4">
        <p>This is the drawer content.</p>
      </div>
    ),
  },
};

export const WithoutTitle: Story = {
  args: {
    trigger: <AppButton>Open Drawer</AppButton>,
    children: (
      <div className="p-4">
        <p>Drawer without a title.</p>
      </div>
    ),
  },
};

export const WithHeaderAction: Story = {
  args: {
    trigger: <AppButton>Open Drawer</AppButton>,
    title: <span>Settings</span>,
    headerAction: (
      <AppButton variant="ghost" size="s">
        Save
      </AppButton>
    ),
    children: (
      <div className="p-4">
        <p>Drawer with header action.</p>
      </div>
    ),
  },
};

export const WithFooterAction: Story = {
  args: {
    trigger: <AppButton>Open Drawer</AppButton>,
    title: <span>Confirmation</span>,
    footerAction: (
      <div className="flex w-full justify-end gap-2">
        <AppDrawerClose>
          <AppButton variant="secondary">Cancel</AppButton>
        </AppDrawerClose>
        <AppButton>Confirm</AppButton>
      </div>
    ),
    children: (
      <div className="p-4">
        <p>Are you sure you want to proceed?</p>
      </div>
    ),
  },
};

export const WithBothActions: Story = {
  args: {
    trigger: <AppButton>Open Form Drawer</AppButton>,
    title: <span>Edit Profile</span>,
    headerAction: (
      <AppButton variant="ghost" size="s">
        Reset
      </AppButton>
    ),
    footerAction: (
      <div className="flex gap-2">
        <AppDrawerClose>
          <AppButton variant="secondary">Cancel</AppButton>
        </AppDrawerClose>
        <AppButton>Save Changes</AppButton>
      </div>
    ),
    children: (
      <div className="p-4">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Name</label>
            <input
              type="text"
              className="w-full rounded border px-3 py-2"
              defaultValue="John Doe"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              className="w-full rounded border px-3 py-2"
              defaultValue="john@example.com"
            />
          </div>
        </div>
      </div>
    ),
  },
};

// Long Content Example
export const LongContent: Story = {
  args: {
    trigger: <AppButton>Open Long Content</AppButton>,
    title: <span>Long Content Drawer</span>,
    children: (
      <div className="space-y-4 p-4">
        {Array.from({ length: 20 }, (_, i) => (
          <div key={i} className="rounded border bg-white p-3">
            <h3 className="font-semibold">Section {i + 1}</h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>
        ))}
      </div>
    ),
  },
};

// Controlled State Example
export const ControlledState: Story = {
  render: function ControlledStateRender() {
    const [open, setOpen] = useState(false);

    return (
      <div className="space-y-4">
        <AppButton onClick={() => setOpen(true)}>
          Open Controlled Drawer
        </AppButton>
        <AppDrawer
          open={open}
          onOpenChange={setOpen}
          title={<span>Controlled Drawer</span>}
          footerAction={
            <AppButton onClick={() => setOpen(false)}>
              Close Programmatically
            </AppButton>
          }
        >
          <div className="p-4">
            <p>This drawer&apos;s state is controlled externally.</p>
            <p>Open state: {open ? "true" : "false"}</p>
          </div>
        </AppDrawer>
      </div>
    );
  },
};

// No Trigger (Controlled Only)
export const NoTrigger: Story = {
  render: function NoTriggerRender() {
    const [open, setOpen] = useState(false);

    return (
      <div className="space-y-4">
        <AppButton onClick={() => setOpen(!open)}>Toggle Drawer</AppButton>
        <AppDrawer
          open={open}
          onOpenChange={setOpen}
          title={<span>No Trigger Drawer</span>}
        >
          <div className="p-4">
            <p>
              This drawer has no trigger element and is controlled entirely by
              external state.
            </p>
          </div>
        </AppDrawer>
      </div>
    );
  },
};
