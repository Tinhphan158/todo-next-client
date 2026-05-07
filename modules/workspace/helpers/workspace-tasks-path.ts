import type { WorkspaceBoardFilters } from "./workspace-board-filters.types";
import { workspaceBoardFiltersToSearchParams } from "./workspace-board-filters-to-search-params";

export function workspaceTasksPath(
  workspaceId: number,
  filters: WorkspaceBoardFilters,
): string {
  const usp = workspaceBoardFiltersToSearchParams(filters);
  const qs = usp.toString();
  return qs
    ? `/workspace/${workspaceId}/tasks?${qs}`
    : `/workspace/${workspaceId}/tasks`;
}
