import { SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowDownIcon } from "../icons";
import {
  AppSelectContainer,
  AppSelectContent,
  AppSelectItemList,
} from "./AppSelect";
import { cn } from "@/lib/utils";

interface AppPageSizeSelectItemProps {
  value: string;
  children: React.ReactNode;
}

export interface AppPageSizeSelectProps {
  items: AppPageSizeSelectItemProps[];
  value?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  placeholder?: string;
  label?: React.ReactNode;
  size?: "L" | "M";
}

const AppPageSizeSelectTrigger = ({
  placeholder,
  label,
  size = "L",
}: AppPageSizeSelectProps) => {
  return (
    <div className="flex flex-col gap-1">
      {label}
      <SelectTrigger
        className={cn(
          "group body-s bg-base-white flex h-fit items-center justify-between rounded-[8px] border border-neutral-200 leading-none font-bold whitespace-nowrap text-neutral-950 hover:border-neutral-600 data-disabled:border-neutral-200 data-disabled:bg-neutral-50 data-placeholder:font-medium data-placeholder:text-neutral-500 [&>span]:whitespace-nowrap",
          { "py-2 pr-2 pl-3": size === "L", "py-1 pr-1 pl-2": size === "M" },
        )}
      >
        <SelectValue placeholder={placeholder} />
        <ArrowDownIcon className="h-6 w-6 text-neutral-950 transition-all group-data-disabled:text-neutral-300 group-data-[state=open]:rotate-180" />
      </SelectTrigger>
    </div>
  );
};

const AppPageSizeSelect = (props: AppPageSizeSelectProps) => {
  const { value, items, onChange, disabled } = props;

  return (
    <AppSelectContainer value={value} onChange={onChange} disabled={disabled}>
      <AppPageSizeSelectTrigger {...props} />
      <AppSelectContent side="top">
        <AppSelectItemList items={items} />
      </AppSelectContent>
    </AppSelectContainer>
  );
};

export default AppPageSizeSelect;
