"use client";

import { AppButton } from "@/modules/shared/components/AppButton";
import AppDateInput from "@/modules/shared/components/AppDateInput";
import AppSearchBar from "@/modules/shared/components/AppSearchBar";
import AppSelect from "@/modules/shared/components/AppSelect";
import type { NotificationFilters } from "@/modules/notification/pages/NotificationManagementPage";
import { Filter } from "lucide-react";
import { useMemo, useState } from "react";

interface NotificationHeaderProps {
  filters: NotificationFilters;
  onChangeFilters: (next: NotificationFilters) => void;
}

const NotificationHeader = ({
  filters,
  onChangeFilters,
}: NotificationHeaderProps) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const dateRange = useMemo(
    () => ({
      start: filters.from ? new Date(filters.from) : undefined,
      end: filters.to ? new Date(filters.to) : undefined,
    }),
    [filters.from, filters.to],
  );

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <AppSearchBar
          defaultValue={filters.search ?? ""}
          placeholder="Search notifications"
          onSearch={(search) => onChangeFilters({ ...filters, search })}
        />
        <AppButton
          type="button"
          variant="secondary"
          startIcon={<Filter />}
          onClick={() => setIsFilterOpen((prev) => !prev)}
        >
          Filter
        </AppButton>
      </div>
      {isFilterOpen && (
        <div className="grid grid-cols-1 gap-3 rounded-[10px] border border-neutral-100 p-3 lg:grid-cols-2">
          <div className="flex flex-col gap-1">
            <p className="body-s font-medium text-neutral-700">Date range</p>
            <AppDateInput
              type="range"
              value={dateRange}
              startPlaceholder="DD-MM-YYYY"
              endPlaceholder="DD-MM-YYYY"
              onChange={(next) => {
                const range = next as { start?: Date; end?: Date } | undefined;
                onChangeFilters({
                  ...filters,
                  from: range?.start?.toISOString(),
                  to: range?.end?.toISOString(),
                });
              }}
            />
          </div>
          <AppSelect
            label={<p className="body-s font-medium text-neutral-700">Status</p>}
            value={filters.viewed}
            placeholder="All statuses"
            onChange={(value) =>
              onChangeFilters({
                ...filters,
                viewed: value as NotificationFilters["viewed"],
              })
            }
            items={[
              { value: "all", children: "All" },
              { value: "true", children: "Viewed" },
              { value: "false", children: "Unviewed" },
            ]}
          />
        </div>
      )}
    </div>
  );
};

export default NotificationHeader;
