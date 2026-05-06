import React from "react";

interface EssentialCheckIconProps {
  size?: number;
  className?: string;
}

export const EssentialCheckIcon: React.FC<EssentialCheckIconProps> = ({
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
        d="M6.90711 13.1702C6.78117 13.1757 6.65703 13.1387 6.55461 13.0652L3.18711 10.2827C2.97015 10.0906 2.93749 9.76393 3.11211 9.53268C3.30386 9.31672 3.628 9.28107 3.86211 9.45018L6.86211 11.8952L14.7371 4.61268C14.97 4.43783 15.2978 4.46965 15.4928 4.68601C15.6877 4.90238 15.6852 5.23174 15.4871 5.44518L7.28961 13.0202C7.18519 13.116 7.04883 13.1695 6.90711 13.1702Z"
        fill="currentColor"
      />
    </svg>
  );
};
