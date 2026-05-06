import React from "react";

interface ArrowUpIconProps {
  size?: number;
  className?: string;
}

export const ArrowUpIcon: React.FC<ArrowUpIconProps> = ({
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
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16.2803 14.7803C15.9874 15.0732 15.5126 15.0732 15.2197 14.7803L11.75 11.3107L8.28033 14.7803C7.98744 15.0732 7.51256 15.0732 7.21967 14.7803C6.92678 14.4874 6.92678 14.0126 7.21967 13.7197L11.2197 9.71967C11.5126 9.42678 11.9874 9.42678 12.2803 9.71967L16.2803 13.7197C16.5732 14.0126 16.5732 14.4874 16.2803 14.7803Z"
        fill="currentColor"
      />
    </svg>
  );
};
