interface PlusAddSquareIconProps {
  size?: number;
  className?: string;
}

const PlusAddSquareIcon = ({
  size = 20,
  className,
}: PlusAddSquareIconProps) => {
  return (
    <div>
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
          d="M5.00004 3.95834C4.42439 3.95834 3.95837 4.42435 3.95837 5V15C3.95837 15.5757 4.42439 16.0417 5.00004 16.0417H15C15.5757 16.0417 16.0417 15.5757 16.0417 15V5C16.0417 4.42435 15.5757 3.95834 15 3.95834H5.00004ZM2.70837 5C2.70837 3.73399 3.73403 2.70834 5.00004 2.70834H15C16.2661 2.70834 17.2917 3.73399 17.2917 5V15C17.2917 16.266 16.2661 17.2917 15 17.2917H5.00004C3.73403 17.2917 2.70837 16.266 2.70837 15V5Z"
          fill="currentColor"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M10 6.04167C10.3452 6.04167 10.625 6.32149 10.625 6.66667V13.3333C10.625 13.6785 10.3452 13.9583 10 13.9583C9.65486 13.9583 9.37504 13.6785 9.37504 13.3333V6.66667C9.37504 6.32149 9.65486 6.04167 10 6.04167Z"
          fill="currentColor"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M6.04171 10C6.04171 9.65482 6.32153 9.375 6.66671 9.375H13.3334C13.6786 9.375 13.9584 9.65482 13.9584 10C13.9584 10.3452 13.6786 10.625 13.3334 10.625H6.66671C6.32153 10.625 6.04171 10.3452 6.04171 10Z"
          fill="currentColor"
        />
      </svg>
    </div>
  );
};

export default PlusAddSquareIcon;
