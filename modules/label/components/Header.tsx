"use client";

import { AppButton } from "@/modules/shared/components/AppButton";
import AppSearchBar from "@/modules/shared/components/AppSearchBar";
import { PlusAddCircleIcon } from "@/modules/shared/icons";

interface HeaderProps {
  search: string;
  onSearch: (value: string) => void;
  onCreate: () => void;
}

const Header = ({ search, onSearch, onCreate }: HeaderProps) => {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <AppSearchBar
        defaultValue={search}
        placeholder="Search label by name"
        onSearch={onSearch}
      />
      <AppButton
        type="button"
        size="m"
        startIcon={<PlusAddCircleIcon />}
        onClick={onCreate}
      >
        Create label
      </AppButton>
    </div>
  );
};

export default Header;
