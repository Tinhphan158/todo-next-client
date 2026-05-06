import React from "react";

interface ArrowLinkIconProps {
  size?: number;
  className?: string;
}

export const ArrowLinkIcon: React.FC<ArrowLinkIconProps> = ({
  size = 16,
  className,
}) => {
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
        d="M11.6528 4.34628C11.848 4.54155 11.848 4.85813 11.6528 5.05339L5.05277 11.6534C4.85751 11.8487 4.54093 11.8487 4.34567 11.6534C4.1504 11.4581 4.1504 11.1415 4.34567 10.9463L10.9457 4.34628C11.1409 4.15102 11.4575 4.15102 11.6528 4.34628Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6.1659 4.66298C6.16784 4.38684 6.39328 4.16457 6.66941 4.16652L11.3027 4.19918C11.5761 4.20111 11.7972 4.42222 11.7992 4.69557L11.8325 9.32957C11.8345 9.60571 11.6123 9.83117 11.3361 9.83316C11.06 9.83514 10.8346 9.6129 10.8326 9.33677L10.8028 5.19568L6.66236 5.16649C6.38622 5.16454 6.16395 4.93911 6.1659 4.66298Z"
        fill="currentColor"
      />
    </svg>
  );
};
