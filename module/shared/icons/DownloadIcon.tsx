import React from "react";

interface DownloadIconProps {
  size?: number;
  className?: string;
}

export const DownloadIcon: React.FC<DownloadIconProps> = ({
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
        d="M7.91375 10.5807C8.20665 10.2878 8.68152 10.2878 8.97441 10.5807L12 13.6061L15.0254 10.5807C15.3183 10.2878 15.7932 10.2878 16.0861 10.5807C16.379 10.8736 16.379 11.3485 16.0861 11.6414L12.5303 15.1971C12.2374 15.49 11.7626 15.49 11.4697 15.1971L7.91375 11.6414C7.62086 11.3485 7.62086 10.8736 7.91375 10.5807Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 3.25C12.4145 3.25 12.75 3.58579 12.75 4V13.67C12.75 14.0842 12.4145 14.42 12 14.42C11.5855 14.42 11.25 14.0842 11.25 13.67V4C11.25 3.58579 11.5855 3.25 12 3.25Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4 15.694C4.41421 15.694 4.75 16.0298 4.75 16.444C4.75 17.9938 6.00636 19.25 7.55604 19.25H16.444C17.9937 19.25 19.25 17.9938 19.25 16.444C19.25 16.0298 19.5858 15.694 20 15.694C20.4142 15.694 20.75 16.0298 20.75 16.444C20.75 18.8222 18.8222 20.75 16.444 20.75H7.55604C5.17785 20.75 3.25 18.8222 3.25 16.444C3.25 16.0298 3.58579 15.694 4 15.694Z"
        fill="currentColor"
      />
    </svg>
  );
};
