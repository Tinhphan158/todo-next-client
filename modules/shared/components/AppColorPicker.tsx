"use client";

import { cn } from "@/lib/utils";
import { useMemo } from "react";

export interface AppColorPickerProps {
  value?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  label?: React.ReactNode;
  helperText?: React.ReactNode;
  className?: string;
  placeholder?: string;
}

const HEX_COLOR_REGEX = /^#[0-9A-Fa-f]{6}$/;

const normalizeHexColor = (value?: string) => {
  if (!value) return "";
  const trimmed = value.trim();
  if (!trimmed) return "";
  const withHash = trimmed.startsWith("#") ? trimmed : `#${trimmed}`;
  return withHash.slice(0, 7).toUpperCase();
};

const AppColorPicker = ({
  value,
  onChange,
  disabled = false,
  label,
  helperText,
  className = "",
  placeholder = "#RRGGBB",
}: AppColorPickerProps) => {
  const displayValue = value ?? "";
  const normalizedValue = normalizeHexColor(displayValue);

  const swatchValue = useMemo(() => {
    if (HEX_COLOR_REGEX.test(normalizedValue)) {
      return normalizedValue;
    }
    return "#000000";
  }, [normalizedValue]);

  return (
    <div className={cn("flex w-full flex-col gap-1", className)}>
      {label && <div className="body-s font-medium text-neutral-700">{label}</div>}
      <div
        className={cn(
          "bg-base-white flex h-10 w-full items-center gap-2 rounded-[8px] border border-neutral-200 px-2",
          disabled && "bg-neutral-50",
        )}
      >
        <label
          className={cn(
            "relative h-6 w-6 shrink-0 overflow-hidden rounded border border-neutral-200",
            disabled && "cursor-not-allowed opacity-70",
          )}
        >
          <span
            className="absolute inset-0 block"
            style={{ backgroundColor: swatchValue }}
          />
          <input
            type="color"
            className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
            value={swatchValue}
            disabled={disabled}
            onChange={(event) => onChange?.(event.target.value.toUpperCase())}
          />
        </label>

        <input
          className="body-s w-full bg-transparent font-medium text-neutral-950 outline-hidden placeholder:text-neutral-500 disabled:cursor-not-allowed disabled:text-neutral-400"
          type="text"
          value={displayValue}
          disabled={disabled}
          placeholder={placeholder}
          onChange={(event) => onChange?.(event.target.value)}
          onBlur={(event) => {
            const nextValue = normalizeHexColor(event.target.value);
            if (HEX_COLOR_REGEX.test(nextValue)) {
              onChange?.(nextValue);
            }
          }}
        />
      </div>
      {helperText && (
        <div className="caption-s font-medium text-neutral-500">{helperText}</div>
      )}
    </div>
  );
};

export default AppColorPicker;
