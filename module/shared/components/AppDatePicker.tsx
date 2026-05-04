import { useDialog } from "../hooks/useDialog";
import AppCalendar from "./AppCalendar";
import AppDateInput from "./AppDateInput";
import AppPopover from "./AppPopover";

interface AppDatePickerProps {
  value?: Date | { start?: Date; end?: Date };
  startPlaceholder?: string;
  endPlaceholder?: string;
  type?: "single" | "range";
  disabled?: boolean;
  showFooter?: boolean;
  onChange?: (date: Date | { start?: Date; end?: Date } | undefined) => void;
  disabledCondition?: (date: Date) => boolean;
}

const AppDatePicker = ({
  type = "range",
  value,
  startPlaceholder,
  endPlaceholder,
  showFooter,
  disabled,
  disabledCondition,
  onChange,
}: AppDatePickerProps) => {
  const { isOpen, toggleDialog, closeDialog } = useDialog();

  const getInitialMonth = (): Date | undefined => {
    if (!value) return undefined;

    if (type === "single" && value instanceof Date) {
      return value;
    }

    if (
      type === "range" &&
      typeof value === "object" &&
      !Array.isArray(value)
    ) {
      const rangeValue = value as { start?: Date; end?: Date };
      return rangeValue.start || rangeValue.end;
    }

    return undefined;
  };

  const handleSetValue = (
    value: Date | { start?: Date; end?: Date } | undefined,
  ) => {
    if (type === "single") {
      if (value === undefined) {
        onChange?.(undefined);
        return;
      }
      const singleDate = value as Date;
      const adjustedDate = new Date(singleDate);
      adjustedDate.setHours(0, 0, 0, 0);
      onChange?.(adjustedDate);
      closeDialog();
    } else {
      const newRange = value as { start?: Date; end?: Date };
      const adjustedRange = { ...newRange };

      if (adjustedRange.start) {
        adjustedRange.start = new Date(adjustedRange.start);
        adjustedRange.start.setHours(0, 0, 0, 0);
      }

      if (adjustedRange.end) {
        adjustedRange.end = new Date(adjustedRange.end);
        adjustedRange.end.setHours(23, 59, 59, 999);
      }

      onChange?.(adjustedRange);
    }
  };

  return (
    <>
      <AppPopover
        open={isOpen}
        onOpenChange={toggleDialog}
        align="start"
        contentClassName="w-auto min-w-0 gap-0 p-0 ring-0 rounded-[8px] overflow-hidden shadow-md"
        trigger={
          <button
            type="button"
            disabled={disabled}
            className="focus-visible:ring-primary-500 w-full rounded-[8px] border-0 bg-transparent p-0 text-left outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50"
          >
            <AppDateInput
              startPlaceholder={startPlaceholder}
              endPlaceholder={endPlaceholder}
              type={type}
              value={value}
              onChange={handleSetValue}
              isDisabled={disabled}
            />
          </button>
        }
      >
        <div>
          <AppCalendar
            type={type}
            value={value}
            initialMonth={getInitialMonth()}
            onChange={handleSetValue}
            onOkayClick={closeDialog}
            showFooter={showFooter}
            disabledCondition={disabledCondition}
          />
        </div>
      </AppPopover>
    </>
  );
};

export default AppDatePicker;
