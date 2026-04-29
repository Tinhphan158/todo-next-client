import { cva } from "class-variance-authority";
import { useState, useEffect } from "react";
import { CalendarScheduleIcon } from "../icons";

interface AppDateInputProps {
  type?: "single" | "range";
  size?: "L" | "M" | "S";
  isDisabled?: boolean;
  startPlaceholder?: string;
  endPlaceholder?: string;
  value?: Date | { start?: Date; end?: Date };
  onChange?: (date: Date | { start?: Date; end?: Date } | undefined) => void;
}

const formatDate = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const parseDate = (value: string): Date | null => {
  const datePattern = /^\d{4}-\d{2}-\d{2}$/;
  if (!datePattern.test(value)) {
    return null;
  }

  const [year, month, day] = value.split("-").map(Number);
  const date = new Date(year, month - 1, day);

  if (
    date.getFullYear() !== year ||
    date.getMonth() !== month - 1 ||
    date.getDate() !== day
  ) {
    return null;
  }

  return date;
};

const isValidDateString = (value: string): boolean => {
  return parseDate(value) !== null;
};

const appDateInputVariant = cva(
  "transition-all bg-base-white rounded-[8px] border border-neutral-200 hover:border-neutral-300 flex [&_input]:placeholder:text-neutral-300 [&_input]:placeholder:body-s [&_input]:placeholder:font-medium [&_input]:body-s [&_input]:font-medium [&_input]:text-neutral-950 [&_input]:outline-none [&_input]:flex-1 items-center",
  {
    variants: {
      size: {
        L: "py-2 px-3 [&_svg]:h-5 [&_svg]:w-5",
        M: "py-[5px] px-3 [&_svg]:h-5 [&_svg]:w-5",
        S: "px-2 [&_svg]:h-4 [&_svg]:w-4",
      },
      isDisabled: {
        true: "bg-neutral-50 [&_input]:placeholder:text-neutral-200 [&_svg]:text-neutral-200",
        false: "[&_svg]:text-neutral-500",
      },
      type: {
        single: "",
        range: "gap-2",
      },
    },
    defaultVariants: {
      size: "L",
      isDisabled: false,
      type: "single",
    },
  },
);

const AppDateInput = ({
  type = "single",
  value,
  startPlaceholder,
  endPlaceholder,
  size = "L",
  isDisabled = false,
  onChange,
}: AppDateInputProps) => {
  const [startInput, setStartInput] = useState("");
  const [endInput, setEndInput] = useState("");

  useEffect(() => {
    if (type === "single" && value instanceof Date) {
      //TODO: find a better way for this
      //eslint-disable-next-line react-hooks/set-state-in-effect
      setStartInput(formatDate(value));
    } else if (type === "range" && value && !("getTime" in value)) {
      const rangeValue = value as { start?: Date; end?: Date };

      setStartInput(rangeValue.start ? formatDate(rangeValue.start) : "");
      setEndInput(rangeValue.end ? formatDate(rangeValue.end) : "");
    }
  }, [value, type]);

  const handleStartChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setStartInput(newValue);

    if (newValue === "") {
      if (type === "single") {
        onChange?.(undefined);
      } else {
        const currentValue = value as { start?: Date; end?: Date } | undefined;
        onChange?.({ start: undefined, end: currentValue?.end });
      }
    } else if (isValidDateString(newValue)) {
      const date = parseDate(newValue);
      if (date) {
        if (type === "single") {
          onChange?.(date);
        } else {
          const currentValue = value as
            | { start?: Date; end?: Date }
            | undefined;

          if (currentValue?.end) {
            // Sort dates to ensure proper start/end order
            const sorted = [date, currentValue.end].sort(
              (a, b) => a.getTime() - b.getTime(),
            );
            onChange?.({ start: sorted[0], end: sorted[1] });
          } else {
            onChange?.({ start: date, end: currentValue?.end });
          }
        }
      }
    }
  };

  const handleEndChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setEndInput(newValue);

    if (newValue === "") {
      const currentValue = value as { start?: Date; end?: Date } | undefined;
      onChange?.({ start: currentValue?.start, end: undefined });
    } else if (isValidDateString(newValue)) {
      const date = parseDate(newValue);
      if (date) {
        const currentValue = value as { start?: Date; end?: Date } | undefined;

        if (currentValue?.start) {
          // Sort dates to ensure proper start/end order
          const sorted = [currentValue.start, date].sort(
            (a, b) => a.getTime() - b.getTime(),
          );
          onChange?.({ start: sorted[0], end: sorted[1] });
        } else {
          onChange?.({ start: currentValue?.start, end: date });
        }
      }
    }
  };

  return (
    <div className={appDateInputVariant({ type, size, isDisabled })}>
      <input
        className="min-w-0"
        placeholder={startPlaceholder}
        value={startInput}
        onChange={handleStartChange}
        disabled={isDisabled}
      />
      {type === "range" && (
        <>
          <span>-</span>
          <input
            className="min-w-0"
            placeholder={endPlaceholder}
            value={endInput}
            onChange={handleEndChange}
            disabled={isDisabled}
          />
        </>
      )}
      <CalendarScheduleIcon />
    </div>
  );
};

export default AppDateInput;
