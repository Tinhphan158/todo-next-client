import React from "react";

interface PlayAltIconProps {
  size?: number;
  className?: string;
}

export const PlayAltIcon: React.FC<PlayAltIconProps> = ({
  size = 24,
  className,
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9 18C13.971 18 18 13.971 18 9C18 4.029 13.971 0 9 0C4.029 0 0 4.029 0 9C0 13.971 4.029 18 9 18ZM11.8231 8.35395L7.94108 6.05795C7.44108 5.76195 6.80908 6.12295 6.80908 6.70395V11.2949C6.80908 11.8759 7.44108 12.2369 7.94108 11.9409L11.8231 9.64495C12.3141 9.35495 12.3141 8.64395 11.8231 8.35395Z"
        fill="currentColor"
      />
    </svg>
  );
};
