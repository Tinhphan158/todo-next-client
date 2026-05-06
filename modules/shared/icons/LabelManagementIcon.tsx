import React from "react";

const VIEWBOX_W = 20;
const VIEWBOX_H = 16;

interface LabelManagementIconProps {
  size?: number;
  className?: string;
}

export const LabelManagementIcon: React.FC<LabelManagementIconProps> = ({
  size = 16,
  className,
}) => {
  const height = size;
  const width = (size * VIEWBOX_W) / VIEWBOX_H;

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${VIEWBOX_W} ${VIEWBOX_H}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M2 16C1.45 16 0.979167 15.8042 0.5875 15.4125C0.195833 15.0208 0 14.55 0 14V2C0 1.45 0.195833 0.979167 0.5875 0.5875C0.979167 0.195833 1.45 0 2 0H13C13.3167 0 13.6167 0.0708333 13.9 0.2125C14.1833 0.354167 14.4167 0.55 14.6 0.8L20 8L14.6 15.2C14.4167 15.45 14.1833 15.6458 13.9 15.7875C13.6167 15.9292 13.3167 16 13 16H2ZM2 14H13L17.5 8L13 2H2V14Z"
        fill="currentColor"
      />
    </svg>
  );
};
