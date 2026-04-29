import Image from "next/image";

export interface AppEmptyStateProps {
  label: string;
}

const AppEmptyState = ({ label }: AppEmptyStateProps) => {
  return (
    <div className="flex flex-col items-center gap-[10px]">
      <Image
        src="/images/empty-illustration.png"
        alt="empty illustration"
        width={121}
        height={99}
        className="h-[99px] w-[121px]"
      />
      <span className="body-s font-medium text-neutral-950">{label}</span>
    </div>
  );
};

export default AppEmptyState;
