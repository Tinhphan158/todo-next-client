import React from "react";

interface ExitFullscreenIconProps {
  size?: number;
  className?: string;
}

export const ExitFullscreenIcon: React.FC<ExitFullscreenIconProps> = ({
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
      <path
        d="M9 4V7C9 8.10457 8.10457 9 7 9H4"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15 20L15 17C15 15.8954 15.8954 15 17 15L20 15"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M20 9L17 9C15.8954 9 15 8.10457 15 7L15 4"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4 15L7 15C8.10457 15 9 15.8954 9 17L9 20"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
