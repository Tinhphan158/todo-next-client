import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowDownIcon } from "../icons";

interface AppSelectItemProps {
  value: string;
  children: React.ReactNode;
  onClick?: (value: string) => void;
}

export interface AppSelectProps {
  items: AppSelectItemProps[];
  value?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  placeholder?: string;
  label?: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export const AppSelectTrigger = ({
  placeholder,
  children,
  label,
}: {
  placeholder?: string;
  label?: React.ReactNode;
  children?: React.ReactNode;
}) => {
  return (
    <div className="flex flex-col gap-1">
      {label}
      <SelectTrigger className="group body-s bg-base-white flex h-fit items-center justify-between rounded-[8px] border border-neutral-200 py-2 pr-2 pl-3 font-bold text-neutral-950 hover:border-neutral-600 data-disabled:border-neutral-200 data-disabled:bg-neutral-50 data-placeholder:font-medium data-placeholder:text-neutral-500">
        <SelectValue placeholder={placeholder}>{children}</SelectValue>
        <ArrowDownIcon className="h-6 w-6 text-neutral-950 transition-all group-data-disabled:text-neutral-300 group-data-[state=open]:rotate-180" />
      </SelectTrigger>
    </div>
  );
};

export const AppSelectItem = ({
  children,
  value,
  onClick,
}: AppSelectItemProps) => {
  const handleClick = () => {
    onClick?.(value);
  };

  return (
    <SelectItem
      onClick={handleClick}
      className="body-s data-[state=checked]:text-positives-500 flex flex-col gap-2 p-3 font-medium text-neutral-950 outline-hidden hover:bg-neutral-50 data-[state=checked]:font-bold"
      value={value}
    >
      {children}
    </SelectItem>
  );
};

export const AppSelectItemList = ({
  items,
  onClick,
}: {
  items: AppSelectItemProps[];
  onClick?: (value: string) => void;
}) => {
  return items.map((item) => (
    <AppSelectItem key={item.value} value={item.value} onClick={onClick}>
      {item.children}
    </AppSelectItem>
  ));
};

export const AppSelectContent = ({
  side = "bottom",
  children,
  align = "start",
}: {
  children?: React.ReactNode;
  side?: "top" | "right" | "bottom" | "left";
  align?: "start" | "center" | "end";
}) => {
  return (
    <SelectContent
      position="popper"
      side={side}
      align={align}
      sideOffset={8}
      className="bg-base-white max-h-96 rounded-[10px] border border-neutral-100 shadow-md"
    >
      {children}
    </SelectContent>
  );
};

export const AppSelectContainer = ({
  value,
  children,
  disabled,
  open,
  onOpenChange,
  onChange,
}: {
  value?: string;
  onChange?: (id: string) => void;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  disabled?: boolean;
  children?: React.ReactNode;
}) => {
  return (
    <Select
      open={open}
      onOpenChange={onOpenChange}
      value={value}
      onValueChange={onChange}
      disabled={disabled}
    >
      {children}
    </Select>
  );
};

const AppSelect = (props: AppSelectProps) => {
  const { value, items, open, onOpenChange, onChange, disabled } = props;

  return (
    <AppSelectContainer
      open={open}
      onOpenChange={onOpenChange}
      value={value}
      onChange={onChange}
      disabled={disabled}
    >
      <AppSelectTrigger {...props} />
      <AppSelectContent>
        <AppSelectItemList items={items} />
      </AppSelectContent>
    </AppSelectContainer>
  );
};

export default AppSelect;
