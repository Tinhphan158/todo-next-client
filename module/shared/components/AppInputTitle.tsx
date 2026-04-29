interface AppInputTitleProps {
  title?: React.ReactNode;
  count?: number;
  current?: number;
}

const AppInputTitle = ({
  title,
  count = 0,
  current = 0,
}: AppInputTitleProps) => {
  return (
    <div className="flex items-center">
      <span className="body-s font-medium text-neutral-700">{title}</span>
      {!!count && (
        <div className="flex flex-1 items-center justify-end">
          <span className="caption-s font-medium text-neutral-500">
            {`${current} / ${count}`}
          </span>
        </div>
      )}
    </div>
  );
};

export default AppInputTitle;
