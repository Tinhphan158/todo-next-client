import AppDrawer, {
  AppDrawerClose,
} from "@/module/shared/components/AppDrawer";
import AppConfirmPopover from "@/module/shared/components/AppConfirmPopover";
import { cloneElement, useCallback, useState } from "react";
import { DeleteDisabledIcon } from "@/module/shared/icons";
import { useTranslations } from "next-intl";
import { DefaultValues, FieldValues } from "react-hook-form";
import { AppButton } from "./AppButton";
import { useDialog } from "../hooks/useDialog";
import AppLoader from "./AppLoader";
import { BaseFormProps, FormState } from "@/lib/form";

type DrawerMode = "view" | "create" | "update";

export interface AppFormDrawerProps<T extends FieldValues> {
  open?: boolean;
  initialData?: DefaultValues<T>;
  title?: string;
  mode?: DrawerMode;
  formId?: string;
  children?: React.ReactNode;
  createConfirmTitle?: string;
  createButtonLabel?: string;
  createButtonStartIcon?: React.ReactNode;
  createButtonEndIcon?: React.ReactNode;
  updateConfirmTitle?: string;
  updateButtonLabel?: string;
  updateButtonStartIcon?: React.ReactNode;
  updateButtonEndIcon?: React.ReactNode;
  showDelete?: boolean;
  deleteConfirmTitle?: string;
  deleteButtonStartIcon?: React.ReactNode;
  deleteButtonEndIcon?: React.ReactNode;
  editButtonStartIcon?: React.ReactNode;
  editButtonEndIcon?: React.ReactNode;
  cancelButtonStartIcon?: React.ReactNode;
  cancelButtonEndIcon?: React.ReactNode;
  isLoading?: boolean;
  handleOnly?: boolean;
  canCreate?: boolean;
  canEdit?: boolean;
  canDelete?: boolean;
  layerNumber?: number;
  shouldBlur?: boolean;
  haveCreateConfirm?: boolean;
  closeConfirmTitle?: string;
  onOpenChange?: (open: boolean) => void;
  onModeChange?: (mode: DrawerMode) => void;
  onSubmit?: (data: T) => Promise<void>;
  onDelete?: () => Promise<void>;
}

const CloseDrawerButton = ({
  formId,
  open,
  onOpenChange,
  onEditCancelClick,
  children,
  isFormDirty,
  closeConfirmTitle,
}: {
  formId?: string;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onEditCancelClick?: () => void;
  children?: React.ReactNode;
  isFormDirty?: boolean;
  closeConfirmTitle?: string;
}) => {
  const t = useTranslations("shared.app-form-drawer");

  return isFormDirty ? (
    <AppConfirmPopover
      open={open}
      onOpenChange={onOpenChange}
      trigger={children}
      title={closeConfirmTitle ?? t("exit-confirm-title")}
      cancelButtonLabel={t("exit-button")}
      confirmButtonLabel={t("save-and-exit-button")}
      formId={formId}
      align="start"
      offset={-10}
      confirmButtonType="submit"
      onCancel={onEditCancelClick}
    />
  ) : (
    <AppDrawerClose>{children}</AppDrawerClose>
  );
};

