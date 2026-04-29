import React from "react";

interface BoldIconProps {
  size?: number;
  className?: string;
}

export const BoldIcon: React.FC<BoldIconProps> = ({ size = 24, className }) => {
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
        d="M7 12H14C14.4596 12 14.9148 12.0905 15.3394 12.2664C15.764 12.4423 16.1499 12.7001 16.4749 13.0251C16.7999 13.3501 17.0577 13.736 17.2336 14.1606C17.4095 14.5852 17.5 15.0404 17.5 15.5C17.5 15.9596 17.4095 16.4148 17.2336 16.8394C17.0577 17.264 16.7999 17.6499 16.4749 17.9749C16.1499 18.2999 15.764 18.5577 15.3394 18.7336C14.9148 18.9095 14.4596 19 14 19H7V5H12.833C13.7613 5 14.6515 5.36875 15.3079 6.02513C15.9643 6.6815 16.333 7.57174 16.333 8.5C16.333 9.42826 15.9643 10.3185 15.3079 10.9749C14.6515 11.6313 13.7613 12 12.833 12"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default BoldIcon;
