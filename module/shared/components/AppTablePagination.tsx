import { cn } from "@/lib/utils";
import AppPageSizeSelect from "./AppPageSizeSelect";
import AppPagination from "./AppPagination";

export interface AppTablePaginationProps {
  totalItems?: number;
  totalPages?: number;
  currentPage?: number;
  currentPageSize?: number;
  size?: "M" | "L";
  disabled?: boolean;

  pageSizeOptions: { value: number; children: React.ReactNode }[];
  pageSizeDisabled?: boolean;

  onPageChange?: (page: number) => void;
  onPageSizeChange?: (pageSize: number) => void;
  formatTotalItemTitle?: (totalItem: number) => string;
}

const AppTablePagination = ({
  totalItems,
  totalPages,
  currentPage,
  currentPageSize,
  size = "M",
  disabled,
  pageSizeOptions,
  pageSizeDisabled,
  formatTotalItemTitle,
  onPageChange,
  onPageSizeChange,
}: AppTablePaginationProps) => {
  const pageSizeValue = `${currentPageSize}`;

  const pageSizeItems = pageSizeOptions.map((option) => ({
    ...option,
    value: `${option.value}`,
  }));

  const handlePageSizeChange = (pageSize: string) => {
    if (onPageSizeChange) {
      onPageSizeChange(Number(pageSize));
    }
  };

  return (
    <div className="flex items-center gap-4">
      <p
        className={cn(
          "body-s leading-none font-medium whitespace-nowrap text-neutral-950",
          {
            "text-neutral-300": disabled,
          },
        )}
      >
        {formatTotalItemTitle && formatTotalItemTitle(totalItems || 0)}
      </p>
      <AppPagination
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={onPageChange}
        size={size}
        disabled={disabled}
      />
      <AppPageSizeSelect
        disabled={pageSizeDisabled}
        items={pageSizeItems}
        value={pageSizeValue}
        onChange={handlePageSizeChange}
        size={size}
      />
    </div>
  );
};

export default AppTablePagination;
