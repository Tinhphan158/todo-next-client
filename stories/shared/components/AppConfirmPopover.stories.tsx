import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import AppConfirmPopover from "@/module/shared/components/AppConfirmPopover";
import { AppButton } from "@/module/shared/components/AppButton";
import { useState } from "react";

const meta = {
  title: "Shared/Components/AppConfirmPopover",
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
      <AppConfirmPopover
        trigger={<AppButton variant="primary">Delete Item</AppButton>}
        title="Are you sure you want to delete this item?"
        cancelButtonLabel="Cancel"
        confirmButtonLabel="Delete"
        onConfirm={() => alert("Item deleted!")}
        onCancel={() => alert("Delete cancelled!")}
      />
    );
  },
};

export const DeleteConfirmation: Story = {
  render: () => {
    return (
      <AppConfirmPopover
        trigger={<AppButton variant="primary">Delete Account</AppButton>}
        title="Are you sure you want to delete your account? This action cannot be undone."
        cancelButtonLabel="Cancel"
        confirmButtonLabel="Delete Account"
        onConfirm={() => alert("Account deleted!")}
      />
    );
  },
};

export const PublishConfirmation: Story = {
  render: () => {
    return (
      <AppConfirmPopover
        trigger={<AppButton variant="primary">Publish</AppButton>}
        title="Are you sure you want to publish this post? It will be visible to everyone."
        cancelButtonLabel="Cancel"
        confirmButtonLabel="Publish"
        onConfirm={() => alert("Post published!")}
      />
    );
  },
};

export const ArchiveConfirmation: Story = {
  render: () => {
    return (
      <AppConfirmPopover
        trigger={<AppButton variant="secondary">Archive</AppButton>}
        title="Archive this project? You can restore it later from the archive."
        cancelButtonLabel="Cancel"
        confirmButtonLabel="Archive"
        onConfirm={() => alert("Project archived!")}
      />
    );
  },
};

export const LogoutConfirmation: Story = {
  render: () => {
    return (
      <AppConfirmPopover
        trigger={<AppButton variant="ghost">Logout</AppButton>}
        title="Are you sure you want to logout?"
        cancelButtonLabel="Stay logged in"
        confirmButtonLabel="Logout"
        onConfirm={() => alert("Logged out!")}
      />
    );
  },
};

export const RemoveUserConfirmation: Story = {
  render: () => {
    return (
      <AppConfirmPopover
        trigger={
          <AppButton variant="primary" size="s">
            Remove
          </AppButton>
        }
        title="Remove this user from the team?"
        cancelButtonLabel="No"
        confirmButtonLabel="Yes, Remove"
        onConfirm={() => alert("User removed!")}
      />
    );
  },
};

export const CancelSubscription: Story = {
  render: () => {
    return (
      <AppConfirmPopover
        trigger={<AppButton variant="secondary">Cancel Subscription</AppButton>}
        title="Cancel your subscription? You will lose access to premium features."
        cancelButtonLabel="Keep Subscription"
        confirmButtonLabel="Cancel Subscription"
        onConfirm={() => alert("Subscription cancelled!")}
      />
    );
  },
};

export const DiscardChanges: Story = {
  render: () => {
    return (
      <AppConfirmPopover
        trigger={<AppButton variant="ghost">Discard</AppButton>}
        title="Discard all unsaved changes?"
        cancelButtonLabel="Keep Editing"
        confirmButtonLabel="Discard Changes"
        onConfirm={() => alert("Changes discarded!")}
      />
    );
  },
};

export const MultipleActions: Story = {
  render: () => {
    return (
      <div className="flex gap-4">
        <AppConfirmPopover
          trigger={
            <AppButton variant="primary" size="s">
              Delete
            </AppButton>
          }
          title="Delete this item?"
          cancelButtonLabel="Cancel"
          confirmButtonLabel="Delete"
          onConfirm={() => console.log("Deleted")}
        />
        <AppConfirmPopover
          trigger={
            <AppButton variant="secondary" size="s">
              Archive
            </AppButton>
          }
          title="Archive this item?"
          cancelButtonLabel="Cancel"
          confirmButtonLabel="Archive"
          onConfirm={() => console.log("Archived")}
        />
        <AppConfirmPopover
          trigger={
            <AppButton variant="ghost" size="s">
              Restore
            </AppButton>
          }
          title="Restore this item?"
          cancelButtonLabel="Cancel"
          confirmButtonLabel="Restore"
          onConfirm={() => console.log("Restored")}
        />
      </div>
    );
  },
};

export const LongMessage: Story = {
  render: () => {
    return (
      <AppConfirmPopover
        trigger={<AppButton variant="primary">Delete All Data</AppButton>}
        title="Are you absolutely sure you want to delete all data? This will permanently remove all your files, settings, and preferences. This action cannot be undone and you will lose all your information forever."
        cancelButtonLabel="Cancel"
        confirmButtonLabel="Delete Everything"
        onConfirm={() => alert("All data deleted!")}
        onCancel={() => console.log("Data deletion cancelled")}
      />
    );
  },
};

export const WithoutCancelCallback: Story = {
  render: () => {
    return (
      <AppConfirmPopover
        trigger={<AppButton variant="primary">Simple Action</AppButton>}
        title="This action only has confirm callback"
        cancelButtonLabel="Cancel"
        confirmButtonLabel="Confirm"
        onConfirm={() => alert("Confirmed!")}
      />
    );
  },
};

export const LoadingState: Story = {
  render: () => {
    return (
      <AppConfirmPopover
        trigger={<AppButton variant="primary">Delete with Loading</AppButton>}
        title="Are you sure you want to delete this item?"
        cancelButtonLabel="Cancel"
        confirmButtonLabel="Deleting..."
        isConfirmLoading={true}
        onConfirm={() => console.log("Delete confirmed")}
        onCancel={() => console.log("Delete cancelled")}
      />
    );
  },
};

export const NotLoadingState: Story = {
  render: () => {
    return (
      <AppConfirmPopover
        trigger={
          <AppButton variant="primary">Delete without Loading</AppButton>
        }
        title="Are you sure you want to delete this item?"
        cancelButtonLabel="Cancel"
        confirmButtonLabel="Delete"
        isConfirmLoading={false}
        onConfirm={() => console.log("Delete confirmed")}
        onCancel={() => console.log("Delete cancelled")}
      />
    );
  },
};

export const ExternalControlWithLoading: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleConfirm = async () => {
      setIsLoading(true);
      // Simulate async operation
      setTimeout(() => {
        setIsLoading(false);
        setIsOpen(false);
        console.log("Operation completed");
      }, 2000);
    };

    return (
      <div className="flex gap-4">
        <AppConfirmPopover
          trigger={<AppButton>Open Controlled Popover</AppButton>}
          open={isOpen}
          onOpenChange={setIsOpen}
          title="Delete this item? This action cannot be undone."
          cancelButtonLabel="Cancel"
          confirmButtonLabel={isLoading ? "Deleting..." : "Delete"}
          isConfirmLoading={isLoading}
          closeOnConfirm={false}
          onConfirm={handleConfirm}
        />
      </div>
    );
  },
};