const CreateFooterAction = ({
  formId,
  createConfirmTitle,
  createButtonLabel,
  createButtonStartIcon,
  createButtonEndIcon,
  cancelButtonStartIcon,
  cancelButtonEndIcon,
  isSubmitting,
  isFormValid,
  canCreate = true,
  haveCreateConfirm = true,
}: {
  formId?: string;
  isSubmitting?: boolean;
  isFormValid?: boolean;
  createConfirmTitle?: string;
  createButtonLabel?: string;
  createButtonStartIcon?: React.ReactNode;
  createButtonEndIcon?: React.ReactNode;
  cancelButtonStartIcon?: React.ReactNode;
  cancelButtonEndIcon?: React.ReactNode;
  canCreate?: boolean;
  haveCreateConfirm?: boolean;
}) => {
  const t = useTranslations("shared.app-form-drawer");

  return (
    <div className="flex items-center gap-3">
      <AppDrawerClose>
        <AppButton
          variant="secondary"
          size="s"
          disabled={isSubmitting}
          startIcon={cancelButtonStartIcon}
          endIcon={cancelButtonEndIcon}
        >
          {t("cancel-button")}
        </AppButton>
      </AppDrawerClose>
      {canCreate &&
        (haveCreateConfirm ? (
          <AppConfirmPopover
            trigger={
              <AppButton
                size="s"
                isLoading={isSubmitting}
                disabled={!isFormValid}
                startIcon={createButtonStartIcon}
                endIcon={createButtonEndIcon}
              >
                {createButtonLabel ?? t("confirm-button")}
              </AppButton>
            }
            title={createConfirmTitle}
            cancelButtonLabel={t("no-button")}
            confirmButtonLabel={t("yes-button")}
            formId={formId}
            confirmButtonType="submit"
          />
        ) : (
          <AppButton
            size="s"
            isLoading={isSubmitting}
            disabled={!isFormValid}
            type="submit"
            form={formId}
            startIcon={createButtonStartIcon}
            endIcon={createButtonEndIcon}
          >
            {createButtonLabel ?? t("confirm-button")}
          </AppButton>
        ))}
    </div>
  );
};

const UpdateFooterAction = ({
  formId,
  updateConfirmTitle,
  updateButtonLabel,
  updateButtonStartIcon,
  updateButtonEndIcon,
  cancelButtonStartIcon,
  cancelButtonEndIcon,
  isFormDirty,
  isSubmitting,
  isFormValid,
  canEdit = true,
  onEditCancelClick,
  closeConfirmTitle,
}: {
  formId?: string;
  isFormDirty?: boolean;
  isSubmitting?: boolean;
  isFormValid?: boolean;
  updateConfirmTitle?: string;
  updateButtonLabel?: string;
  updateButtonStartIcon?: React.ReactNode;
  updateButtonEndIcon?: React.ReactNode;
  cancelButtonStartIcon?: React.ReactNode;
  cancelButtonEndIcon?: React.ReactNode;
  canEdit?: boolean;
  onEditCancelClick?: () => void;
  closeConfirmTitle?: string;
}) => {
  const t = useTranslations("shared.app-form-drawer");

  return (
    <div className="flex items-center gap-3">
      <CloseDrawerButton
        formId={formId}
        isFormDirty={isFormDirty}
        onEditCancelClick={onEditCancelClick}
        closeConfirmTitle={closeConfirmTitle}
      >
        <AppButton
          variant="secondary"
          size="s"
          disabled={isSubmitting}
          startIcon={cancelButtonStartIcon}
          endIcon={cancelButtonEndIcon}
        >
          {t("cancel-button")}
        </AppButton>
      </CloseDrawerButton>

      {canEdit && (
        <AppConfirmPopover
          trigger={
            <AppButton
              size="s"
              isLoading={isSubmitting}
              disabled={!isFormValid || !isFormDirty}
              startIcon={updateButtonStartIcon}
              endIcon={updateButtonEndIcon}
            >
              {updateButtonLabel || t("update-button")}
            </AppButton>
          }
          title={updateConfirmTitle}
          cancelButtonLabel={t("no-button")}
          confirmButtonLabel={t("yes-button")}
          formId={formId}
          confirmButtonType="submit"
        />
      )}
    </div>
  );
};

