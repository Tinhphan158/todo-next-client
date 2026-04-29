import React from "react";

interface UploadIconProps {
  size?: number;
  className?: string;
}

export const UploadIcon: React.FC<UploadIconProps> = ({
  size = 20,
  className,
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16.0862 8.08925C15.7933 8.38214 15.3184 8.38214 15.0255 8.08925L11.9998 5.06358L8.97418 8.08925C8.68128 8.38214 8.20641 8.38214 7.91352 8.08925C7.62063 7.79635 7.62063 7.32148 7.91352 7.02859L11.4695 3.47259C11.7624 3.17969 12.2373 3.17969 12.5302 3.47259L16.0862 7.02859C16.3791 7.32148 16.3791 7.79635 16.0862 8.08925Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.9997 15.42C11.5855 15.42 11.2497 15.0842 11.2497 14.67L11.2497 4C11.2497 3.58579 11.5855 3.25 11.9997 3.25C12.4139 3.25 12.7497 3.58579 12.7497 4L12.7497 14.67C12.7497 15.0842 12.4139 15.42 11.9997 15.42Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4 15.694C4.41421 15.694 4.75 16.0298 4.75 16.444C4.75 17.9937 6.00629 19.25 7.556 19.25H16.444C17.9937 19.25 19.25 17.9937 19.25 16.444C19.25 16.0298 19.5858 15.694 20 15.694C20.4142 15.694 20.75 16.0298 20.75 16.444C20.75 18.8221 18.8221 20.75 16.444 20.75H7.556C5.17787 20.75 3.25 18.8221 3.25 16.444C3.25 16.0298 3.58579 15.694 4 15.694Z"
        fill="currentColor"
      />
    </svg>
  );
};
