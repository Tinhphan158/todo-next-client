import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";

type TabSize = "L" | "M";

const tabVariants = cva("flex items-center gap-2 button-m font-bold", {
  variants: {
    isSelected: {
      true: "border-b-[2px] border-primary-500 text-primary-500",
      false: "text-neutral-500",
    },
    size: {
      L: "px-4 py-3",
      M: "p-2",
    },
  },
  defaultVariants: {
    isSelected: false,
    size: "L",
  },
});

export interface TabItem {
  id: string;
  icon?: React.ReactNode;
  children?: React.ReactNode;
  disabled?: boolean;
}

interface AppTabItemProps {
  isDisabled?: boolean;
  isSelected?: boolean;
  size?: TabSize;
  item: TabItem;
  onClick?: (id: string) => void;
}

const AppTabItem = ({
  item,
  isDisabled,
  isSelected,
  size,
  onClick,
}: AppTabItemProps) => {
  const { id, icon, children } = item;
  const handleClick = () => {
    if (onClick) {
      onClick(id);
    }
  };
  return (
    <button
      className={cn(tabVariants({ isSelected, size }), {
        "cursor-not-allowed text-neutral-200": isDisabled,
      })}
      onClick={handleClick}
      disabled={isDisabled}
      type="button"
    >
      {icon}
      {children}
    </button>
  );
};

interface AppTabsProps {
  items?: TabItem[];
  selectedTab?: string;
  size?: TabSize;
  disabled?: boolean;
  onClick?: (id: string) => void;
}

const AppTabs = ({
  items = [],
  selectedTab = "",
  disabled = false,
  size = "L",
  onClick,
}: AppTabsProps) => {
  return (
    <ul className="flex items-center border-b border-neutral-100">
      {items.map((item) => (
        <li key={item.id}>
          <AppTabItem
            item={item}
            isSelected={item.id === selectedTab}
            isDisabled={item.disabled || disabled}
            onClick={onClick}
            size={size}
          />
        </li>
      ))}
    </ul>
  );
};

export default AppTabs;
