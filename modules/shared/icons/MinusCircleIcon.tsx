import React from "react";

interface MinusCircleIconProps {
  size?: number;
  className?: string;
}

export const MinusCircleIcon: React.FC<MinusCircleIconProps> = ({
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
        d="M10.0001 3.18214C6.2345 3.18214 3.1819 6.23475 3.1819 10.0003C3.1819 13.7659 6.2345 16.8185 10.0001 16.8185C13.7657 16.8185 16.8183 13.7659 16.8183 10.0003C16.8183 6.23475 13.7657 3.18214 10.0001 3.18214ZM1.66675 10.0003C1.66675 5.39795 5.39771 1.66699 10.0001 1.66699C14.6025 1.66699 18.3334 5.39795 18.3334 10.0003C18.3334 14.6027 14.6025 18.3337 10.0001 18.3337C5.39771 18.3337 1.66675 14.6027 1.66675 10.0003Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6.21216 10.0007C6.21216 9.58234 6.55134 9.24316 6.96973 9.24316H13.0303C13.4487 9.24316 13.7879 9.58234 13.7879 10.0007C13.7879 10.4191 13.4487 10.7583 13.0303 10.7583H6.96973C6.55134 10.7583 6.21216 10.4191 6.21216 10.0007Z"
        fill="currentColor"
      />
    </svg>
  );
};
