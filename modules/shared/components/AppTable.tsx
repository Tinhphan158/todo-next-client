import React, { useMemo } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import SortIcon from "../icons/SortIcon";
import { cn } from "@/lib/utils";

export type SortDirection = "ASC" | "DESC" | "NONE";

export interface AppColumn<T> {
  key: string;
  header: React.ReactNode;
  accessor?: keyof T | ((row: T) => React.ReactNode);
  sortable?: boolean;
  render?: (row: T) => React.ReactNode;
  align?: "left" | "right" | "center";
  verticalAlign?: "top" | "middle" | "bottom";
  size?: number;
  maxWidth?: number;
  fixed?: "left" | "right";
}

interface StickyColumnMetadata {
  position: number;
  isEdge: boolean;
  direction: "left" | "right";
}

const AppTableHead = ({
  children,
  sortable,
  sortValue,
  sorDirection,
  onSortChange,
  align = "left",
  size,
  maxWidth,
  isFirstColumn,
  isLastColumn,
  stickyPosition,
  stickyDirection,
  isEdgeSticky,
  disabled,
}: {
  children: React.ReactNode;
  sortable?: boolean;
  sortValue?: string;
  sorDirection?: SortDirection;
  onSortChange?: (value: string, direction: SortDirection) => void;
  align?: "left" | "right" | "center";
  size?: number;
  maxWidth?: number;
  isFirstColumn?: boolean;
  isLastColumn?: boolean;
  stickyPosition?: number;
  stickyDirection?: "left" | "right";
  isEdgeSticky?: boolean;
  disabled?: boolean;
}) => {
  const handleSort = () => {
    if (!sortable || !onSortChange || !sortValue || disabled) return;

    let nextDirection: "DESC" | "ASC" | "NONE";
    if (sorDirection === "NONE" || !sorDirection) {
      nextDirection = "ASC";
    } else if (sorDirection === "ASC") {
      nextDirection = "DESC";
    } else {
      nextDirection = "NONE";
    }

    onSortChange(sortValue, nextDirection);
  };

  const alignClass =
    align === "center"
      ? "justify-center"
      : align === "right"
        ? "justify-end"
        : "justify-start";
  const textAlignClass =
    align === "center"
      ? "text-center"
      : align === "right"
        ? "text-right"
        : "text-left";

  const adjustedSize = size
    ? isLastColumn
      ? size + 36
      : isFirstColumn
        ? size + 12
        : size + 24
    : size;

  const isSticky = stickyPosition !== undefined;

  const style = {
    ...(adjustedSize ? { width: `${adjustedSize}px` } : {}),
    ...(maxWidth ? { maxWidth: `${maxWidth}px` } : {}),
    ...(isSticky && stickyDirection === "left"
      ? { left: `${stickyPosition}px` }
      : {}),
    ...(isSticky && stickyDirection === "right"
      ? { right: `${stickyPosition}px` }
      : {}),
  };

  const stickyClasses = isSticky ? "sticky bg-base-white z-30" : "z-20";
  const shadowClass =
    isEdgeSticky && stickyDirection === "left"
      ? "sticky-edge-shadow-right"
      : isEdgeSticky && stickyDirection === "right"
        ? "sticky-edge-shadow-left"
        : "";

  return (
    <TableHead
      className={`caption-s border-b border-neutral-50 px-0 py-4 align-middle font-bold not-first:pl-6 first:pl-3 last:pr-3 ${stickyClasses} ${shadowClass}`}
      style={style}
    >
      <div
        className={`flex items-center text-neutral-500 hover:text-neutral-950 ${alignClass} ${textAlignClass} ${sortable ? "cursor-pointer" : ""}`}
        onClick={handleSort}
      >
        {children}
        {sortable && <SortIcon direction={sorDirection} />}
      </div>
    </TableHead>
  );
};

const AppTableCellSkeleton = () => {
  return (
    <div className="h-4 w-full animate-pulse rounded-[4px] bg-neutral-50 transition-all" />
  );
};

