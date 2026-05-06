import React from "react";

interface MoneyBagIconProps {
  size?: number;
  className?: string;
}

export const MoneyBagIcon: React.FC<MoneyBagIconProps> = ({
  size = 32,
  className,
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <g clipPath="url(#clip0_12319_23526)">
        <path
          d="M11.3333 17.3335H6C4.89543 17.3335 4 18.2289 4 19.3335V20.6668C4 21.7714 4.89543 22.6668 6 22.6668H11.3333C12.4379 22.6668 13.3333 21.7714 13.3333 20.6668V19.3335C13.3333 18.2289 12.4379 17.3335 11.3333 17.3335Z"
          stroke="currentColor"
          stroke-width="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M11.3333 22.6665H6C4.89543 22.6665 4 23.5619 4 24.6665V25.9998C4 27.1044 4.89543 27.9998 6 27.9998H11.3333C12.4379 27.9998 13.3333 27.1044 13.3333 25.9998V24.6665C13.3333 23.5619 12.4379 22.6665 11.3333 22.6665Z"
          stroke="currentColor"
          stroke-width="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M14 4H20.6667C21.1971 4 21.7058 4.21071 22.0809 4.58579C22.456 4.96086 22.6667 5.46957 22.6667 6C22.6667 7.23768 22.175 8.42466 21.2998 9.29983C20.4247 10.175 19.2377 10.6667 18 10.6667H16.6667C15.429 10.6667 14.242 10.175 13.3668 9.29983C12.4917 8.42466 12 7.23768 12 6C12 5.46957 12.2107 4.96086 12.5858 4.58579C12.9609 4.21071 13.4696 4 14 4Z"
          stroke="currentColor"
          stroke-width="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M17.3333 27.9999H22.6666C24.0811 27.9999 25.4376 27.438 26.4378 26.4378C27.438 25.4376 27.9999 24.081 27.9999 22.6665V21.3332C28.0022 19.2813 27.412 17.2724 26.3001 15.5479C25.1883 13.8233 23.6021 12.4565 21.7322 11.6116C19.8624 10.7668 17.7883 10.4798 15.7593 10.7852C13.7302 11.0906 11.8325 11.9753 10.2942 13.3332"
          stroke="currentColor"
          stroke-width="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_12319_23526">
          <rect width="32" height="32" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};
