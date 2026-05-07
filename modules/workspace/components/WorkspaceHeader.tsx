"use client";

import { AppButton } from "@/modules/shared/components/AppButton";
import AppSearchBar from "@/modules/shared/components/AppSearchBar";
import { PlusAddCircleIcon } from "@/modules/shared/icons";

interface WorkspaceHeaderProps {
  workspaceSearch: string;
  onWorkspaceSearch: (value: string) => void;
  onCreate: () => void;
}

const WorkspaceHeader = ({
  workspaceSearch,
  onWorkspaceSearch,
  onCreate,
}: WorkspaceHeaderProps) => {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <AppSearchBar
        defaultValue={workspaceSearch}
        placeholder="Search workspace by name"
        onSearch={onWorkspaceSearch}
      />
      <AppButton
        type="button"
        size="m"
        startIcon={<PlusAddCircleIcon />}
        onClick={onCreate}
      >
        Create workspace
      </AppButton>
    </div>
  );
};

export default WorkspaceHeader;
