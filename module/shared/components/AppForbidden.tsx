"use client";
import Image from "next/image";
import { AppButton } from "./AppButton";

export interface AppForbiddenProps {
  title?: string;
  message?: string;
  illustrationUrl?: string;
  actionButtonLabel?: string;
  onActionButtonClick?: () => void;
}

const AppForbidden = ({
  title,
  message,
  illustrationUrl,
  actionButtonLabel,
  onActionButtonClick,
}: AppForbiddenProps) => {
  return (
    <div className="flex w-[560px] flex-col items-center gap-14">
      <div className="flex flex-col gap-10">
        <div className="flex justify-center">
          {illustrationUrl && (
            <Image
              src={illustrationUrl || ""}
              alt="Forbidden Ilustration"
              width={160}
              height={160}
              className="aspect-square w-40"
            />
          )}
        </div>
        <div className="flex flex-col items-center gap-2">
          <h1 className="heading-5 font-bold text-neutral-950">{title}</h1>
          <p className="body-m font-medium text-neutral-400">{message}</p>
        </div>
      </div>
      <AppButton onClick={onActionButtonClick} variant="primary" size="l">
        {actionButtonLabel}
      </AppButton>
    </div>
  );
};

export default AppForbidden;
