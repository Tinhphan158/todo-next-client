import { AppButton } from "@/modules/shared/components/AppButton";
import AppTable, { AppColumn } from "@/modules/shared/components/AppTable";
import AppTablePagination from "@/modules/shared/components/AppTablePagination";
import { usePageSizeOptions } from "@/modules/shared/hooks/usePageSizeOptions";
import { EyeShowVisibleIcon } from "@/modules/shared/icons";
import type { Notification, PaginationMeta } from "@/store/types";
import { useMemo } from "react";

interface NotificationTableRow extends Notification {
  rowNumber: number;
}

interface NotificationTableProps {
  notifications: Notification[];
  metadata?: PaginationMeta;
  page: number;
  pageSize: 10 | 50 | 100;
  isLoading?: boolean;
  onPageChange?: (page: number) => void;
  onPageSizeChange?: (pageSize: 10 | 50 | 100) => void;
  onView?: (notification: Notification) => void;
}

const NotificationTable = ({
  notifications,
  metadata,
  page,
  pageSize,
  isLoading = false,
  onPageChange,
  onPageSizeChange,
  onView,
}: NotificationTableProps) => {
  const pageSizeOptions = usePageSizeOptions();
  const tableData = useMemo<NotificationTableRow[]>(
    () =>
      notifications.map((notification, index) => ({
        ...notification,
        rowNumber: (page - 1) * pageSize + index + 1,
      })),
    [notifications, page, pageSize],
  );

  const columns: AppColumn<NotificationTableRow>[] = [
    {
      key: "index",
      header: "No.",
      align: "center",
      size: 64,
      render: (row) => <span>{row.rowNumber}</span>,
    },
    {
      key: "title",
      header: "Title",
      render: (row) => (
        <button
          type="button"
          className="line-clamp-2 text-left hover:underline"
          onClick={() => onView?.(row)}
        >
          {row.title}
        </button>
      ),
    },
    {
      key: "time",
      header: "Time",
      render: (row) => <span>{new Date(row.time).toLocaleString()}</span>,
    },
    {
      key: "viewed",
      header: "Status",
      render: (row) => (
        <span
          className={
            row.viewed
              ? "text-positive-600 caption-s font-semibold"
              : "text-warning-600 caption-s font-semibold"
          }
        >
          {row.viewed ? "Viewed" : "Unviewed"}
        </span>
      ),
    },
    {
      key: "actions",
      header: "Actions",
      size: 140,
      align: "center",
      render: (row) => (
        <div className="flex items-center justify-center gap-2">
          <AppButton
            type="button"
            variant="link"
            size="s"
            className="hover:text-primary-500 active:text-primary-600"
            startIcon={<EyeShowVisibleIcon />}
            onClick={() => onView?.(row)}
          />
        </div>
      ),
    },
  ];

  return (
    <div className="rounded-[12px] border border-neutral-100 px-3">
      <AppTable
        data={tableData}
        columns={columns}
        isLoading={isLoading}
        isEmpty={!isLoading && notifications.length === 0}
        getRowClassName={(row) =>
          !row.viewed ? "bg-neutral-50 hover:bg-neutral-50" : undefined
        }
      />
      {!isLoading && (metadata?.total ?? 0) > 0 && (
        <div className="flex justify-end py-6">
          <AppTablePagination
            totalItems={metadata?.total}
            totalPages={metadata?.totalPage}
            currentPage={metadata?.page}
            currentPageSize={metadata?.pageSize}
            pageSizeOptions={pageSizeOptions}
            onPageChange={onPageChange}
            onPageSizeChange={(nextPageSize) => {
              if (
                nextPageSize === 10 ||
                nextPageSize === 50 ||
                nextPageSize === 100
              ) {
                onPageSizeChange?.(nextPageSize);
              }
            }}
            formatTotalItemTitle={(totalItem) => `${totalItem} notifications`}
          />
        </div>
      )}
    </div>
  );
};

export default NotificationTable;
