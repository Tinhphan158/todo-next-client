import type { TaskPriority } from "@/store/types";

import type { WorkspaceBoardFilters } from "./workspace-board-filters.types";

export function parseWorkspaceBoardFilters(
  sp: URLSearchParams,
): WorkspaceBoardFilters {
  const rawSearch = sp.get("search");
  const prioritiesRaw = sp.getAll("priorities");
  const prioritySet = new Set<TaskPriority>(["Low", "Medium", "High"]);
  const priorities = prioritiesRaw.filter((p): p is TaskPriority =>
    prioritySet.has(p as TaskPriority),
  );
  return {
    search: rawSearch ?? undefined,
    labelIds: sp
      .getAll("labelIds")
      .map(Number)
      .filter((n) => Number.isInteger(n)),
    startTimeFrom: sp.get("startTimeFrom") ?? undefined,
    startTimeTo: sp.get("startTimeTo") ?? undefined,
    endTimeFrom: sp.get("endTimeFrom") ?? undefined,
    endTimeTo: sp.get("endTimeTo") ?? undefined,
    priorities,
  };
}
