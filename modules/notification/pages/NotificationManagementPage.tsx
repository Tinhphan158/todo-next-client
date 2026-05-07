"use client";

import NotificationDrawer from "@/modules/notification/components/NotificationDrawer";
import NotificationHeader from "@/modules/notification/components/NotificationHeader";
import NotificationTable from "@/modules/notification/components/NotificationTable";
import { MESSAGE_TYPE, message } from "@/modules/shared/components/AppMessage";
import {
  useDeleteNotificationMutation,
  useGetNotificationsQuery,
  useMarkNotificationViewedMutation,
} from "@/store/apis/notificationApi";
import type { Notification } from "@/store/types";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export interface NotificationFilters {
  search?: string;
  viewed?: "all" | "true" | "false";
  from?: string;
  to?: string;
}

const NotificationManagementPage = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState<10 | 50 | 100>(10);
  const [filters, setFilters] = useState<NotificationFilters>({
    viewed: "all",
  });
  const [selectedNotification, setSelectedNotification] =
    useState<Notification | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const { data: response, isFetching } = useGetNotificationsQuery({
    page,
    pageSize,
    search: filters.search || undefined,
    viewed: filters.viewed && filters.viewed !== "all" ? filters.viewed : undefined,
    from: filters.from || undefined,
    to: filters.to || undefined,
  });
  const [markViewed] = useMarkNotificationViewedMutation();
  const [deleteNotification, { isLoading: isDeleting }] =
    useDeleteNotificationMutation();

  const notifications = response?.data ?? [];
  const metadata = response?.metadata;
  const selectedIdFromUrl = Number(searchParams.get("id"));

  const updateDrawerUrl = (id?: number) => {
    const usp = new URLSearchParams(searchParams.toString());
    if (id) usp.set("id", String(id));
    else usp.delete("id");
    const query = usp.toString();
    router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
  };

  useEffect(() => {
    if (!selectedIdFromUrl) {
      setIsDrawerOpen(false);
      setSelectedNotification(null);
      return;
    }
    const matched = notifications.find(
      (notification) => notification.id === selectedIdFromUrl,
    );
    if (matched) {
      setSelectedNotification(matched);
      setIsDrawerOpen(true);
    }
  }, [notifications, selectedIdFromUrl]);

  const handleOpenDetail = async (notification: Notification) => {
    setSelectedNotification(notification);
    setIsDrawerOpen(true);
    updateDrawerUrl(notification.id);
    if (!notification.viewed) {
      try {
        await markViewed(notification.id).unwrap();
      } catch {
        message({
          type: MESSAGE_TYPE.ERROR,
          description: "Failed to mark notification as viewed.",
        });
      }
    }
  };

  const handleDeleteNotification = async () => {
    if (!selectedNotification) return;
    try {
      await deleteNotification(selectedNotification.id).unwrap();
      message({
        type: MESSAGE_TYPE.SUCCESS,
        description: "Notification deleted successfully.",
      });
      updateDrawerUrl(undefined);
    } catch {
      message({
        type: MESSAGE_TYPE.ERROR,
        description: "Failed to delete notification. Please try again.",
      });
    }
  };

  return (
    <div className="bg-base-white flex flex-col gap-4 rounded-lg p-4">
      <NotificationHeader
        filters={filters}
        onChangeFilters={(next) => {
          setPage(1);
          setFilters(next);
        }}
      />
      <NotificationTable
        notifications={notifications}
        metadata={metadata}
        page={page}
        pageSize={pageSize}
        isLoading={isFetching}
        onPageChange={setPage}
        onPageSizeChange={(nextPageSize) => {
          setPage(1);
          setPageSize(nextPageSize);
        }}
        onView={handleOpenDetail}
      />
      <NotificationDrawer
        notification={selectedNotification}
        open={isDrawerOpen}
        isDeleting={isDeleting}
        onOpenChange={(open) => {
          setIsDrawerOpen(open);
          if (!open) updateDrawerUrl(undefined);
        }}
        onDelete={handleDeleteNotification}
      />
    </div>
  );
};

export default NotificationManagementPage;
