"use client";

import { AppButton } from "@/modules/shared/components/AppButton";
import AppConfirmPopover from "@/modules/shared/components/AppConfirmPopover";
import AppDrawer from "@/modules/shared/components/AppDrawer";
import type { Notification } from "@/store/types";

interface NotificationDrawerProps {
  notification: Notification | null;
  open: boolean;
  isDeleting?: boolean;
  onOpenChange: (open: boolean) => void;
  onDelete: () => Promise<void>;
}

const NotificationDrawer = ({
  notification,
  open,
  isDeleting = false,
  onOpenChange,
  onDelete,
}: NotificationDrawerProps) => {
  return (
    <AppDrawer
      open={open}
      onOpenChange={onOpenChange}
      title="Notification detail"
      footerAction={
        <div className="flex w-full items-center justify-end gap-3">
          <AppConfirmPopover
            title="Are you sure you want to delete this notification?"
            cancelButtonLabel="Cancel"
            confirmButtonLabel="Delete"
            isConfirmLoading={isDeleting}
            closeOnConfirm={false}
            onConfirm={() => {
              void onDelete();
            }}
            trigger={
              <AppButton type="button" disabled={isDeleting || !notification}>
                Delete
              </AppButton>
            }
          />
          <AppButton
            type="button"
            variant="secondary"
            disabled={isDeleting}
            onClick={() => onOpenChange(false)}
          >
            Close
          </AppButton>
        </div>
      }
    >
      <div className="flex flex-col gap-4 p-6">
        <div>
          <p className="caption-s text-neutral-500">Title</p>
          <p className="body-m font-bold text-neutral-950">
            {notification?.title || "--"}
          </p>
        </div>
        <div>
          <p className="caption-s text-neutral-500">Description</p>
          <p className="body-s whitespace-pre-wrap text-neutral-700">
            {notification?.description || "--"}
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="caption-s text-neutral-500">Time</p>
            <p className="body-s text-neutral-950">
              {notification?.time
                ? new Date(notification.time).toLocaleString()
                : "--"}
            </p>
          </div>
          <div>
            <p className="caption-s text-neutral-500">Status</p>
            <p
              className={
                notification?.viewed
                  ? "body-s text-positive-600"
                  : "body-s text-warning-600"
              }
            >
              {notification?.viewed ? "Viewed" : "Unviewed"}
            </p>
          </div>
        </div>
      </div>
    </AppDrawer>
  );
};

export default NotificationDrawer;