const AppTableCell = ({
  children,
  align = "left",
  verticalAlign = "top",
  size,
  maxWidth,
  colSpan,
  isFirstColumn,
  isLastColumn,
  stickyPosition,
  stickyDirection,
  isEdgeSticky,
  isSubTable,
}: {
  children: React.ReactNode;
  align?: "left" | "right" | "center";
  verticalAlign?: "top" | "middle" | "bottom";
  size?: number;
  maxWidth?: number;
  colSpan?: number;
  isFirstColumn?: boolean;
  isLastColumn?: boolean;
  stickyPosition?: number;
  stickyDirection?: "left" | "right";
  isEdgeSticky?: boolean;
  isSubTable?: boolean;
}) => {
  const textAlignClass =
    align === "center"
      ? "text-center"
      : align === "right"
        ? "text-right"
        : "text-left";

  const adjustedSize = size
    ? isLastColumn
      ? size + 36
      : isFirstColumn
        ? size + 12
        : size + 24
    : size;

  const isSticky = stickyPosition !== undefined;

  const style = {
    ...(adjustedSize ? { width: `${adjustedSize}px` } : {}),
    ...(maxWidth ? { maxWidth: `${maxWidth}px` } : {}),
    ...(isSticky && stickyDirection === "left"
      ? { left: `${stickyPosition}px` }
      : {}),
    ...(isSticky && stickyDirection === "right"
      ? { right: `${stickyPosition}px` }
      : {}),
  };

  const alignClass =
    align === "center"
      ? "justify-center"
      : align === "right"
        ? "justify-end"
        : "justify-start";

  const verticalAlignClass =
    verticalAlign === "middle"
      ? "align-middle"
      : verticalAlign === "bottom"
        ? "align-bottom"
        : "align-top";

  const stickyClasses = isSticky ? "sticky bg-base-white z-10" : "z-0";
  const shadowClass =
    isEdgeSticky && stickyDirection === "left"
      ? "sticky-edge-shadow-right"
      : isEdgeSticky && stickyDirection === "right"
        ? "sticky-edge-shadow-left"
        : "";

  return (
    <TableCell
      className={cn(
        "body-s p-0 font-medium text-neutral-950",
        textAlignClass,
        verticalAlignClass,
        !isSubTable && "py-4 not-first:pl-6 first:pl-3 last:pr-3",
        stickyClasses,
        shadowClass,
      )}
      style={style}
      colSpan={colSpan}
    >
      <div className={`flex ${alignClass}`}>{children}</div>
    </TableCell>
  );
};

const AppTableRow = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <TableRow
      className={cn(
        "h-14 border-b border-neutral-50 hover:bg-transparent hover:bg-none",
        className,
      )}
    >
      {children}
    </TableRow>
  );
};

const calculateStickyPositions = <T,>(
  columns: AppColumn<T>[],
): Map<string, StickyColumnMetadata> => {
  const metadata = new Map<string, StickyColumnMetadata>();

  // Calculate left-fixed positions
  let leftPosition = 0;
  let lastLeftFixedKey: string | null = null;

  for (let i = 0; i < columns.length; i++) {
    const col = columns[i];
    if (col.fixed === "left") {
      if (!col.size) {
        console.warn(`Column ${col.key} is fixed but has no size specified`);
        continue;
      }

      // Calculate adjusted size based on global position
      const isFirst = i === 0;
      const isLast = i === columns.length - 1;
      const adjustedSize = isLast
        ? col.size + 36
        : isFirst
          ? col.size + 12
          : col.size + 24;

      metadata.set(col.key, {
        position: leftPosition,
        isEdge: false,
        direction: "left",
      });

      leftPosition += adjustedSize;
      lastLeftFixedKey = col.key;
    }
  }

  // Mark last (rightmost) left-fixed column as edge
  if (lastLeftFixedKey) {
    const meta = metadata.get(lastLeftFixedKey)!;
    meta.isEdge = true;
  }

  // Calculate right-fixed positions
  let rightPosition = 0;
  let leftmostRightFixedKey: string | null = null;

  for (let i = columns.length - 1; i >= 0; i--) {
    const col = columns[i];
    if (col.fixed === "right") {
      if (!col.size) {
        console.warn(`Column ${col.key} is fixed but has no size specified`);
        continue;
      }

      const isFirst = i === 0;
      const isLast = i === columns.length - 1;
      const adjustedSize = isLast
        ? col.size + 36
        : isFirst
          ? col.size + 12
          : col.size + 24;

      metadata.set(col.key, {
        position: rightPosition,
        isEdge: false,
        direction: "right",
      });

      rightPosition += adjustedSize;
      // Keep updating to get the leftmost right-fixed column (last one encountered when iterating backwards)
      leftmostRightFixedKey = col.key;
    }
  }

  // Mark leftmost right-fixed column as edge
  if (leftmostRightFixedKey) {
    const meta = metadata.get(leftmostRightFixedKey)!;
    meta.isEdge = true;
  }

  return metadata;
};