const ViewFooterAction = ({
  showDelete = true,
  deleteConfirmTitle,
  deleteButtonStartIcon,
  deleteButtonEndIcon,
  editButtonStartIcon,
  editButtonEndIcon,
  cancelButtonStartIcon,
  cancelButtonEndIcon,
  isDeleting,
  canEdit = true,
  canDelete = true,
  onEditClick,
  onDelete,
  onCancel,
}: {
  showDelete?: boolean;
  deleteConfirmTitle?: string;
  deleteButtonStartIcon?: React.ReactNode;
  deleteButtonEndIcon?: React.ReactNode;
  editButtonStartIcon?: React.ReactNode;
  editButtonEndIcon?: React.ReactNode;
  cancelButtonStartIcon?: React.ReactNode;
  cancelButtonEndIcon?: React.ReactNode;
  isDeleting?: boolean;
  canEdit?: boolean;
  canDelete?: boolean;
  onEditClick?: () => void;
  onDelete?: () => void;
  onCancel?: () => void;
}) => {
  const t = useTranslations("shared.app-form-drawer");

  return (
    <div className="flex items-center gap-3">
      {!showDelete && (
        <AppDrawerClose>
          <AppButton
            onClick={onCancel}
            variant="secondary"
            size="s"
            disabled={isDeleting}
            startIcon={cancelButtonStartIcon}
            endIcon={cancelButtonEndIcon}
          >
            {t("cancel-button")}
          </AppButton>
        </AppDrawerClose>
      )}
      {showDelete && canDelete && onDelete && (
        <AppConfirmPopover
          trigger={
            <AppButton
              variant="ghost"
              size="s"
              isLoading={isDeleting}
              disabled={isDeleting}
              startIcon={deleteButtonStartIcon}
              endIcon={deleteButtonEndIcon}
            >
              {t("delete-button")}
            </AppButton>
          }
          title={deleteConfirmTitle}
          cancelButtonLabel={t("no-button")}
          confirmButtonLabel={t("yes-button")}
          onConfirm={onDelete}
        />
      )}
      {canEdit && (
        <AppButton
          size="s"
          onClick={onEditClick}
          disabled={isDeleting}
          startIcon={editButtonStartIcon}
          endIcon={editButtonEndIcon}
        >
          {t("edit-button")}
        </AppButton>
      )}
    </div>
  );
};

