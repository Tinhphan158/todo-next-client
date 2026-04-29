import React from "react";

interface DoubleRightIconProps {
  size?: number;
  className?: string;
}

export const DoubleRightIcon: React.FC<DoubleRightIconProps> = ({
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
        d="M10.1578 6.0164C10.4019 5.77232 10.7976 5.77232 11.0417 6.0164L14.375 9.34974C14.6191 9.59381 14.6191 9.98954 14.375 10.2336L11.0417 13.567C10.7976 13.811 10.4019 13.811 10.1578 13.567C9.9137 13.3229 9.9137 12.9271 10.1578 12.6831L13.0492 9.79168L10.1578 6.90029C9.91371 6.65621 9.91371 6.26048 10.1578 6.0164Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5.18306 6.0164C5.42714 5.77232 5.82287 5.77232 6.06694 6.0164L9.40028 9.34974C9.64435 9.59381 9.64435 9.98954 9.40028 10.2336L6.06694 13.567C5.82286 13.811 5.42714 13.811 5.18306 13.567C4.93898 13.3229 4.93898 12.9271 5.18306 12.6831L8.07445 9.79168L5.18306 6.90029C4.93898 6.65621 4.93898 6.26048 5.18306 6.0164Z"
        fill="currentColor"
      />
    </svg>
  );
};
