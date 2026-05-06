"use client";

import { AppButton } from "@/module/shared/components/AppButton";
import AppSearchBar from "@/module/shared/components/AppSearchBar";
import { PlusAddCircleIcon } from "@/module/shared/icons";

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
