interface AppHeaderProps {
  title?: string;
}

const AppHeader = ({ title }: AppHeaderProps) => {
  return (
    <div className="bg-base-white flex min-h-[73px] items-center justify-between border-b border-neutral-100 px-4">
      <h1 className="heading-5 font-bold text-neutral-950">{title}</h1>
    </div>
  );
};

export default AppHeader;
