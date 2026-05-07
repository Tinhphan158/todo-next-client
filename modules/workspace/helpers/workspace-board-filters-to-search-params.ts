import type { WorkspaceBoardFilters } from "./workspace-board-filters.types";

export function workspaceBoardFiltersToSearchParams(
  f: WorkspaceBoardFilters,
): URLSearchParams {
  const usp = new URLSearchParams();
  const q = f.search?.trim();
  if (q) usp.set("search", q);
  f.labelIds.forEach((id) => usp.append("labelIds", String(id)));
  if (f.startTimeFrom) usp.set("startTimeFrom", f.startTimeFrom);
  if (f.startTimeTo) usp.set("startTimeTo", f.startTimeTo);
  if (f.endTimeFrom) usp.set("endTimeFrom", f.endTimeFrom);
  if (f.endTimeTo) usp.set("endTimeTo", f.endTimeTo);
  f.priorities.forEach((p) => usp.append("priorities", p));
  return usp;
}
