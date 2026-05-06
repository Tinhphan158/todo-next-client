import { useRef } from "react";
import { AppButton } from "./AppButton";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { DeleteDisabledIcon } from "../icons";

export interface UploadValue {
  url?: string;
  file?: File;
}

interface AppFrameUpload {
  label?: string;
  uploadButtonLabel?: string;
  changeButtonLabel?: string;
  value?: UploadValue;
  accept?: string;
  error?: boolean;
  disabled?: boolean;
  aspect?: "video" | "square";
  sizeSquare?: number;
  showDeleteButton?: boolean;
  onBlur?: () => void;
  onChange?: (value?: UploadValue) => void;
  onRemove?: () => void;
}

const AppFrameUpload = ({
  uploadButtonLabel,
  changeButtonLabel,
  label,
  value,
  accept = "image/*",
  error,
  disabled,
  aspect = "video",
  showDeleteButton,
  onChange,
  onBlur,
  onRemove,
}: AppFrameUpload) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const hasImage = !!(value?.file || value?.url);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      onChange?.({ file: selectedFile, url: value?.url });
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageClick = () => {
    handleUploadClick();
  };

  const handleDeleteClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    onChange?.(undefined);
    onRemove?.();
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const imageUrl = value?.file ? URL.createObjectURL(value.file) : value?.url;

  return (
    <div
      className={cn("flex flex-1", {
        "h-full w-full": aspect === "square",
        "min-h-[222px] min-w-[394px]": aspect === "video",
      })}
    >
      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        onChange={handleFileSelect}
        className="hidden"
        disabled={disabled}
      />
      {hasImage && imageUrl ? (
        <div
          data-error={error ? "" : undefined}
          className="group data-error:border-negative-500 relative min-h-full w-full rounded-[8px] data-error:border"
        >
          <Image
            src={imageUrl}
            width={1920}
            height={1080}
            alt="Preview"
            className={cn(
              "h-full w-full cursor-pointer rounded-[8px] object-cover",
              {
                "aspect-video": aspect === "video",
                "aspect-square": aspect === "square",
              },
            )}
            onClick={handleImageClick}
          />
          <div className="absolute inset-0 flex items-center justify-center rounded-[8px]">
            {!disabled && (
              <AppButton
                size="s"
                variant="secondary"
                type="button"
                onClick={handleImageClick}
                disabled={disabled}
              >
                {changeButtonLabel}
              </AppButton>
            )}
          </div>
          <div className="absolute top-2 right-2">
            {!disabled && showDeleteButton && (
              <button
                type="button"
                disabled={disabled}
                onClick={handleDeleteClick}
                className="bg-base-white flex h-6 w-6 items-center justify-center rounded-full"
              >
                <DeleteDisabledIcon />
              </button>
            )}
          </div>
        </div>
      ) : (
        <div
          data-error={error ? "" : undefined}
          className="bg-base-white data-error:border-negative-500 border-custom-dashed flex min-h-full w-full flex-col items-center justify-center gap-2 rounded-[8px] border-neutral-200 p-4"
        >
          <p className="caption-s text-center font-medium text-neutral-500">
            {label}
          </p>
          <AppButton
            size="s"
            variant="secondary"
            type="button"
            onClick={handleUploadClick}
            disabled={disabled}
            onBlur={onBlur}
          >
            {uploadButtonLabel}
          </AppButton>
        </div>
      )}
    </div>
  );
};

export default AppFrameUpload;