const FormDrawerFooter = ({
  formId,
  mode,
  isValid = false,
  isDirty = false,
  isSubmitting = false,
  updateConfirmTitle,
  updateButtonLabel,
  updateButtonStartIcon,
  updateButtonEndIcon,
  createConfirmTitle,
  createButtonLabel,
  createButtonStartIcon,
  createButtonEndIcon,
  showDelete,
  deleteConfirmTitle,
  deleteButtonStartIcon,
  deleteButtonEndIcon,
  editButtonStartIcon,
  editButtonEndIcon,
  cancelButtonStartIcon,
  cancelButtonEndIcon,
  isDeleting,
  canCreate = true,
  canEdit = true,
  canDelete = true,
  haveCreateConfirm = true,
  onEditClick,
  onEditCancelClick,
  onDelete,
  closeConfirmTitle,
}: {
  formId?: string;
  mode?: DrawerMode;
  isValid?: boolean;
  isDirty?: boolean;
  isSubmitting?: boolean;
  createConfirmTitle?: string;
  createButtonLabel?: string;
  createButtonStartIcon?: React.ReactNode;
  createButtonEndIcon?: React.ReactNode;
  updateConfirmTitle?: string;
  updateButtonLabel?: string;
  updateButtonStartIcon?: React.ReactNode;
  updateButtonEndIcon?: React.ReactNode;
  showDelete?: boolean;
  deleteConfirmTitle?: string;
  deleteButtonStartIcon?: React.ReactNode;
  deleteButtonEndIcon?: React.ReactNode;
  editButtonStartIcon?: React.ReactNode;
  editButtonEndIcon?: React.ReactNode;
  cancelButtonStartIcon?: React.ReactNode;
  cancelButtonEndIcon?: React.ReactNode;
  isDeleting?: boolean;
  canCreate?: boolean;
  canEdit?: boolean;
  canDelete?: boolean;
  haveCreateConfirm?: boolean;
  onEditClick?: () => void;
  onEditCancelClick?: () => void;
  onDelete?: () => void;
  closeConfirmTitle?: string;
}) => {
  if (mode === "view") {
    return (
      <ViewFooterAction
        showDelete={showDelete}
        deleteConfirmTitle={deleteConfirmTitle}
        deleteButtonStartIcon={deleteButtonStartIcon}
        deleteButtonEndIcon={deleteButtonEndIcon}
        editButtonStartIcon={editButtonStartIcon}
        editButtonEndIcon={editButtonEndIcon}
        cancelButtonStartIcon={cancelButtonStartIcon}
        cancelButtonEndIcon={cancelButtonEndIcon}
        isDeleting={isDeleting}
        canEdit={canEdit}
        canDelete={canDelete}
        onEditClick={onEditClick}
        onDelete={onDelete}
      />
    );
  }

  if (mode === "create") {
    return (
      <CreateFooterAction
        formId={formId}
        createConfirmTitle={createConfirmTitle}
        createButtonLabel={createButtonLabel}
        createButtonStartIcon={createButtonStartIcon}
        createButtonEndIcon={createButtonEndIcon}
        cancelButtonStartIcon={cancelButtonStartIcon}
        cancelButtonEndIcon={cancelButtonEndIcon}
        isFormValid={isValid}
        isSubmitting={isSubmitting}
        canCreate={canCreate}
        haveCreateConfirm={haveCreateConfirm}
      />
    );
  }

  if (mode === "update") {
    return (
      <UpdateFooterAction
        formId={formId}
        updateConfirmTitle={updateConfirmTitle}
        updateButtonLabel={updateButtonLabel}
        updateButtonStartIcon={updateButtonStartIcon}
        updateButtonEndIcon={updateButtonEndIcon}
        cancelButtonStartIcon={cancelButtonStartIcon}
        cancelButtonEndIcon={cancelButtonEndIcon}
        isSubmitting={isSubmitting}
        isFormValid={isValid}
        isFormDirty={isDirty}
        canEdit={canEdit}
        onEditCancelClick={onEditCancelClick}
        closeConfirmTitle={closeConfirmTitle}
      />
    );
  }
};

const FormDrawerCloseButton = ({
  open,
  formId,
  isFormDirty,
  onOpenChange,
  onEditCancelClick,
  closeConfirmTitle,
}: {
  open?: boolean;
  onOpenChange?: () => void;
  formId?: string;
  isFormDirty?: boolean;
  isSubmitting?: boolean;
  onEditCancelClick?: () => void;
  closeConfirmTitle?: string;
}) => {
  return (
    <CloseDrawerButton
      open={open}
      onOpenChange={onOpenChange}
      formId={formId}
      isFormDirty={isFormDirty}
      onEditCancelClick={onEditCancelClick}
      closeConfirmTitle={closeConfirmTitle}
    >
      <button>
        <DeleteDisabledIcon className="h-6 w-6 text-neutral-950" />
      </button>
    </CloseDrawerButton>
  );
};

