"use client";
import { cva } from "class-variance-authority";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  DoubleLeftIcon,
  DoubleRightIcon,
} from "../icons";
import { useState } from "react";
import { useFormatter, useTranslations } from "next-intl";
import { AppButton } from "./AppButton";

type CalendarItemState =
  | "selected"
  | "today"
  | "active"
  | "inactive"
  | "empty"
  | "disabled"
  | "available"
  | "today-middle"
  | "start"
  | "middle"
  | "end";
const CALENDAR_ROW_COUNT = 6;

const appCalendarItemVariant = cva(
  "transition-all flex pb-3 gap-[10px] w-13 body-s font-medium [&_[data-container]]:py-1 [&_[data-container]]:rounded-[8px] [&_[data-container]]:flex [&_[data-container]]:justify-center [&_[data-container]]:items-center [&_[data-container]]:h-8 [&_[data-container]]:w-8",
  {
    variants: {
      state: {
        selected:
          "[&_[data-background]]:px-[10px] [&_[data-container]]:bg-primary-500 [&_[data-container]]:text-base-white",
        today:
          "[&_[data-background]]:px-[10px] [&_[data-container]]:border [&_[data-container]]:border-primary-500 [&_[data-container]]:text-neutral-950",
        active:
          "[&_[data-background]]:px-[10px] [&_[data-container]]:text-neutral-950",
        inactive:
          "[&_[data-background]]:px-[10px] [&_[data-container]]:text-neutral-300",
        empty:
          "[&_[data-background]]:px-[10px] [&_[data-container]]:text-background",
        disabled:
          "[&_[data-background]]:px-[10px] [&_[data-container]]:bg-neutral-100 [&_[data-container]]:text-neutral-300",
        available:
          "[&_[data-background]]:px-[10px] [&_[data-container]]:bg-primary-100 [&_[data-container]]:text-neutral-950",
        "today-middle":
          "[&_[data-background]]:px-[10px] z-10 [&_[data-background]]:bg-primary-100 [&_[data-container]]:bg-primary-100 [&_[data-container]]:border [&_[data-container]]:border-primary-500 [&_[data-container]]:text-neutral-950",
        start:
          "justify-end [&_[data-background]]:pr-[10px] [&_[data-background]]:rounded-l-[8px] [&_[data-background]]:bg-primary-500 [&_[data-container]]:bg-primary-500 [&_[data-container]]:text-base-white",
        middle:
          "[&_[data-background]]:px-[10px] [&_[data-background]]:bg-primary-100 [&_[data-container]]:bg-primary-100 [&_[data-container]]:text-neutral-950",
        end: "justify-start [&_[data-background]]:pl-[10px] [&_[data-background]]:rounded-r-[8px] [&_[data-background]]:bg-primary-500 [&_[data-container]]:bg-primary-500 [&_[data-container]]:text-base-white",
      },
    },
    defaultVariants: {
      state: "active",
    },
  },
);

export const AppCaledarItem = ({
  date,
  disabled,
  state = "available",
  onClick,
}: {
  date: Date;
  state?: CalendarItemState;
  disabled?: boolean;
  onClick?: (date: Date) => void;
}) => {
  const handleOnClick = () => {
    onClick?.(date);
  };

  return (
    <button
      className={appCalendarItemVariant({ state })}
      onClick={handleOnClick}
      data-state={state}
      disabled={disabled}
    >
      <div className="transition-all" data-background>
        <div className="transition-all" data-container>
          <span className="h-fit transition-all" data-text>
            {date?.getDate()}
          </span>
        </div>
      </div>
    </button>
  );
};

export interface AppCalendarItemProps {
  date: Date;
  type?: "single" | "range";
  isDisabled?: boolean;
  selectedValue?: Date | { start?: Date; end?: Date };
  currentCalendarDate?: Date;
  onClick?: (day: Date) => void;
}