export type WithSubTableSupport<T> = T & {
  subTable?: React.ReactNode;
  isSubTableOpen?: boolean;
};

export interface AppTableProps<T> {
  data: WithSubTableSupport<T>[];
  columns: AppColumn<WithSubTableSupport<T>>[];
  sortValue?: string;
  sortDirection?: SortDirection;
  onSortChange?: (value: string, direction: SortDirection) => void;
  isLoading?: boolean;
  skeletonRowCount?: number;
  isEmpty?: boolean;
  emptyComponent?: React.ReactNode;
  disabled?: boolean;
  headerBackground?: string;
  bodyBackground?: string;
  getRowClassName?: (row: WithSubTableSupport<T>) => string | undefined;
}

const AppTable = <T,>({
  data,
  columns,
  sortValue,
  sortDirection = "NONE",
  onSortChange,
  isLoading = false,
  skeletonRowCount = 5,
  isEmpty = false,
  emptyComponent = "No items",
  disabled = false,
  bodyBackground,
  headerBackground,
  getRowClassName,
}: AppTableProps<T>) => {
  const stickyMetadata = useMemo(
    () => calculateStickyPositions(columns),
    [columns],
  );

  return (
    <Table className="table-fixed">
      <TableHeader
        className={cn("border-b border-neutral-50", headerBackground)}
      >
        <AppTableRow>
          {columns.map((col, index) => {
            const meta = stickyMetadata.get(col.key);
            return (
              <AppTableHead
                key={col.key}
                sortable={col.sortable}
                sortValue={col.key}
                sorDirection={sortValue === col.key ? sortDirection : "NONE"}
                onSortChange={onSortChange}
                align={col.align}
                size={col.size}
                maxWidth={col.maxWidth}
                isFirstColumn={index === 0}
                isLastColumn={index === columns.length - 1}
                stickyPosition={meta?.position}
                stickyDirection={meta?.direction}
                isEdgeSticky={meta?.isEdge}
                disabled={disabled}
              >
                {col.header}
              </AppTableHead>
            );
          })}
        </AppTableRow>
      </TableHeader>

      <TableBody className={cn(bodyBackground)}>
        {isLoading ? (
          Array.from({ length: skeletonRowCount }).map((_, rowIndex) => (
            <AppTableRow key={`skeleton-${rowIndex}`}>
              {columns.map((col, index) => {
                const meta = stickyMetadata.get(col.key);
                return (
                  <AppTableCell
                    key={col.key}
                    align={col.align}
                    verticalAlign={col.verticalAlign}
                    size={col.size}
                    maxWidth={col.maxWidth}
                    isFirstColumn={index === 0}
                    isLastColumn={index === columns.length - 1}
                    stickyPosition={meta?.position}
                    stickyDirection={meta?.direction}
                    isEdgeSticky={meta?.isEdge}
                  >
                    <AppTableCellSkeleton />
                  </AppTableCell>
                );
              })}
            </AppTableRow>
          ))
        ) : isEmpty ? (
          <AppTableRow>
            <AppTableCell colSpan={columns.length} align="center">
              <div className="flex min-h-[320px] items-center justify-center">
                {emptyComponent}
              </div>
            </AppTableCell>
          </AppTableRow>
        ) : (
          data.map((row, rowIndex) => (
            <React.Fragment key={rowIndex}>
              <AppTableRow key={rowIndex} className={getRowClassName?.(row)}>
                {columns.map((col, index) => {
                  const meta = stickyMetadata.get(col.key);
                  return (
                    <AppTableCell
                      key={col.key}
                      align={col.align}
                      verticalAlign={col.verticalAlign}
                      size={col.size}
                      maxWidth={col.maxWidth}
                      isFirstColumn={index === 0}
                      isLastColumn={index === columns.length - 1}
                      stickyPosition={meta?.position}
                      stickyDirection={meta?.direction}
                      isEdgeSticky={meta?.isEdge}
                    >
                      {col.render
                        ? col.render(row)
                        : typeof col.accessor === "function"
                          ? col.accessor(row)
                          : col.accessor
                            ? (row[col.accessor] as React.ReactNode)
                            : null}
                    </AppTableCell>
                  );
                })}
              </AppTableRow>
              {!!row.subTable && row.isSubTableOpen && (
                <AppTableRow>
                  <AppTableCell colSpan={columns.length} isSubTable>
                    {row.subTable}
                  </AppTableCell>
                </AppTableRow>
              )}
            </React.Fragment>
          ))
        )}
      </TableBody>
    </Table>
  );
};

export default AppTable;
