import AppEmptyState from "./AppEmptyState";
import AppTable, { AppTableProps } from "./AppTable";
import AppTablePagination, {
  AppTablePaginationProps,
} from "./AppTablePagination";

export interface AppPaginationTableProps<T> {
  table: AppTableProps<T>;
  pagination: AppTablePaginationProps;
  emptyText?: string;
}

const AppPaginationTable = <T,>({
  table,
  pagination,
  emptyText = "No data",
}: AppPaginationTableProps<T>) => {
  return (
    <div className="bg-base-white rounded-[12px] border border-neutral-100">
      <div className="px-3">
        <AppTable
          {...table}
          emptyComponent={<AppEmptyState label={emptyText} />}
        />
      </div>
      {!table.isEmpty && (
        <div className="flex justify-end gap-2 p-6">
          <AppTablePagination {...pagination} />
        </div>
      )}
    </div>
  );
};

export default AppPaginationTable;
