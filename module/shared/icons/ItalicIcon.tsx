import React from "react";

interface ItalicIconProps {
  size?: number;
  className?: string;
}

export const ItalicIcon: React.FC<ItalicIconProps> = ({
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
        d="M13.727 18H5H8.98L14.11 6H18.09H9.363"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default ItalicIcon;
