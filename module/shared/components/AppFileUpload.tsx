import { useRef } from "react";
import { AppButton } from "./AppButton";
import { DeleteDisabledIcon } from "../icons";

interface AppFileUploadProps {
  placeholer?: string;
  accept?: string;
  uploadButtonLabel?: string;
  changeButtonLabel?: string;
  value?: File;
  disabled?: boolean;
  onChange?: (file?: File) => void;
}

const AppFileUpload = ({
  value,
  placeholer,
  accept,
  uploadButtonLabel,
  changeButtonLabel,
  disabled,
  onChange,
}: AppFileUploadProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const hasFile = !!value;

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    onChange?.(selectedFile);
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const removeFile = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    onChange?.(undefined);
  };

  return (
    <div
      data-has-file={hasFile}
      className="group bg-base-white border-custom-dashed flex items-center justify-between gap-4 rounded-[8px] p-4 text-neutral-200 data-[has-file=true]:bg-neutral-50"
    >
      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        onChange={handleFileSelect}
        className="hidden"
        disabled={disabled}
      />
      {hasFile ? (
        <>
          <div className="bg-base-white flex flex-1 items-center justify-between rounded-[6px] p-2">
            <span className="caption-s line-clamp-1 flex-1 wrap-anywhere text-neutral-500">
              {value?.name}
            </span>
            <button onClick={removeFile}>
              <DeleteDisabledIcon className="h-4 w-4 text-neutral-950" />
            </button>
          </div>
          <AppButton
            disabled={disabled}
            variant="secondary"
            size="s"
            type="button"
            onClick={handleUploadClick}
          >
            {changeButtonLabel}
          </AppButton>
        </>
      ) : (
        <>
          <p className="caption-s text-neutral-500">{placeholer}</p>
          <AppButton
            disabled={disabled}
            variant="secondary"
            size="s"
            type="button"
            onClick={handleUploadClick}
          >
            {uploadButtonLabel}
          </AppButton>
        </>
      )}
    </div>
  );
};

export default AppFileUpload;
