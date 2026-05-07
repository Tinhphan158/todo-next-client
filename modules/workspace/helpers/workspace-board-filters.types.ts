import type { TaskPriority } from "@/store/types";

export interface WorkspaceBoardFilters {
  search?: string;
  labelIds: number[];
  startTimeFrom?: string;
  startTimeTo?: string;
  endTimeFrom?: string;
  endTimeTo?: string;
  priorities: TaskPriority[];
}

export const EMPTY_WORKSPACE_BOARD_FILTERS: WorkspaceBoardFilters = {
  labelIds: [],
  priorities: [],
};
