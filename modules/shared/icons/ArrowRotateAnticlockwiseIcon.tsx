export interface ArrowRotateAnticlockwiseIconProps {
  size?: number;
  className?: string;
}

const ArrowRotateAnticlockwiseIcon = ({
  size = 20,
  className,
}: ArrowRotateAnticlockwiseIconProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10.0001 4C8.32065 4 6.80494 4.68795 5.71429 5.80091C5.32774 6.19537 4.69461 6.20178 4.30015 5.81523C3.90569 5.42868 3.89928 4.79555 4.28583 4.40109C5.73718 2.92005 7.76148 2 10.0001 2C14.4183 2 18.0001 5.58172 18.0001 10C18.0001 14.4183 14.4183 18 10.0001 18C6.80773 18 4.05315 16.1297 2.77073 13.4289C2.53383 12.93 2.74623 12.3336 3.24512 12.0967C3.74402 11.8598 4.3405 12.0722 4.5774 12.5711C5.54097 14.6003 7.60839 16 10.0001 16C13.3138 16 16.0001 13.3137 16.0001 10C16.0001 6.68629 13.3138 4 10.0001 4Z"
        fill="currentColor"
      />
      <path
        d="M4.36706 3.044L3.77106 6.798L7.51606 6.145L4.36706 3.044Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4.05457 2.09408C4.4104 1.97702 4.80182 2.06865 5.06872 2.33148L8.21772 5.43248C8.48464 5.69534 8.58226 6.08534 8.47064 6.44295C8.35902 6.80056 8.05689 7.06579 7.68784 7.13014L3.94284 7.78314C3.62472 7.8386 3.2994 7.73705 3.06934 7.51045C2.83928 7.28386 2.7328 6.96012 2.78343 6.6412L3.37943 2.8872C3.43817 2.51724 3.69874 2.21114 4.05457 2.09408ZM5.04999 5.12L4.97816 5.57244L5.42951 5.49373L5.04999 5.12Z"
        fill="currentColor"
      />
    </svg>
  );
};

export default ArrowRotateAnticlockwiseIcon;
