"use client";

import { AppInputV2 } from "@/module/shared/components/AppInput";
import { SearchLoupeIcon } from "@/module/shared/icons";
import debounce from "lodash/debounce";
import { useEffect, useMemo, useState } from "react";

interface AppSearchBarProps {
  defaultValue?: string;
  placeholder?: string;
  debounceMs?: number;
  disabled?: boolean;
  onSearch?: (value: string) => void;
}

const AppSearchBar = ({
  defaultValue = "",
  placeholder = "Search...",
  debounceMs = 400,
  disabled = false,
  onSearch,
}: AppSearchBarProps) => {
  const [inputValue, setInputValue] = useState(defaultValue);

  const debouncedSearch = useMemo(
    () =>
      debounce((nextValue: string) => {
        onSearch?.(nextValue.trim());
      }, debounceMs),
    [debounceMs, onSearch],
  );

  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

  const handleChange = (nextValue: string) => {
    setInputValue(nextValue);
    debouncedSearch(nextValue);
  };

  return (
    <div className="w-full max-w-[320px]">
      <AppInputV2
        value={inputValue}
        onChange={(event) => handleChange(event.target.value)}
        placeholder={placeholder}
        startIcon={<SearchLoupeIcon />}
        size="M"
        disabled={disabled}
      />
    </div>
  );
};

export default AppSearchBar;