const AppCaledarItemWrapper = ({
  date,
  type = "single",
  isDisabled,
  currentCalendarDate,
  selectedValue,
  onClick,
}: AppCalendarItemProps) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const dateCopy = new Date(date);
  dateCopy.setHours(0, 0, 0, 0);

  let state: CalendarItemState = "active";

  if (isDisabled) {
    state = "disabled";
  } else if (
    currentCalendarDate &&
    dateCopy.getMonth() !== currentCalendarDate.getMonth()
  ) {
    state = "inactive";
  } else if (type === "single" && selectedValue instanceof Date) {
    const selectedCopy = new Date(selectedValue);
    selectedCopy.setHours(0, 0, 0, 0);
    if (dateCopy.getTime() === selectedCopy.getTime()) {
      state = "selected";
    } else if (dateCopy.getTime() === today.getTime()) {
      state = "today";
    } else {
      state = "active";
    }
  } else if (
    type === "range" &&
    selectedValue &&
    typeof selectedValue === "object" &&
    !Array.isArray(selectedValue)
  ) {
    const rangeValue = selectedValue as { start?: Date; end?: Date };
    const startCopy = rangeValue.start ? new Date(rangeValue.start) : null;
    const endCopy = rangeValue.end ? new Date(rangeValue.end) : null;

    startCopy?.setHours(0, 0, 0, 0);
    endCopy?.setHours(0, 0, 0, 0);

    if (startCopy && !endCopy) {
      if (dateCopy.getTime() === startCopy.getTime()) {
        state = "start";
      } else if (dateCopy.getTime() === today.getTime()) {
        state = "today";
      } else {
        state = "active";
      }
    } else if (!startCopy && endCopy) {
      if (dateCopy.getTime() === endCopy.getTime()) {
        state = "end";
      } else if (dateCopy.getTime() === today.getTime()) {
        state = "today";
      } else {
        state = "active";
      }
    } else if (startCopy && endCopy) {
      if (
        dateCopy.getTime() === startCopy.getTime() &&
        dateCopy.getTime() === endCopy.getTime()
      ) {
        state = "selected";
      } else if (dateCopy.getTime() === startCopy.getTime()) {
        state = "start";
      } else if (dateCopy.getTime() === endCopy.getTime()) {
        state = "end";
      } else if (
        dateCopy.getTime() > startCopy.getTime() &&
        dateCopy.getTime() < endCopy.getTime()
      ) {
        if (dateCopy.getTime() === today.getTime()) {
          state = "today-middle";
        } else {
          state = "middle";
        }
      } else if (dateCopy.getTime() === today.getTime()) {
        state = "today";
      } else {
        state = "active";
      }
    } else if (dateCopy.getTime() === today.getTime()) {
      state = "today";
    }
  } else if (dateCopy.getTime() === today.getTime()) {
    state = "today";
  }

  return <AppCaledarItem date={date} state={state} onClick={onClick} />;
};

export interface AppCalendarItemListProps {
  type?: "single" | "range";
  disabledCondition?: (date: Date) => boolean;
  selectedValue?: Date | { start?: Date; end?: Date };
  currentCalendarDate?: Date;
  onClick?: (day: Date) => void;
}

const generateCalendarDates = (currentDate: Date): Date[] => {
  const dates: Date[] = [];

  const firstDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1,
  );
  const firstDayOfWeek = firstDayOfMonth.getDay();
  const lastDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0,
  );
  const daysInCurrentMonth = lastDayOfMonth.getDate();

  const daysFromPreviousMonth = firstDayOfWeek;
  const lastDayOfPreviousMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    0,
  );

  for (let i = daysFromPreviousMonth - 1; i >= 0; i--) {
    const date = new Date(lastDayOfPreviousMonth);
    date.setDate(lastDayOfPreviousMonth.getDate() - i);
    dates.push(date);
  }

  for (let day = 1; day <= daysInCurrentMonth; day++) {
    dates.push(
      new Date(currentDate.getFullYear(), currentDate.getMonth(), day),
    );
  }

  let dayOfNextMonth = 1;
  while (dates.length < CALENDAR_ROW_COUNT * 7) {
    dates.push(
      new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() + 1,
        dayOfNextMonth,
      ),
    );
    dayOfNextMonth++;
  }

  return dates;
};

const AppCaledarItemList = ({
  type,
  disabledCondition,
  selectedValue,
  currentCalendarDate,
  onClick,
}: AppCalendarItemListProps) => {
  const t = useTranslations("shared.calendar.weekdays");
  const weekDates = [
    { key: "sun", label: t("sun") },
    { key: "mon", label: t("mon") },
    { key: "tue", label: t("tue") },
    { key: "wed", label: t("wed") },
    { key: "thu", label: t("thu") },
    { key: "fri", label: t("fri") },
    { key: "sat", label: t("sat") },
  ] as const;

  const dates = currentCalendarDate
    ? generateCalendarDates(currentCalendarDate)
    : [];

  return (
    <div className="grid grid-cols-7 p-3">
      {weekDates.map((date) => (
        <div
          key={date.key}
          className="body-s pt-2 pb-3 text-center font-medium text-neutral-950"
        >
          {date.label}
        </div>
      ))}
      {dates.map((date, index) => (
        <AppCaledarItemWrapper
          key={index}
          type={type}
          date={date}
          isDisabled={disabledCondition?.(date)}
          selectedValue={selectedValue}
          onClick={onClick}
          currentCalendarDate={currentCalendarDate}
        />
      ))}
    </div>
  );
};

const AppCalendarHeader = ({
  currentCalendarDate,
  hasNext = true,
  hasPrevious = true,
  onNext,
  onDoubleNext,
  onPrevious,
  onDoublePrevious,
}: {
  currentCalendarDate?: Date;
  hasNext?: boolean;
  hasPrevious?: boolean;
  onNext?: () => void;
  onDoubleNext?: () => void;
  onPrevious?: () => void;
  onDoublePrevious?: () => void;
}) => {
  const format = useFormatter();

  return (
    <div className="flex justify-between rounded-t-[2px] border-b border-neutral-100 px-3 py-2">
      <div className="flex items-center">
        {hasPrevious && (
          <>
            <button onClick={onDoublePrevious}>
              <DoubleLeftIcon className="h-5 w-5 text-neutral-600" />
            </button>
            <button onClick={onPrevious}>
              <ArrowLeftIcon className="h-5 w-5 text-neutral-600" />
            </button>
          </>
        )}
      </div>

      <span className="caption-m font-bold text-neutral-950">
        {currentCalendarDate
          ? format
              .dateTime(currentCalendarDate, {
                month: "short",
                year: "numeric",
              })
              .toUpperCase()
          : ""}
      </span>

      <div className="flex items-center">
        {hasNext && (
          <>
            <button onClick={onNext}>
              <ArrowRightIcon className="h-5 w-5 text-neutral-600" />
            </button>
            <button onClick={onDoubleNext}>
              <DoubleRightIcon className="h-5 w-5 text-neutral-600" />
            </button>
          </>
        )}
      </div>
    </div>
  );
};

