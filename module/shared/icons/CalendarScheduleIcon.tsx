import React from "react";

interface CalendarScheduleIconProps {
  size?: number;
  className?: string;
}

export const CalendarScheduleIcon: React.FC<CalendarScheduleIconProps> = ({
  size = 20,
  className,
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6.25 1.875C6.59518 1.875 6.875 2.15482 6.875 2.5V5C6.875 5.34518 6.59518 5.625 6.25 5.625C5.90482 5.625 5.625 5.34518 5.625 5V2.5C5.625 2.15482 5.90482 1.875 6.25 1.875Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M13.75 1.875C14.0952 1.875 14.375 2.15482 14.375 2.5V5C14.375 5.34518 14.0952 5.625 13.75 5.625C13.4048 5.625 13.125 5.34518 13.125 5V2.5C13.125 2.15482 13.4048 1.875 13.75 1.875Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5 4.375C3.96447 4.375 3.125 5.21447 3.125 6.25V15C3.125 16.0355 3.96447 16.875 5 16.875H15C16.0355 16.875 16.875 16.0355 16.875 15V6.25C16.875 5.21447 16.0355 4.375 15 4.375H5ZM1.875 6.25C1.875 4.52411 3.27411 3.125 5 3.125H15C16.7259 3.125 18.125 4.52411 18.125 6.25V15C18.125 16.7259 16.7259 18.125 15 18.125H5C3.27411 18.125 1.875 16.7259 1.875 15V6.25Z"
        fill="currentColor"
      />
      <rect x="2.5" y="7.5" width="15" height="1.25" fill="currentColor" />
    </svg>
  );
};
