"use client";
import React from "react";
import { AppInputV2 } from "./AppInput";

interface AppNumberInputProps extends Omit<
  React.ComponentProps<typeof AppInputV2>,
  "value" | "onChange" | "type" | "inputMode"
> {
  value?: number;
  onChange?: (value: number) => void;
  digitLimit?: number;
  allowDecimal?: boolean;
  decimalPlaces?: number;
  showThousandSeparator?: boolean;
}

// Helper function to format number with thousand separators
const formatDisplayValue = (
  value: number,
  allowDecimal: boolean,
  decimalPlaces: number,
  showThousandSeparator: boolean,
  preserveTrailingDot?: boolean,
): string => {
  if (isNaN(value)) return "";

  if (showThousandSeparator) {
    const formatted = value.toLocaleString("en-US", {
      minimumFractionDigits: 0,
      maximumFractionDigits: allowDecimal ? decimalPlaces : 0,
    });
    return preserveTrailingDot ? formatted + "." : formatted;
  }

  if (allowDecimal) {
    const formatted = value.toFixed(decimalPlaces).replace(/\.?0+$/, "");
    return preserveTrailingDot ? formatted + "." : formatted;
  }

  return value.toString();
};

export const AppNumberInput = React.forwardRef<
  HTMLInputElement,
  AppNumberInputProps
