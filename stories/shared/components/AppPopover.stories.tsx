import * as React from "react";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import AppPopover from "@/module/shared/components/AppPopover";
import { AppButton } from "@/module/shared/components/AppButton";

const meta = {
  title: "Shared/Components/AppPopover",
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="flex h-[400px] w-[600px] items-center justify-center">
        <Story />
      </div>
    ),
  ],
} satisfies Meta;

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => {
    return (
      <AppPopover trigger={<AppButton>Open Popover</AppButton>}>
        <div className="space-y-2">
          <h3 className="text-base-m font-bold text-neutral-950">
            Popover Title
          </h3>
          <p className="text-body-s text-neutral-600">
            This is a basic popover with some content inside.
          </p>
        </div>
      </AppPopover>
    );
  },
};

export const Controlled: Story = {
  render: function ControlledRender() {
    const [open, setOpen] = React.useState(false);

    return (
      <div className="space-y-4">
        <AppPopover
          trigger={<AppButton>Toggle Popover</AppButton>}
          open={open}
          onOpenChange={setOpen}
        >
          <div className="space-y-2">
            <h3 className="text-base-m font-bold text-neutral-950">
              Controlled Popover
            </h3>
            <p className="text-body-s text-neutral-600">
              This popover is controlled. Current state:{" "}
              {open ? "Open" : "Closed"}
            </p>
            <AppButton size="s" onClick={() => setOpen(false)}>
              Close
            </AppButton>
          </div>
        </AppPopover>
        <div className="text-center">
          <AppButton
            variant="secondary"
            size="s"
            onClick={() => setOpen(!open)}
          >
            External Toggle
          </AppButton>
        </div>
      </div>
    );
  },
};

export const WithForm: Story = {
  render: function WithFormRender() {
    const [name, setName] = React.useState("");

    return (
      <AppPopover trigger={<AppButton>Edit Profile</AppButton>}>
        <div className="w-64 space-y-3">
          <h3 className="text-base-m font-bold text-neutral-950">
            Edit Profile
          </h3>
          <div className="space-y-2">
            <label className="text-body-s font-medium text-neutral-950">
              Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="text-body-s w-full rounded-lg border border-neutral-200 px-3 py-2"
              placeholder="Enter your name"
            />
          </div>
          <div className="flex gap-2">
            <AppButton size="s" className="flex-1">
              Save
            </AppButton>
            <AppButton size="s" variant="secondary" className="flex-1">
              Cancel
            </AppButton>
          </div>
        </div>
      </AppPopover>
    );
  },
};

export const UserMenu: Story = {
  render: () => {
    return (
      <AppPopover trigger={<AppButton variant="secondary">John Doe</AppButton>}>
        <div className="w-56">
          <div className="border-b border-neutral-200 px-3 py-2">
            <p className="text-body-s font-bold text-neutral-950">John Doe</p>
            <p className="text-caption-s text-neutral-500">
              john.doe@example.com
            </p>
          </div>
          <div className="py-1">
            <button className="text-body-s w-full px-3 py-2 text-left text-neutral-950 hover:bg-neutral-50">
              Profile
            </button>
            <button className="text-body-s w-full px-3 py-2 text-left text-neutral-950 hover:bg-neutral-50">
              Settings
            </button>
            <button className="text-body-s w-full px-3 py-2 text-left text-neutral-950 hover:bg-neutral-50">
              Billing
            </button>
          </div>
          <div className="border-t border-neutral-200 py-1">
            <button className="text-body-s text-negative-500 hover:bg-negative-50 w-full px-3 py-2 text-left">
              Logout
            </button>
          </div>
        </div>
      </AppPopover>
    );
  },
};

