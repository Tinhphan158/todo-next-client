import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { useState } from "react";
import AppDialog from "@/modules/shared/components/AppDialog";
import { AppButton } from "@/modules/shared/components/AppButton";

const meta: Meta<typeof AppDialog> = {
  title: "Shared/Components/AppDialog",
  component: AppDialog,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    open: {
      control: "boolean",
      description: "Controlled open state of the dialog",
    },
    title: {
      control: "text",
      description: "Title of the dialog",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    trigger: <AppButton>Open Dialog</AppButton>,
    title: "Dialog Title",
    content: (
      <div className="space-y-4">
        <p className="text-neutral-600">
          This is the dialog content. You can put any React node here.
        </p>
        <div className="flex justify-end gap-2">
          <AppButton variant="secondary">Cancel</AppButton>
          <AppButton>Confirm</AppButton>
        </div>
      </div>
    ),
  },
};

export const WithoutTitle: Story = {
  args: {
    trigger: <AppButton>Open Dialog (No Title)</AppButton>,
    content: (
      <div className="space-y-4">
        <p className="text-neutral-600">
          This dialog has no title. The close button is integrated with the
          title, so without a title, there is no close button.
        </p>
        <div className="flex justify-end">
          <AppButton>Got it</AppButton>
        </div>
      </div>
    ),
  },
};

export const Controlled: Story = {
  render: () => {
    const [open, setOpen] = useState(false);

    return (
      <div className="flex flex-col items-center gap-4">
        <AppButton onClick={() => setOpen(true)}>
          Open Controlled Dialog
        </AppButton>
        <AppDialog
          open={open}
          onOpenChange={setOpen}
          title="Controlled Dialog"
          content={
            <div className="space-y-4">
              <p className="text-neutral-600">
                This dialog is controlled externally. Current state:{" "}
                {open ? "Open" : "Closed"}
              </p>
              <div className="flex justify-end gap-2">
                <AppButton variant="secondary" onClick={() => setOpen(false)}>
                  Close
                </AppButton>
                <AppButton onClick={() => setOpen(false)}>Confirm</AppButton>
              </div>
            </div>
          }
        />
      </div>
    );
  },
};

export const LongContent: Story = {
  args: {
    trigger: <AppButton>Long Content</AppButton>,
    title: "Terms and Conditions",
    content: (
      <div className="space-y-4">
        <div className="max-h-[300px] overflow-y-auto pr-2">
          <p className="text-neutral-600">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>
          <p className="mt-4 text-neutral-600">
            Duis aute irure dolor in reprehenderit in voluptate velit esse
            cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
            cupidatat non proident, sunt in culpa qui officia deserunt mollit
            anim id est laborum.
          </p>
          <p className="mt-4 text-neutral-600">
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem
            accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
            quae ab illo inventore veritatis et quasi architecto beatae vitae
            dicta sunt explicabo.
          </p>
          <p className="mt-4 text-neutral-600">
            Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut
            fugit, sed quia consequuntur magni dolores eos qui ratione
            voluptatem sequi nesciunt.
          </p>
        </div>
        <div className="flex justify-end gap-2 border-t pt-4">
          <AppButton variant="secondary">Decline</AppButton>
          <AppButton>Accept</AppButton>
        </div>
      </div>
    ),
  },
};

export const FormContent: Story = {
  args: {
    trigger: <AppButton>Open Form Dialog</AppButton>,
    title: "Create New Item",
    content: (
      <div className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-neutral-700">Name</label>
          <input
            type="text"
            placeholder="Enter name"
            className="focus:ring-primary-500 w-full rounded-lg border border-neutral-200 px-3 py-2 focus:ring-2 focus:outline-none"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-neutral-700">
            Description
          </label>
          <textarea
            placeholder="Enter description"
            rows={3}
            className="focus:ring-primary-500 w-full resize-none rounded-lg border border-neutral-200 px-3 py-2 focus:ring-2 focus:outline-none"
          />
        </div>
        <div className="flex justify-end gap-2 pt-2">
          <AppButton variant="secondary">Cancel</AppButton>
          <AppButton>Create</AppButton>
        </div>
      </div>
    ),
  },
};

export const ConfirmationDialog: Story = {
  args: {
    trigger: (
      <AppButton className="bg-red-500 text-white hover:bg-red-400">
        Delete Item
      </AppButton>
    ),
    title: "Confirm Deletion",
    content: (
      <div className="space-y-4">
        <p className="text-neutral-600">
          Are you sure you want to delete this item? This action cannot be
          undone.
        </p>
        <div className="flex justify-end gap-2">
          <AppButton variant="secondary">Cancel</AppButton>
          <AppButton className="bg-red-500 text-white hover:bg-red-400">
            Delete
          </AppButton>
        </div>
      </div>
    ),
  },
};

export const RichContent: Story = {
  args: {
    trigger: <AppButton>Rich Content</AppButton>,
    title: "User Profile",
    content: (
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="bg-primary-100 text-primary-700 flex h-12 w-12 items-center justify-center rounded-full font-semibold">
            JD
          </div>
          <div>
            <p className="font-semibold text-neutral-950">John Doe</p>
            <p className="text-sm text-neutral-500">john.doe@example.com</p>
          </div>
        </div>
        <div className="border-t border-neutral-100 pt-3">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-neutral-500 uppercase">Role</p>
              <p className="text-sm font-medium text-neutral-950">Admin</p>
            </div>
            <div>
              <p className="text-xs text-neutral-500 uppercase">Status</p>
              <p className="text-sm font-medium text-green-600">Active</p>
            </div>
            <div>
              <p className="text-xs text-neutral-500 uppercase">Joined</p>
              <p className="text-sm font-medium text-neutral-950">
                Jan 15, 2024
              </p>
            </div>
            <div>
              <p className="text-xs text-neutral-500 uppercase">Projects</p>
              <p className="text-sm font-medium text-neutral-950">12</p>
            </div>
          </div>
        </div>
        <div className="flex justify-end gap-2 pt-2">
          <AppButton variant="secondary">Close</AppButton>
          <AppButton>Edit Profile</AppButton>
        </div>
      </div>
    ),
  },
};
