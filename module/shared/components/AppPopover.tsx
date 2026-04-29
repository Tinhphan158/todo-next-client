import {
  Popover,
  PopoverContent,
  PopoverTrigger,
  PopoverAnchor,
} from "@/components/ui/popover";

export interface AppPopover {
  trigger?: React.ReactNode;
  anchor?: React.ReactNode;
  open?: boolean;
  children?: React.ReactNode;
  align?: "start" | "center" | "end";
  side?: "top" | "right" | "bottom" | "left";
  offset?: number;
  modal?: boolean;
  onOpenChange?: (open: boolean) => void;
  onFocusOutside?: () => void;
}

const AppPopover = ({
  trigger,
  anchor,
  align,
  side,
  offset,
  open,
  modal,
  children,
  onOpenChange,
  onFocusOutside,
}: AppPopover) => {
  return (
    <Popover open={open} onOpenChange={onOpenChange} modal={modal}>
      {trigger && <PopoverTrigger asChild>{trigger}</PopoverTrigger>}
      {anchor && <PopoverAnchor asChild>{anchor}</PopoverAnchor>}
      <PopoverContent
        asChild
        align={align}
        alignOffset={offset}
        side={side}
        onFocusOutside={onFocusOutside}
      >
        {children}
      </PopoverContent>
    </Popover>
  );
};

export default AppPopover;
