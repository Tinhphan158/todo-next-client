import React from "react";

interface DoubleLeftIconProps {
  size?: number;
  className?: string;
}

export const DoubleLeftIcon: React.FC<DoubleLeftIconProps> = ({
  size = 24,
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
        d="M9.40027 13.567C9.1562 13.811 8.76047 13.811 8.51639 13.567L5.18306 10.2336C4.93898 9.98954 4.93898 9.59381 5.18306 9.34973L8.51639 6.0164C8.76047 5.77232 9.1562 5.77232 9.40028 6.0164C9.64435 6.26048 9.64435 6.65621 9.40028 6.90029L6.50888 9.79168L9.40027 12.6831C9.64435 12.9271 9.64435 13.3229 9.40027 13.567Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M14.375 13.567C14.1309 13.811 13.7352 13.811 13.4911 13.567L10.1578 10.2336C9.91371 9.98954 9.91371 9.59381 10.1578 9.34973L13.4911 6.0164C13.7352 5.77232 14.1309 5.77232 14.375 6.0164C14.6191 6.26048 14.6191 6.65621 14.375 6.90029L11.4836 9.79168L14.375 12.6831C14.6191 12.9271 14.6191 13.3229 14.375 13.567Z"
        fill="currentColor"
      />
    </svg>
  );
};
