import { cn } from "@/lib/utils";

interface AppLoaderProps {
  size?: number;
  className?: string;
}

const AppLoader = ({ size = 32, className }: AppLoaderProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("animate-spin", className)}
    >
      <circle
        cx="16.001"
        cy="16.0006"
        r="14.5"
        transform="rotate(120 16.001 16.0006)"
        stroke="#E7E7E7"
        strokeWidth="3"
      />
      <path
        d="M8.75101 28.5579C7.4333 27.7972 6.24354 26.8337 5.22541 25.703"
        stroke="#262626"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M1.81828 12.9829C2.13463 11.4946 2.68327 10.0654 3.44405 8.74766"
        stroke="#262626"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M5.22321 25.7047C4.20508 24.5739 3.37127 23.29 2.7524 21.9"
        stroke="#262626"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M2.75554 21.8986C2.13666 20.5086 1.74043 19.0298 1.58138 17.5166"
        stroke="#262626"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M1.58154 17.5171C1.42249 16.0039 1.50262 14.475 1.81897 12.9867"
        stroke="#262626"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
};

export default AppLoader;
