import React from "react";

interface ClearInputIconProps {
  size?: number;
  className?: string;
}

export const ClearInputIcon: React.FC<ClearInputIconProps> = ({
  size = 24,
  className,
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <circle cx="12" cy="12" r="10" fill="#B5AEAF" />
      <path
        d="M15 9L9 15M9 9L15 15"
        stroke="#FFFFFF"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
