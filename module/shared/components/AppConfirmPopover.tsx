import { InfoIcon } from "../icons";
import { AppButton } from "./AppButton";
import AppPopover from "./AppPopover";
import { PopoverClose } from "@/components/ui/popover";

export interface AppConfirmPopoverProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  title?: string;
  formId?: string;
  trigger?: React.ReactNode;
  cancelButtonLabel?: string;
  confirmButtonLabel?: string;
  confirmButtonType?: "button" | "submit";
  isConfirmLoading?: boolean;
  closeOnConfirm?: boolean;
  align?: "start" | "center" | "end";
  side?: "top" | "right" | "bottom" | "left";
  offset?: number;
  onConfirm?: () => void;
  onCancel?: () => void;
}

const AppConfirmPopover = ({
  open,
  title,
  formId,
  cancelButtonLabel,
  confirmButtonLabel,
  confirmButtonType = "button",
  isConfirmLoading = false,
  closeOnConfirm = true,
  trigger,
  align,
  side,
  offset,
  onOpenChange,
  onConfirm,
  onCancel,
}: AppConfirmPopoverProps) => {
  const handleOpenChange = (open: boolean) => {
    if (!isConfirmLoading) {
      onOpenChange?.(open);
    }
  };

  return (
    <AppPopover
      align={align}
      offset={offset}
      side={side}
      open={open}
      onOpenChange={handleOpenChange}
      trigger={trigger}
    >
      <div className="flex w-[288px] flex-col gap-6 rounded-[12px] p-4">
        <div className="flex gap-2">
          <InfoIcon className="text-warning-500" size={24} />
          <p className="body-s font-medium text-neutral-950">{title}</p>
        </div>
        <div className="flex items-center justify-end gap-2">
          <PopoverClose asChild>
            <AppButton
              size="s"
              variant="secondary"
              onClick={onCancel}
              disabled={isConfirmLoading}
            >
              {cancelButtonLabel}
            </AppButton>
          </PopoverClose>

          {closeOnConfirm ? (
            <PopoverClose asChild>
              <AppButton
                onClick={onConfirm}
                size="s"
                variant="primary"
                type={confirmButtonType}
                form={formId}
                isLoading={isConfirmLoading}
              >
                {confirmButtonLabel}
              </AppButton>
            </PopoverClose>
          ) : (
            <AppButton
              onClick={onConfirm}
              size="s"
              variant="primary"
              type={confirmButtonType}
              form={formId}
              isLoading={isConfirmLoading}
            >
              {confirmButtonLabel}
            </AppButton>
          )}
        </div>
      </div>
    </AppPopover>
  );
};

export default AppConfirmPopover;
