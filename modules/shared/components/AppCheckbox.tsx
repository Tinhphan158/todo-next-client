import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import React from "react";

interface CheckedIndicatorProps {
  size?: number;
  className?: string;
}

const CheckedIndicator: React.FC<CheckedIndicatorProps> = ({
  size = 9,
  className,
}) => {
  return (
    <svg
      width={size}
      height={(size / 9) * 7}
      viewBox="0 0 9 7"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M0.75 3.345L2.943 5.538L7.73 0.75"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

interface IndeterminateIndicatorProps {
  size?: number;
  className?: string;
}

const IndeterminateIndicator: React.FC<IndeterminateIndicatorProps> = ({
  size = 10,
  className,
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 10 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M8.88889 10H1.11111C0.816426 10 0.533811 9.88294 0.325437 9.67456C0.117063 9.46619 0 9.18357 0 8.88889V1.11111C0 0.816426 0.117063 0.533811 0.325437 0.325437C0.533811 0.117063 0.816426 0 1.11111 0H8.88889C9.18357 0 9.46619 0.117063 9.67456 0.325437C9.88294 0.533811 10 0.816426 10 1.11111V8.88889C10 9.18357 9.88294 9.46619 9.67456 9.67456C9.46619 9.88294 9.18357 10 8.88889 10Z"
        fill="currentColor"
      />
    </svg>
  );
};

interface DeselectIndicatorProps {
  size?: number;
  className?: string;
}

const DeselectIndicator: React.FC<DeselectIndicatorProps> = ({
  size = 10,
  className,
}) => {
  return (
    <svg
      width={size}
      height={(size / 10) * 2}
      viewBox="0 0 10 2"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M8.75 0.75H0.75"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

interface AppCheckBoxProps {
  name?: string;
  value?: boolean | "indeterminate";
  onChange?: (value: boolean | "indeterminate") => void;
  onDeselect?: () => void;
  disabled?: boolean;
  label?: React.ReactNode;
  isDeselect?: boolean;
}

const AppCheckBox = (props: AppCheckBoxProps) => {
  const {
    value = false,
    onChange,
    onDeselect,
    label,
    disabled,
    isDeselect = false,
  } = props;

  const handleChange = (checked: boolean | "indeterminate") => {
    if (isDeselect && onDeselect) {
      onDeselect();
    } else {
      onChange?.(checked);
    }
  };

  return (
    <div className="flex items-center gap-1">
      <div className="flex h-6 w-6 items-center justify-center">
        <Checkbox
          className="group bg-base-white not-disabled:data-[state=checked]:bg-primary-500 not-disabled:data-[state=checked]:border-primary-500 data-[state=indeterminate]:border-primary-500 data-[deselect=true]:border-primary-500 disabled:bg- h-4.5 w-4.5 rounded-[1.5px] border-[1.5px] border-neutral-100 disabled:cursor-not-allowed disabled:border-neutral-100 disabled:bg-neutral-50 [&[data-state=checked]:disabled]:bg-neutral-300"
          checked={value}
          data-deselect={isDeselect}
          onCheckedChange={handleChange}
          disabled={disabled}
        >
          <div className="grid h-0 place-content-center overflow-hidden text-current transition-none group-data-[state=checked]:h-fit">
            <CheckedIndicator className="text-base-white" />
          </div>

          <div className="grid h-0 place-content-center overflow-hidden text-current transition-none group-data-[state=indeterminate]:h-fit">
            <IndeterminateIndicator className="text-primary-500" />
          </div>

          <div className="grid h-0 place-content-center overflow-hidden text-current transition-none group-data-[deselect=true]:h-fit">
            <DeselectIndicator className="text-primary-500" />
          </div>
        </Checkbox>
      </div>

      {label && (
        <Label
          className={cn("body-s font-medium", {
            "text-neutral-200": disabled,
            "text-neutral-950": !disabled,
          })}
        >
          {label}
        </Label>
      )}
    </div>
  );
};

export default AppCheckBox;
