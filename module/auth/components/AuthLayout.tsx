import { cn } from "@/lib/utils";

export interface AuthLayoutProps {
  children: React.ReactNode;
  className?: string;
}

export const AuthLayout = ({ children, className }: AuthLayoutProps) => {
  return (
    <div
      className={cn(
        "relative flex min-h-dvh flex-col bg-neutral-50 dark:bg-neutral-950",
        className,
      )}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="bg-primary-500/10 dark:bg-primary-400/15 absolute top-0 -left-1/4 h-112 w-md rounded-full blur-3xl" />
        <div className="bg-primary-600/10 dark:bg-primary-500/10 absolute -right-1/4 bottom-0 h-96 w-[24rem] rounded-full blur-3xl" />
      </div>

      <div className="relative flex flex-1 flex-col items-center justify-center px-4 py-10 sm:px-6 sm:py-12">
        <div className="flex w-full flex-col items-center">{children}</div>
      </div>
    </div>
  );
};