>(
  (
    {
      value = 0,
      onChange,
      digitLimit,
      allowDecimal = false,
      decimalPlaces = 2,
      showThousandSeparator = false,
      onKeyDown,
      onBlur,
      ...props
    },
    ref,
  ) => {
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      const currentValue = (e.target as HTMLInputElement).value;

      // Allow: backspace, delete, tab, escape, enter
      if (
        [8, 9, 27, 13, 46].indexOf(e.keyCode) !== -1 ||
        // Allow: Ctrl+A, Ctrl+C, Ctrl+V, Ctrl+X
        (e.keyCode === 65 && e.ctrlKey === true) ||
        (e.keyCode === 67 && e.ctrlKey === true) ||
        (e.keyCode === 86 && e.ctrlKey === true) ||
        (e.keyCode === 88 && e.ctrlKey === true) ||
        // Allow: home, end, left, right
        (e.keyCode >= 35 && e.keyCode <= 39)
      ) {
        // Call original onKeyDown if provided
        onKeyDown?.(e);
        return;
      }

      // Allow decimal point if allowDecimal is true and there's no decimal point yet
      if (
        allowDecimal &&
        (e.key === "." || e.keyCode === 190 || e.keyCode === 110)
      ) {
        if (currentValue.indexOf(".") === -1) {
          onKeyDown?.(e);
          return; // Allow decimal point
        } else {
          e.preventDefault(); // Prevent multiple decimal points
          return;
        }
      }

      // Ensure that it is a number and stop the keypress
      if (
        (e.shiftKey || e.keyCode < 48 || e.keyCode > 57) &&
        (e.keyCode < 96 || e.keyCode > 105)
      ) {
        e.preventDefault();
      } else {
        onKeyDown?.(e);
      }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const inputValue = e.target.value;

      // Store cursor position before processing
      const currentCursorPosition = inputRef.current?.selectionStart || 0;

      // Remove thousand separators for processing
      let cleanValue = inputValue.replace(/,/g, "");

      // Handle empty input - don't convert to 0, keep it empty
      if (cleanValue === "") {
        setDisplayValue("");
        onChange?.(0);
        return;
      }

      if (allowDecimal) {
        // For decimal numbers, preserve decimal point and digits after it
        const decimalRegex = /^[0-9]*\.?[0-9]*$/;
        if (!decimalRegex.test(cleanValue)) {
          cleanValue = cleanValue.replace(/[^0-9.]/g, "");
        }

        // Ensure only one decimal point
        let parts = cleanValue.split(".");
        if (parts.length > 2) {
          cleanValue = parts[0] + "." + parts.slice(1).join("");
          parts = cleanValue.split(".");
        }

        // Apply decimal places limit
        if (parts.length === 2 && parts[1].length > decimalPlaces) {
          cleanValue = parts[0] + "." + parts[1].slice(0, decimalPlaces);
        }
      } else {
        // For integers, remove any non-numeric characters
        cleanValue = cleanValue.replace(/[^0-9]/g, "");
      }

      // Apply digit limit if specified (only count digits before decimal point)
      if (digitLimit) {
        const beforeDecimal = cleanValue.split(".")[0];
        if (beforeDecimal.length > digitLimit) {
          const afterDecimal = cleanValue.includes(".")
            ? "." + cleanValue.split(".")[1]
            : "";
          cleanValue = beforeDecimal.slice(0, digitLimit) + afterDecimal;
        }
      }

      // Apply thousand separator formatting if enabled
      let formattedValue = cleanValue;
      if (showThousandSeparator && cleanValue !== "") {
        const parts = cleanValue.split(".");
        const integerPart = parts[0];
        const decimalPart = parts[1];

        // Format integer part with thousand separators
        const formattedInteger = integerPart.replace(
          /\B(?=(\d{3})+(?!\d))/g,
          ",",
        );

        // Combine with decimal part if it exists
        formattedValue =
          decimalPart !== undefined
            ? formattedInteger + "." + decimalPart
            : formattedInteger;
      }

      // Update display value with formatted string
      setDisplayValue(formattedValue);

      // Calculate new cursor position after formatting
      if (showThousandSeparator && inputRef.current) {
        const oldValue = inputValue;
        const newValue = formattedValue;
        const newCursorPosition = calculateCursorPosition(
          oldValue,
          newValue,
          currentCursorPosition,
        );

        // Set cursor position after state update
        setTimeout(() => {
          if (inputRef.current) {
            inputRef.current.setSelectionRange(
              newCursorPosition,
              newCursorPosition,
            );
          }
        }, 0);
      }

      // Convert to number and call onChange
      const numberValue =
        cleanValue === "."
          ? 0
          : allowDecimal
            ? parseFloat(cleanValue)
            : parseInt(cleanValue, 10);

      if (!isNaN(numberValue)) {
        onChange?.(numberValue);
      }
    };

    const [displayValue, setDisplayValue] = React.useState<string>(
      formatDisplayValue(
        value,
        allowDecimal,
        decimalPlaces,
        showThousandSeparator,
      ),
    );

    React.useEffect(() => {
      setDisplayValue(
        formatDisplayValue(
          value,
          allowDecimal,
          decimalPlaces,
          showThousandSeparator,
        ),
      );
    }, [value, allowDecimal, decimalPlaces, showThousandSeparator]);

    const inputRef = React.useRef<HTMLInputElement>(null);

    // Combine forwarded ref with internal ref
    React.useImperativeHandle(ref, () => inputRef.current as HTMLInputElement);

    // Helper function to calculate cursor position after formatting
    const calculateCursorPosition = (
      oldValue: string,
      newValue: string,
      oldCursor: number,
    ): number => {
      // Count commas before cursor in old value
      const commasBeforeOldCursor = (
        oldValue.substring(0, oldCursor).match(/,/g) || []
      ).length;

      // Remove commas to get the actual character position
      const actualPosition = oldCursor - commasBeforeOldCursor;

      // Count commas before the same actual position in new value
      let newPosition = 0;
      let actualCount = 0;

      for (
        let i = 0;
        i < newValue.length && actualCount < actualPosition;
        i++
      ) {
        if (newValue[i] !== ",") {
          actualCount++;
        }
        newPosition = i + 1;
      }

      return newPosition;
    };

    // Reset displayValue when value changes externally (form reset, etc.)
    React.useEffect(() => {
      if (!displayValue && value !== 0) {
        setDisplayValue("");
      }
    }, [value, displayValue]);

    return (
      <AppInputV2
        {...props}
        ref={inputRef}
        value={displayValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        onBlur={(e) => {
          onBlur?.(e);
        }}
        type="text"
        inputMode="numeric"
      />
    );
  },
);

AppNumberInput.displayName = "AppNumberInput";
