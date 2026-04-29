import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { DialogClose } from "@/components/ui/dialog";
import { DeleteDisabledIcon } from "../icons";

interface AppDrawerProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  customCloseButton?: React.ReactNode;
  trigger?: React.ReactNode;
  children?: React.ReactNode;
  title?: React.ReactNode;
  headerAction?: React.ReactNode;
  footerAction?: React.ReactNode;
  handleOnly?: boolean;
  layerNumber?: number;
  shouldBlur?: boolean;
}

export const AppDrawerClose = ({ children }: { children: React.ReactNode }) => {
  return <DrawerClose asChild>{children}</DrawerClose>;
};

const AppDrawer = ({
  open,
  onOpenChange,
  trigger,
  title,
  children,
  headerAction,
  footerAction,
  customCloseButton,
  handleOnly = false,
  shouldBlur = true,
}: AppDrawerProps) => {
  return (
    <Drawer
      open={open}
      onOpenChange={onOpenChange}
      direction="right"
      handleOnly={handleOnly}
    >
      {trigger && <DrawerTrigger asChild>{trigger}</DrawerTrigger>}
      <DrawerContent
        className="magic flex min-w-[630px] flex-col transition-transform"
        shouldBlur={shouldBlur}
      >
        <DrawerHeader className="bg-base-white flex items-center gap-1 border-b border-neutral-100 p-4">
          {customCloseButton || (
            <DialogClose asChild>
              <button>
                <DeleteDisabledIcon className="h-6 w-6 text-neutral-950" />
              </button>
            </DialogClose>
          )}
          <DrawerTitle className="base-l flex-1 font-bold text-neutral-950">
            {title}
          </DrawerTitle>
          {headerAction && (
            <div className="flex items-center gap-3">{headerAction}</div>
          )}
        </DrawerHeader>
        <div className="flex-1 overflow-scroll bg-neutral-50">{children}</div>
        <DrawerFooter className="bg-base-white flex items-center justify-end gap-3 border-t border-neutral-100 p-4">
          {footerAction}
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default AppDrawer;
