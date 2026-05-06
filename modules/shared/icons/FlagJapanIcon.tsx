import React from "react";

interface FlagJapanIconProps {
  size?: number;
  className?: string;
}

export const FlagJapanIcon: React.FC<FlagJapanIconProps> = ({
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
      <g clipPath="url(#clip0_10306_472)">
        <path
          d="M23.5866 19.8621H0.4143C0.185785 19.8621 0.000488281 19.6768 0.000488281 19.4483V4.55175C0.000488281 4.32324 0.185785 4.13794 0.4143 4.13794H23.5867C23.8152 4.13794 24.0005 4.32324 24.0005 4.55175V19.4483C24.0004 19.6768 23.8151 19.8621 23.5866 19.8621Z"
          fill="#F5F5F5"
        />
        <path
          d="M12.0003 16.5516C14.514 16.5516 16.5518 14.5138 16.5518 12C16.5518 9.48629 14.514 7.44849 12.0003 7.44849C9.48653 7.44849 7.44873 9.48629 7.44873 12C7.44873 14.5138 9.48653 16.5516 12.0003 16.5516Z"
          fill="#FF4B55"
        />
      </g>
      <defs>
        <clipPath id="clip0_10306_472">
          <rect width="24" height="24" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};
