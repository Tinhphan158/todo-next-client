import { cn } from "@/lib/utils";
import React from "react";

interface LoadingSpinnerIconProps {
  size?: number;
  className?: string;
}

export const LoadingSpinnerIcon: React.FC<LoadingSpinnerIconProps> = ({
  size = 32,
  className,
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("animate-spin", className)}
    >
      <g clipPath="url(#clip0_12523_12926)">
        <circle cx="16" cy="16" r="14.5" stroke="#E7E7E7" strokeWidth="3" />
        <path
          d="M30.5 16C30.5 17.5216 30.2605 19.0337 29.7903 20.4807"
          stroke="#262626"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <path
          d="M30.5 16C30.5 17.5216 30.2605 19.0337 29.7903 20.4807"
          stroke="#262626"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <path
          d="M30.5 16C30.5 17.5216 30.2605 19.0337 29.7903 20.4807"
          stroke="#262626"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <path
          d="M30.5 16C30.5 17.5216 30.2605 19.0337 29.7903 20.4807"
          stroke="#262626"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <path
          d="M30.5 16C30.5 17.5216 30.2605 19.0337 29.7903 20.4807"
          stroke="#262626"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_12523_12926">
          <rect width={size} height={size} rx="12" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};
