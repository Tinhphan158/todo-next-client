import React from "react";

interface InfoIconProps {
  size?: number;
  className?: string;
}

export const InfoIcon: React.FC<InfoIconProps> = ({ size = 16, className }) => {
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
        d="M8 2.5C4.96243 2.5 2.5 4.96243 2.5 8C2.5 11.0376 4.96243 13.5 8 13.5C11.0376 13.5 13.5 11.0376 13.5 8C13.5 4.96243 11.0376 2.5 8 2.5ZM1.5 8C1.5 4.41015 4.41015 1.5 8 1.5C11.5899 1.5 14.5 4.41015 14.5 8C14.5 11.5899 11.5899 14.5 8 14.5C4.41015 14.5 1.5 11.5899 1.5 8Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6.83333 10.3333C6.83333 10.0572 7.05719 9.83333 7.33333 9.83333H8.87333C9.14948 9.83333 9.37333 10.0572 9.37333 10.3333C9.37333 10.6095 9.14948 10.8333 8.87333 10.8333H7.33333C7.05719 10.8333 6.83333 10.6095 6.83333 10.3333Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6.83933 7.5C6.83933 7.22386 7.06319 7 7.33933 7H8.106C8.38214 7 8.606 7.22386 8.606 7.5V10.3333C8.606 10.6095 8.38214 10.8333 8.106 10.8333C7.82986 10.8333 7.606 10.6095 7.606 10.3333V8H7.33933C7.06319 8 6.83933 7.77614 6.83933 7.5Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8.32698 5.0712C8.23915 4.92745 8.08078 4.83151 7.9 4.83151C7.53181 4.83151 7.23333 5.12998 7.23333 5.49817C7.23333 5.86636 7.53181 6.16484 7.9 6.16484C8.26819 6.16484 8.56667 5.86636 8.56667 5.49817C8.56667 5.31739 8.47072 5.15902 8.32698 5.0712Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.4 5.33151C7.4 5.05536 7.62386 4.83151 7.9 4.83151C8.26819 4.83151 8.56667 5.12998 8.56667 5.49817C8.56667 5.77432 8.34281 5.99817 8.06667 5.99817C7.88589 5.99817 7.72751 5.90223 7.63969 5.75848C7.49594 5.67066 7.4 5.51229 7.4 5.33151Z"
        fill="currentColor"
      />
    </svg>
  );
};
