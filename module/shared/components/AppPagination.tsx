import { Pagination, PaginationContent } from "@/components/ui/pagination";
import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";
import { ArrowRightIcon } from "../icons/ArrowRightIcon";
import { ArrowLeftIcon } from "../icons/ArrowLeftIcon";

const paginationItemVariants = cva(
  "min-w-10 flex items-center justify-center body-s font-medium ",
  {
    variants: {
      size: {
        L: "rounded-[8px] p-2 gap-2",
        M: "rounded-[6px] p-1 gap-2",
      },
      isActive: {
        true: "border border-primary-500 text-primary-500 disabled:border-primary-300",
        false: "text-neutral-950 hover:border hover:border-primary-950",
      },
    },
    defaultVariants: {
      size: "L",
    },
  },
);

const AppPaginationItem = ({
  children,
  size = "L",
  page,
  currentPage,
  onClick,
  disabled = false,
}: {
  children?: React.ReactNode;
  size?: "L" | "M";
  page?: number;
  currentPage?: number;
  onClick?: (page: number) => void;
  disabled?: boolean;
}) => {
  const isActive =
    page !== undefined && currentPage !== undefined && page === currentPage;

  const handleClick = () => {
    if (page !== undefined && onClick) {
      onClick(page);
    }
  };

  return (
    //TODO: find out why min-w-10 does not work here
    <button
      style={{ minWidth: size === "L" ? "40px" : "32px" }}
      className={cn(paginationItemVariants({ size, isActive }), {
        "cursor-pointer": !disabled,
        "pointer-events-none text-neutral-200": disabled,
      })}
      onClick={handleClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

const AppPaginationEllipsis = ({
  size = "L",
  disabled,
}: {
  size?: "L" | "M";
  disabled?: boolean;
}) => {
  return (
    <AppPaginationItem size={size} disabled={disabled}>
      ...
    </AppPaginationItem>
  );
};

const AppPaginationNext = ({
  size = "L",
  isDisabled,
  currentPage,
  onClick,
}: {
  size?: "L" | "M";
  isDisabled?: boolean;
  currentPage: number;
  onClick?: (page: number) => void;
}) => {
  return (
    <AppPaginationItem
      size={size}
      page={currentPage + 1}
      onClick={onClick}
      disabled={isDisabled}
    >
      <ArrowRightIcon
        size={24}
        className={cn({
          "text-neutral-950": !isDisabled,
          "text-neutral-200": isDisabled,
        })}
      />
    </AppPaginationItem>
  );
};

const AppPaginationPrevious = ({
  size = "L",
  isDisabled,
  currentPage,
  onClick,
}: {
  size?: "L" | "M";
  isDisabled?: boolean;
  currentPage: number;
  onClick?: (page: number) => void;
}) => {
  return (
    <AppPaginationItem
      size={size}
      page={currentPage - 1}
      onClick={onClick}
      disabled={isDisabled}
    >
      <ArrowLeftIcon
        size={24}
        className={cn({
          "text-neutral-950": !isDisabled,
          "text-neutral-200": isDisabled,
        })}
      />
    </AppPaginationItem>
  );
};

const AppPagination = ({
  currentPage = 1,
  totalPages = 1,
  size = "L",
  onPageChange,
  disabled = false,
}: {
  currentPage?: number;
  totalPages?: number;
  size?: "L" | "M";
  onPageChange?: (page: number) => void;
  disabled?: boolean;
}) => {
  const getPageNumbers = () => {
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const pages: (number | string)[] = [];
    const pagesBeforeCurrent = 2;
    const pagesAfterCurrent = 2;

    pages.push(1);

    const startPage = Math.max(2, currentPage - pagesBeforeCurrent);
    const endPage = Math.min(totalPages - 1, currentPage + pagesAfterCurrent);

    if (startPage > 2) {
      pages.push("...");
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    if (endPage < totalPages - 1) {
      pages.push("...");
    }

    if (totalPages > 1) {
      pages.push(totalPages);
    }

    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <Pagination>
      <PaginationContent>
        <AppPaginationPrevious
          size={size}
          isDisabled={disabled || currentPage === 1}
          currentPage={currentPage}
          onClick={onPageChange}
        />

        {pageNumbers.map((page, index) =>
          page === "..." ? (
            <AppPaginationEllipsis
              key={`ellipsis-${index}`}
              size={size}
              disabled={disabled}
            />
          ) : (
            <AppPaginationItem
              key={page}
              size={size}
              page={page as number}
              currentPage={currentPage}
              onClick={onPageChange}
              disabled={disabled}
            >
              {page}
            </AppPaginationItem>
          ),
        )}

        <AppPaginationNext
          size={size}
          isDisabled={disabled || currentPage === totalPages}
          currentPage={currentPage}
          onClick={onPageChange}
        />
      </PaginationContent>
    </Pagination>
  );
};

export default AppPagination;