const AppCalendarFooter = ({
  hasToDayButton = true,
  onTodayClick,
}: {
  hasToDayButton?: boolean;
  onTodayClick?: () => void;
}) => {
  const t = useTranslations("shared.calendar");

  return (
    <div className="flex justify-center rounded-b-[2px] border-t border-neutral-100 py-2">
      {hasToDayButton && (
        <button
          className="button-m text-primary-500 font-bold"
          onClick={onTodayClick}
        >
          {t("today-button")}
        </button>
      )}
    </div>
  );
};

const AppCalendarRangeFooter = ({
  onOkayClick,
}: {
  onOkayClick?: () => void;
}) => {
  const t = useTranslations("shared.calendar");

  return (
    <div className="flex justify-end rounded-b-[2px] border-t border-neutral-100 py-2 pr-2">
      <AppButton onClick={onOkayClick} size="s">
        {t("okay-button")}
      </AppButton>
    </div>
  );
};

export interface AppCalendar {
  type?: "single" | "range";
  value?: Date | { start?: Date; end?: Date };
  initialMonth?: Date;
  showFooter?: boolean;
  onChange?: (date: Date | { start?: Date; end?: Date }) => void;
  disabledCondition?: (date: Date) => boolean;
  onOkayClick?: () => void;
}

const AppCalendar = ({
  type = "single",
  value,
  initialMonth,
  showFooter = true,
  onChange,
  disabledCondition,
  onOkayClick,
}: AppCalendar) => {
  const [currentMonth, setCurrentMonth] = useState<Date>(
    initialMonth || new Date(),
  );

  const goToNextMonth = () => {
    setCurrentMonth((prev) => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() + 1);
      return newDate;
    });
  };

  const goToPreviousMonth = () => {
    setCurrentMonth((prev) => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() - 1);
      return newDate;
    });
  };

  const goToNextYear = () => {
    setCurrentMonth((prev) => {
      const newDate = new Date(prev);
      newDate.setFullYear(prev.getFullYear() + 1);
      return newDate;
    });
  };

  const goToPreviousYear = () => {
    setCurrentMonth((prev) => {
      const newDate = new Date(prev);
      newDate.setFullYear(prev.getFullYear() - 1);
      return newDate;
    });
  };

  const selectToday = () => {
    onChange?.(new Date());
  };

  const handleDateClick = (date: Date) => {
    if (type === "range") {
      const rangeValue = (value as { start?: Date; end?: Date }) || {};
      let newRange: { start?: Date; end?: Date };
      if (!rangeValue.start) {
        newRange = { start: date };
      } else if (!rangeValue.end) {
        const sorted = [rangeValue.start, date].sort(
          (a, b) => a.getTime() - b.getTime(),
        );
        newRange = { start: sorted[0], end: sorted[1] };
      } else {
        newRange = { start: date };
      }
      onChange?.(newRange);
    } else {
      onChange?.(date);
    }
  };

  const nextMonth = new Date(currentMonth);
  nextMonth.setMonth(currentMonth.getMonth() + 1);

  return (
    <div className="bg-base-white flex border border-neutral-100">
      <div>
        <AppCalendarHeader
          hasNext={type === "single"}
          currentCalendarDate={currentMonth}
          onNext={goToNextMonth}
          onDoubleNext={goToNextYear}
          onPrevious={goToPreviousMonth}
          onDoublePrevious={goToPreviousYear}
        />
        <div className="flex w-[307px]">
          <AppCaledarItemList
            type={type}
            currentCalendarDate={currentMonth}
            selectedValue={value}
            onClick={handleDateClick}
            disabledCondition={disabledCondition}
          />
        </div>
        {showFooter && (
          <AppCalendarFooter
            hasToDayButton={type === "single"}
            onTodayClick={selectToday}
          />
        )}
      </div>
      {type === "range" && (
        <div>
          <AppCalendarHeader
            currentCalendarDate={nextMonth}
            hasPrevious={false}
            onNext={goToNextMonth}
            onDoubleNext={goToNextYear}
          />
          <div className="flex w-[307px]">
            <AppCaledarItemList
              type={type}
              currentCalendarDate={nextMonth}
              selectedValue={value}
              onClick={handleDateClick}
              disabledCondition={disabledCondition}
            />
          </div>
          {showFooter && <AppCalendarRangeFooter onOkayClick={onOkayClick} />}
        </div>
      )}
    </div>
  );
};

export default AppCalendar;
