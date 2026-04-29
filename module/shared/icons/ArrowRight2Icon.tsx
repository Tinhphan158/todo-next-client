export interface ArrowRight2IconProps {
  size?: number;
  className?: string;
}

const ArrowRight2Icon = ({
  size = 24,
  className = "",
}: ArrowRight2IconProps) => {
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
        d="M3.1665 8C3.1665 7.72386 3.39036 7.5 3.6665 7.5H11.6665C11.9426 7.5 12.1665 7.72386 12.1665 8C12.1665 8.27614 11.9426 8.5 11.6665 8.5H3.6665C3.39036 8.5 3.1665 8.27614 3.1665 8Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8.66782 4.62629C8.87421 4.44283 9.19025 4.46142 9.37371 4.66782L12.3356 8L9.37371 11.3322C9.19025 11.5386 8.87421 11.5572 8.66782 11.3737C8.46143 11.1902 8.44284 10.8742 8.6263 10.6678L10.9977 8L8.6263 5.33218C8.44284 5.12579 8.46143 4.80975 8.66782 4.62629Z"
        fill="currentColor"
      />
    </svg>
  );
};

export default ArrowRight2Icon;
