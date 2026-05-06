import React from "react";

interface ReferralIconProps {
  size?: number;
  className?: string;
}

export const ReferralIcon: React.FC<ReferralIconProps> = ({
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
      <g clipPath="url(#clip0_12319_23419)">
        <path
          d="M27.7233 12.6977C28.7767 13.7511 28.7767 15.459 27.7233 16.5123C26.6699 17.5657 24.9621 17.5657 23.9087 16.5123C22.8553 15.459 22.8553 13.7511 23.9087 12.6977C24.9621 11.6444 26.6699 11.6444 27.7233 12.6977Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M18.9366 7.88298C20.5586 9.50496 20.5586 12.1347 18.9366 13.7567C17.3146 15.3787 14.6849 15.3787 13.0629 13.7567C11.4409 12.1347 11.4409 9.50497 13.0629 7.88298C14.6849 6.26101 17.3146 6.26101 18.9366 7.88298Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M8.0912 12.6977C9.14458 13.7511 9.14458 15.459 8.0912 16.5123C7.03783 17.5657 5.32998 17.5657 4.2766 16.5123C3.22323 15.459 3.22323 13.7511 4.2766 12.6977C5.32998 11.6444 7.03783 11.6444 8.0912 12.6977Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M30.6665 25.3332V23.8719C30.6665 22.0306 29.1745 20.5386 27.3331 20.5386H26.2651"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M1.33325 25.3332V23.8719C1.33325 22.0306 2.82525 20.5386 4.66659 20.5386H5.73459"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M23.1185 25.3331V23.1984C23.1185 20.6211 21.0292 18.5317 18.4519 18.5317H13.5465C10.9692 18.5317 8.87988 20.6211 8.87988 23.1984V25.3331"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_12319_23419">
          <rect width="32" height="32" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};
