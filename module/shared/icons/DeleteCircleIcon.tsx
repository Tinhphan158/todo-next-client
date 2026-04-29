import React from "react";

interface DeleteCircleIconProps {
  size?: number;
  className?: string;
}

export const DeleteCircleIcon: React.FC<DeleteCircleIconProps> = ({
  size = 16,
  className,
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8 2.5C4.96214 2.5 2.5 4.96214 2.5 8C2.5 11.0379 4.96214 13.5 8 13.5C11.0379 13.5 13.5 11.0379 13.5 8C13.5 4.96214 11.0379 2.5 8 2.5ZM1.5 8C1.5 4.40986 4.40986 1.5 8 1.5C11.5901 1.5 14.5 4.40986 14.5 8C14.5 11.5901 11.5901 14.5 8 14.5C4.40986 14.5 1.5 11.5901 1.5 8Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5.80983 5.80983C6.00081 5.61884 6.31045 5.61884 6.50144 5.80983L10.19 9.49841C10.381 9.68939 10.381 9.99904 10.19 10.19C9.99904 10.381 9.68939 10.381 9.49841 10.19L5.80983 6.50144C5.61884 6.31045 5.61884 6.00081 5.80983 5.80983Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5.80983 10.19C5.61884 9.99904 5.61884 9.68939 5.80983 9.49841L9.49841 5.80983C9.68939 5.61884 9.99904 5.61884 10.19 5.80983C10.381 6.00081 10.381 6.31045 10.19 6.50144L6.50144 10.19C6.31045 10.381 6.00081 10.381 5.80983 10.19Z"
        fill="currentColor"
      />
    </svg>
  );
};
