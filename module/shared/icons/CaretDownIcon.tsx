import React from "react";

interface CaretDownIconProps {
  size?: number;
  className?: string;
}

export const CaretDownIcon: React.FC<CaretDownIconProps> = ({
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
        d="M12.3979 15.75C12.2054 16.0833 11.7243 16.0833 11.5318 15.75L8.06773 9.75C7.87528 9.41667 8.11585 9 8.50075 9H15.4289C15.8138 9 16.0544 9.41667 15.862 9.75L12.3979 15.75Z"
        fill="currentColor"
      />
    </svg>
  );
};
