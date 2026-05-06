import React from "react";

interface IconLock1Props {
  size?: number;
  className?: string;
}

export const Lock1Icon: React.FC<IconLock1Props> = ({
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
        d="M7 9.75C6.30921 9.75 5.75 10.3092 5.75 11V19C5.75 19.6908 6.30921 20.25 7 20.25H17C17.6908 20.25 18.25 19.6908 18.25 19V11C18.25 10.3092 17.6908 9.75 17 9.75H7ZM4.25 11C4.25 9.48079 5.48079 8.25 7 8.25H17C18.5192 8.25 19.75 9.48079 19.75 11V19C19.75 20.5192 18.5192 21.75 17 21.75H7C5.48079 21.75 4.25 20.5192 4.25 19V11Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 13.75C12.4142 13.75 12.75 14.0858 12.75 14.5V17.09C12.75 17.5042 12.4142 17.84 12 17.84C11.5858 17.84 11.25 17.5042 11.25 17.09V14.5C11.25 14.0858 11.5858 13.75 12 13.75Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10.9393 12.6894C11.5251 12.1036 12.4748 12.1036 13.0606 12.6894C13.6464 13.2752 13.6464 14.2249 13.0606 14.8107C12.4748 15.3965 11.5251 15.3965 10.9393 14.8107C10.3535 14.2249 10.3535 13.2752 10.9393 12.6894Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 3.75C10.2052 3.75 8.75 5.20521 8.75 7V9C8.75 9.41421 8.41421 9.75 8 9.75C7.58579 9.75 7.25 9.41421 7.25 9V7C7.25 4.37679 9.37679 2.25 12 2.25C14.6232 2.25 16.75 4.37679 16.75 7V9C16.75 9.41421 16.4142 9.75 16 9.75C15.5858 9.75 15.25 9.41421 15.25 9V7C15.25 5.20521 13.7948 3.75 12 3.75Z"
        fill="currentColor"
      />
    </svg>
  );
};