const AppFormDrawer = <T extends FieldValues>({
  open,
  initialData,
  mode,
  children,
  title,
  formId,
  updateConfirmTitle,
  updateButtonLabel,
  updateButtonStartIcon,
  updateButtonEndIcon,
  createConfirmTitle,
  createButtonLabel,
  createButtonStartIcon,
  createButtonEndIcon,
  showDelete = true,
  deleteConfirmTitle,
  deleteButtonStartIcon,
  deleteButtonEndIcon,
  editButtonStartIcon,
  editButtonEndIcon,
  cancelButtonStartIcon,
  cancelButtonEndIcon,
  isLoading = false,
  handleOnly = false,
  canCreate = true,
  canEdit = true,
  canDelete = true,
  layerNumber = 0,
  shouldBlur = true,
  haveCreateConfirm,
  closeConfirmTitle,
  onOpenChange,
  onModeChange,
  onSubmit,
  onDelete,
}: AppFormDrawerProps<T>) => {
  const [formState, setFormState] = useState<FormState<T> | null>();
  const [isDeleting, setIsDeleting] = useState(false);

  const {
    isOpen: isExitConfirmPopoverOpen,
    openDialog: openExitConfirmPopover,
    toggleDialog: toggleExitConfirmPopover,
  } = useDialog();

  const handleCloseDialog = () => {
    onOpenChange?.(false);
    setFormState({ isDirty: false, isSubmitting: false, isValid: false });
  };

  const handleChangeUpdateMode = () => {
    onModeChange?.("update");
  };

  const handleSubmitForm = async (data: T) => {
    await onSubmit?.(data);
  };

  const handleDelete = async () => {
    if (!onDelete) return;

    setIsDeleting(true);
    try {
      await onDelete();
    } finally {
      setIsDeleting(false);
    }
  };

  const handleFormStateChanged = useCallback((state: FormState<T>) => {
    setFormState(state);
  }, []);

  const handleOpenChange = (open: boolean) => {
    if (!open && (formState?.isSubmitting || isDeleting)) {
      return; // Prevent closing when form is submitting
    }

    if (!open && mode === "update" && formState?.isDirty) {
      openExitConfirmPopover();
    } else {
      onOpenChange?.(open);
      setFormState({ isDirty: false, isSubmitting: false, isValid: false });
    }
  };

  return (
    <AppDrawer
      open={open}
      onOpenChange={handleOpenChange}
      title={title}
      handleOnly={handleOnly}
      layerNumber={layerNumber}
      shouldBlur={shouldBlur}
      footerAction={
        <FormDrawerFooter
          mode={mode}
          formId={formId}
          updateConfirmTitle={updateConfirmTitle}
          updateButtonLabel={updateButtonLabel}
          updateButtonStartIcon={updateButtonStartIcon}
          updateButtonEndIcon={updateButtonEndIcon}
          createConfirmTitle={createConfirmTitle}
          createButtonLabel={createButtonLabel}
          createButtonStartIcon={createButtonStartIcon}
          createButtonEndIcon={createButtonEndIcon}
          showDelete={showDelete}
          deleteConfirmTitle={deleteConfirmTitle}
          deleteButtonStartIcon={deleteButtonStartIcon}
          deleteButtonEndIcon={deleteButtonEndIcon}
          editButtonStartIcon={editButtonStartIcon}
          editButtonEndIcon={editButtonEndIcon}
          cancelButtonStartIcon={cancelButtonStartIcon}
          cancelButtonEndIcon={cancelButtonEndIcon}
          isDeleting={isDeleting}
          canCreate={canCreate}
          canEdit={canEdit}
          canDelete={canDelete}
          onEditCancelClick={handleCloseDialog}
          onEditClick={handleChangeUpdateMode}
          onDelete={handleDelete}
          isSubmitting={formState?.isSubmitting}
          isDirty={formState?.isDirty}
          isValid={formState?.isValid}
          haveCreateConfirm={haveCreateConfirm}
          closeConfirmTitle={closeConfirmTitle}
        />
      }
      customCloseButton={
        <FormDrawerCloseButton
          open={isExitConfirmPopoverOpen}
          onOpenChange={toggleExitConfirmPopover}
          onEditCancelClick={handleCloseDialog}
          formId={formId}
          isSubmitting={formState?.isSubmitting}
          isFormDirty={mode === "update" && formState?.isDirty}
          closeConfirmTitle={closeConfirmTitle}
        />
      }
    >
      {isLoading ? (
        <div className="w-ful bg-base-white flex h-full items-center justify-center">
          <AppLoader className="h-8 w-8" size={32} />
        </div>
      ) : (
        cloneElement(children as React.ReactElement<BaseFormProps<T>>, {
          id: formId,
          onSubmit: handleSubmitForm,
          onStateChange: handleFormStateChanged,
          initialData: initialData,
          disabled: mode === "view",
        })
      )}
    </AppDrawer>
  );
};

export default AppFormDrawer;
