import { AppButton } from "@/modules/shared/components/AppButton";
import AppTable, { AppColumn } from "@/modules/shared/components/AppTable";
import AppTablePagination from "@/modules/shared/components/AppTablePagination";
import { usePageSizeOptions } from "@/modules/shared/hooks/usePageSizeOptions";
import { PenEditIcon, TrashDeleteBinIcon } from "@/modules/shared/icons";
import {
  workspaceTasksPath,
  type WorkspaceBoardFilters,
} from "@/modules/workspace/helpers";
import { PaginationMeta, Workspace } from "@/store/types";
import Link from "next/link";
import { useMemo } from "react";

interface WorkspaceTableRow extends Workspace {
  rowNumber: number;
}

interface WorkspaceTableProps {
  workspaces: Workspace[];
  metadata?: PaginationMeta;
  isLoading?: boolean;
  page: number;
  pageSize: 10 | 50 | 100;
  boardFilters: WorkspaceBoardFilters;
  onPageChange?: (page: number) => void;
  onPageSizeChange?: (pageSize: 10 | 50 | 100) => void;
  onEdit?: (workspace: Workspace) => void;
  onDelete?: (workspace: Workspace) => void;
}

const WorkspaceTable = ({
  workspaces,
  metadata,
  isLoading = false,
  page,
  pageSize,
  boardFilters,
  onPageChange,
  onPageSizeChange,
  onEdit,
  onDelete,
}: WorkspaceTableProps) => {
  const pageSizeOptions = usePageSizeOptions();

  const tableData = useMemo<WorkspaceTableRow[]>(
    () =>
      workspaces.map((workspace, index) => ({
        ...workspace,
        rowNumber: (page - 1) * pageSize + index + 1,
      })),
    [workspaces, page, pageSize],
  );

  const columns: AppColumn<WorkspaceTableRow>[] = [
    {
      key: "index",
      header: "No.",
      align: "center",
      size: 64,
      render: (row) => <span>{row.rowNumber}</span>,
    },
    {
      key: "name",
      header: "Name",
      render: (row) => (
        <Link
          href={workspaceTasksPath(row.id, boardFilters)}
          className="text-primary-500 hover:text-primary-600 font-medium hover:underline"
        >
          {row.name}
        </Link>
      ),
    },
    {
      key: "createdAt",
      header: "Created",
      render: (row) => (
        <span className="body-s text-neutral-600">
          {new Date(row.createdAt).toLocaleString()}
        </span>
      ),
    },
    {
      key: "updatedAt",
      header: "Updated",
      render: (row) => (
        <span className="body-s text-neutral-600">
          {new Date(row.updatedAt).toLocaleString()}
        </span>
      ),
    },
    {
      key: "actions",
      header: "Actions",
      align: "center",
      size: 180,
      render: (row) => (
        <div className="flex items-center justify-center gap-2">
          <AppButton
            type="button"
            variant="link"
            size="s"
            className="hover:text-primary-500 active:text-primary-600 hover:cursor-pointer"
            startIcon={<PenEditIcon />}
            onClick={() => onEdit?.(row)}
          />
          <AppButton
            type="button"
            variant="link"
            size="s"
            className="text-negative-500 hover:text-negative-600 active:text-negative-700 hover:cursor-pointer"
            startIcon={<TrashDeleteBinIcon />}
            onClick={() => onDelete?.(row)}
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
        isEmpty={!isLoading && workspaces.length === 0}
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
            formatTotalItemTitle={(totalItem) => `${totalItem} workspaces`}
          />
        </div>
      )}
    </div>
  );
};

export default WorkspaceTable;
