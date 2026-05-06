import React from "react";

interface FlagVietnamIconProps {
  size?: number;
  className?: string;
}

export const FlagVietnamIcon: React.FC<FlagVietnamIconProps> = ({
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
      <g clipPath="url(#clip0_10306_448)">
        <path
          d="M23.5864 19.8621H0.414056C0.185541 19.8621 0.000244141 19.6768 0.000244141 19.4483V4.55175C0.000244141 4.32324 0.185541 4.13794 0.414056 4.13794H23.5864C23.8149 4.13794 24.0002 4.32324 24.0002 4.55175V19.4483C24.0002 19.6768 23.8149 19.8621 23.5864 19.8621Z"
          fill="#FF4B55"
        />
        <path
          d="M12.1933 7.31108L13.3 10.6294L16.7979 10.6565C16.9934 10.658 17.0745 10.9076 16.9172 11.0238L14.1033 13.1017L15.1585 16.4367C15.2175 16.6232 15.0051 16.7775 14.846 16.6637L12.0003 14.6297L9.15448 16.6637C8.99538 16.7774 8.78304 16.6232 8.84201 16.4367L9.89712 13.1017L7.08326 11.0238C6.9259 10.9076 7.00704 10.658 7.20261 10.6565L10.7005 10.6294L11.8071 7.31108C11.8691 7.12555 12.1315 7.12555 12.1933 7.31108Z"
          fill="#FFE15A"
        />
      </g>
      <defs>
        <clipPath id="clip0_10306_448">
          <rect width="24" height="24" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};
