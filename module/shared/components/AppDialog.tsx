import {
  Dialog,
  DialogHeader,
  DialogContent,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { DeleteDisabledIcon } from "../icons";

export interface AppDialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  trigger?: React.ReactNode;
  content?: React.ReactNode;
  title?: React.ReactNode;
  width?: number;
  contentOnly?: boolean;
}

const AppDialog = ({
  open,
  trigger,
  content,
  title,
  onOpenChange,
  width,
  contentOnly,
}: AppDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {trigger && <DialogTrigger>{trigger}</DialogTrigger>}
      <DialogContent
        className={
          contentOnly
            ? "flex flex-col gap-6 border-none bg-transparent shadow-none"
            : "bg-base-white flex flex-col gap-6 rounded-[12px] px-6"
        }
        showCloseButton={false}
        style={width ? { minWidth: width } : undefined}
      >
        {!contentOnly && title && (
          <DialogHeader className="flex flex-row items-center justify-between">
            <DialogTitle className="base-l font-bold text-neutral-950">
              {title}
            </DialogTitle>
            <DialogClose>
              <DeleteDisabledIcon className="h-8 w-8" />
            </DialogClose>
          </DialogHeader>
        )}
        {content}
      </DialogContent>
    </Dialog>
  );
};

export default AppDialog;
