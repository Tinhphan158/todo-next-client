import React from "react";

interface PenEditIconProps {
  size?: number;
  className?: string;
}

export const PenEditIcon: React.FC<PenEditIconProps> = ({
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
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M14.3045 2.81784C14.988 2.13320 16.096 2.13435 16.7793 2.81769L18.1823 4.22069C18.8663 4.90458 18.8663 6.01245 18.1823 6.69635L7.34833 17.5304C7.20768 17.6711 7.01691 17.75 6.818 17.75H4C3.58579 17.75 3.25 17.4142 3.25 17V14.182C3.25 13.9831 3.32903 13.7923 3.46969 13.6516L14.3045 2.81784ZM15.7187 3.87834C15.5535 3.71320 15.2959 3.71417 15.1327 3.87767L4.75 14.2593V16.25H6.74068L17.1217 5.86902C17.2864 5.70425 17.2864 5.44612 17.1217 5.28135L15.7187 3.87834Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2.25 21C2.25 20.5858 2.58579 20.25 3 20.25H21C21.4142 20.25 21.75 20.5858 21.75 21C21.75 21.4142 21.4142 21.75 21 21.75H3C2.58579 21.75 2.25 21.4142 2.25 21Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12.5197 4.59969C12.8126 4.30680 13.2874 4.30680 13.5803 4.59969L16.4003 7.41969C16.6932 7.71259 16.6932 8.18746 16.4003 8.48035C16.1074 8.77324 15.6326 8.77324 15.3397 8.48035L12.5197 5.66035C12.2268 5.36746 12.2268 4.89259 12.5197 4.59969Z"
        fill="currentColor"
      />
    </svg>
  );
};