export const Notifications: Story = {
  render: () => {
    const notifications = [
      { id: 1, title: "New message", time: "5 min ago", unread: true },
      { id: 2, title: "Task completed", time: "1 hour ago", unread: true },
      { id: 3, title: "Meeting reminder", time: "2 hours ago", unread: false },
    ];

    return (
      <AppPopover
        trigger={<AppButton variant="secondary">Notifications (2)</AppButton>}
      >
        <div className="w-80">
          <div className="flex items-center justify-between border-b border-neutral-200 px-3 py-2">
            <h3 className="text-base-m font-bold text-neutral-950">
              Notifications
            </h3>
            <button className="text-caption-s text-primary-500 hover:text-primary-600">
              Mark all as read
            </button>
          </div>
          <div className="max-h-96 overflow-y-auto">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={`border-b border-neutral-100 px-3 py-3 hover:bg-neutral-50 ${
                  notification.unread ? "bg-primary-50" : ""
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="text-body-s font-medium text-neutral-950">
                      {notification.title}
                    </p>
                    <p className="text-caption-s text-neutral-500">
                      {notification.time}
                    </p>
                  </div>
                  {notification.unread && (
                    <div className="bg-primary-500 mt-1 h-2 w-2 rounded-full"></div>
                  )}
                </div>
              </div>
            ))}
          </div>
          <div className="border-t border-neutral-200 px-3 py-2">
            <button className="text-body-s text-primary-500 hover:text-primary-600">
              View all notifications
            </button>
          </div>
        </div>
      </AppPopover>
    );
  },
};

export const ColorPicker: Story = {
  render: function ColorPickerRender() {
    const [selectedColor, setSelectedColor] = React.useState("#E82840");

    const colors = [
      "#E82840",
      "#27BE69",
      "#F2415A",
      "#FFBF0F",
      "#295BFF",
      "#978D8F",
      "#030712",
      "#FFFFFF",
      "#F8F7F8",
      "#170205",
    ];

    return (
      <div className="space-y-4">
        <AppPopover
          trigger={
            <AppButton variant="secondary">
              <div className="flex items-center gap-2">
                <div
                  className="h-4 w-4 rounded border border-neutral-200"
                  style={{ backgroundColor: selectedColor }}
                />
                Select Color
              </div>
            </AppButton>
          }
        >
          <div className="w-48 space-y-3">
            <h3 className="text-base-m font-bold text-neutral-950">
              Pick a Color
            </h3>
            <div className="grid grid-cols-5 gap-2">
              {colors.map((color) => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`h-8 w-8 rounded border-2 ${
                    selectedColor === color
                      ? "border-primary-500"
                      : "border-neutral-200"
                  }`}
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
            <p className="text-caption-s text-neutral-500">
              Selected: {selectedColor}
            </p>
          </div>
        </AppPopover>
        <div className="text-body-s text-center text-neutral-600">
          Current color: {selectedColor}
        </div>
      </div>
    );
  },
};

export const QuickActions: Story = {
  render: () => {
    return (
      <AppPopover
        trigger={<AppButton variant="secondary">Quick Actions</AppButton>}
      >
        <div className="w-64">
          <h3 className="text-base-m border-b border-neutral-200 px-3 py-2 font-bold text-neutral-950">
            Quick Actions
          </h3>
          <div className="grid grid-cols-2 gap-2 p-3">
            <button className="rounded-lg border border-neutral-200 p-4 text-center hover:bg-neutral-50">
              <div className="mb-1 text-2xl">📝</div>
              <div className="text-caption-s font-medium text-neutral-950">
                New Note
              </div>
            </button>
            <button className="rounded-lg border border-neutral-200 p-4 text-center hover:bg-neutral-50">
              <div className="mb-1 text-2xl">📁</div>
              <div className="text-caption-s font-medium text-neutral-950">
                New Folder
              </div>
            </button>
            <button className="rounded-lg border border-neutral-200 p-4 text-center hover:bg-neutral-50">
              <div className="mb-1 text-2xl">📷</div>
              <div className="text-caption-s font-medium text-neutral-950">
                Upload Photo
              </div>
            </button>
            <button className="rounded-lg border border-neutral-200 p-4 text-center hover:bg-neutral-50">
              <div className="mb-1 text-2xl">🔗</div>
              <div className="text-caption-s font-medium text-neutral-950">
                Share Link
              </div>
            </button>
          </div>
        </div>
      </AppPopover>
    );
  },
};
