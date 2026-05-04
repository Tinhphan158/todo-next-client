import Link from "next/link";

import { cn } from "@/lib/utils";
import { EssentialCheckIcon } from "@/module/shared/icons";

export const UpdateSuccessStep = () => {
  return (
    <div className="flex flex-col items-center gap-8 text-center">
      <p className="text-2xl font-bold tracking-tight text-neutral-950 dark:text-neutral-50">
        TaskFlow
      </p>

      <div className="text-base-white flex size-12 shrink-0 items-center justify-center rounded-xl bg-neutral-950">
        <EssentialCheckIcon size={22} className="text-base-white" />
      </div>

      <div className="flex flex-col gap-3">
        <h2 className="text-xl font-bold tracking-tight text-neutral-950 dark:text-neutral-50">
          Password updated
        </h2>
        <p className="body-s mx-auto max-w-sm text-neutral-600 dark:text-neutral-400">
          Your password has been reset successfully. You can now sign in with
          your new password.
        </p>
      </div>

      <Link
        href="/login"
        className={cn(
          "flex w-full items-center justify-center rounded-[8px] px-4 py-3",
          "button-l text-base-white font-bold",
          "bg-neutral-950 transition-colors hover:bg-neutral-800 active:bg-neutral-900 disabled:bg-neutral-200 disabled:text-neutral-400",
        )}
      >
        Go to Login
      </Link>
    </div>
  );
};
