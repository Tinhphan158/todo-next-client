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

      //TODO: this is quite convoluted, may need to fix this. Bet I'll forget why value !== date here in a month
      if (newRange.end && newRange.start && value !== value) {
        closeDialog();
      }
    }
  };

  return (
    <>
      <AppPopover
        open={isOpen}
        onOpenChange={toggleDialog}
        align="start"
        trigger={
          <button disabled={disabled} className="w-full">
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
