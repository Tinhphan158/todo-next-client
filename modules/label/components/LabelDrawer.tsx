"use client";

import LabelForm from "@/modules/label/components/LabelForm";
import { LabelFormData } from "@/modules/label/schemas/label-form-schema";
import AppFormDrawer from "@/modules/shared/components/AppFormDrawer";
import { Label } from "@/store/types";

interface LabelDrawerProps {
  open: boolean;
  mode: "create" | "edit";
  selectedLabel: Label | null;
  isLoading?: boolean;
  onOpenChange?: (open: boolean) => void;
  onSubmit?: (data: LabelFormData) => Promise<void>;
}

const LabelDrawer = ({
  open,
  mode,
  selectedLabel,
  isLoading = false,
  onOpenChange,
  onSubmit,
}: LabelDrawerProps) => {
  return (
    <AppFormDrawer<LabelFormData>
      open={open}
      title={mode === "create" ? "Create label" : "Edit label"}
      mode={mode === "create" ? "create" : "update"}
      formId="label-form"
      initialData={
        mode === "edit" && selectedLabel
          ? {
              name: selectedLabel.name,
              color: selectedLabel.color,
              background: selectedLabel.background,
            }
          : {
              name: "",
              color: "#1F2937",
              background: "#DBEAFE",
            }
      }
      haveCreateConfirm={false}
      isLoading={isLoading}
      onOpenChange={onOpenChange}
      onSubmit={onSubmit}
      updateConfirmTitle="Are you sure you want to update this label?"
    >
      <LabelForm mode={mode} />
    </AppFormDrawer>
  );
};

export default LabelDrawer;
