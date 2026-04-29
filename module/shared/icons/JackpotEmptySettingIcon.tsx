interface JackpotEmptySettingIconProps {
  width?: number;
  height?: number;
  className?: string;
}

export const JackpotEmptySettingIcon = ({
  width = 32,
  height = 40,
  className,
}: JackpotEmptySettingIconProps) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 32 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <rect x="4" width="24" height="40" rx="4" fill="#D8D4D5" />
    </svg>
  );
};
