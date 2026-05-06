import { AppButton } from "@/module/shared/components/AppButton";
import AppTable, { AppColumn } from "@/module/shared/components/AppTable";
import AppTablePagination from "@/module/shared/components/AppTablePagination";
import { usePageSizeOptions } from "@/module/shared/hooks/usePageSizeOptions";
import { PenEditIcon, TrashDeleteBinIcon } from "@/module/shared/icons";
import { Label, PaginationMeta } from "@/store/types";
import { useMemo } from "react";

interface LabelTableRow extends Label {
  rowNumber: number;
}

interface LabelTableProps {
  labels: Label[];
  metadata?: PaginationMeta;
  isLoading?: boolean;
  page: number;
  pageSize: 10 | 50 | 100;
  onPageChange?: (page: number) => void;
  onPageSizeChange?: (pageSize: 10 | 50 | 100) => void;
  onEdit?: (label: Label) => void;
  onDelete?: (label: Label) => void;
}

const LabelTable = ({
  labels,
  metadata,
  isLoading = false,
  page,
  pageSize,
  onPageChange,
  onPageSizeChange,
  onEdit,
  onDelete,
}: LabelTableProps) => {
  const pageSizeOptions = usePageSizeOptions();

  const tableData = useMemo<LabelTableRow[]>(
    () =>
      labels.map((label, index) => ({
        ...label,
        rowNumber: (page - 1) * pageSize + index + 1,
      })),
    [labels, page, pageSize],
  );

  const columns: AppColumn<LabelTableRow>[] = [
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
      accessor: "name",
    },
    {
      key: "color",
      header: "Color text",
      render: (row) => <span>{row.color}</span>,
    },
    {
      key: "background",
      header: "Color background",
      render: (row) => (
        <span
          className="inline-flex rounded px-2 py-1"
          style={{ backgroundColor: row.background, color: row.color }}
        >
          {row.background}
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
        isEmpty={!isLoading && labels.length === 0}
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
            formatTotalItemTitle={(totalItem) => `${totalItem} labels`}
          />
        </div>
      )}
    </div>
  );
};

export default LabelTable;
