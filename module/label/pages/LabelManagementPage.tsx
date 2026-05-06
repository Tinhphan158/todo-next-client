"use client";

import DeleteLabelDialog from "@/module/label/components/DeleteLabelDialog";
import Header from "@/module/label/components/Header";
import LabelDrawer from "@/module/label/components/LabelDrawer";
import LabelTable from "@/module/label/components/LabelTable";
import { LabelFormData } from "@/module/label/schemas/label-form-schema";
import { MESSAGE_TYPE, message } from "@/module/shared/components/AppMessage";
import {
  useCreateLabelMutation,
  useDeleteLabelMutation,
  useGetLabelsQuery,
  useUpdateLabelMutation,
} from "@/store/api/labelApi";
import { Label } from "@/store/types";
import { useState } from "react";

type FormMode = "create" | "edit";

const LabelManagementPage = () => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState<10 | 50 | 100>(10);
  const [search, setSearch] = useState("");

  const [formMode, setFormMode] = useState<FormMode>("create");
  const [selectedLabel, setSelectedLabel] = useState<Label | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const [labelToDelete, setLabelToDelete] = useState<Label | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const { data: labelResponse, isFetching } = useGetLabelsQuery({
    page,
    pageSize,
    search: search || undefined,
  });

  const [createLabel, { isLoading: isCreating }] = useCreateLabelMutation();
  const [updateLabel, { isLoading: isUpdating }] = useUpdateLabelMutation();
  const [deleteLabel, { isLoading: isDeleting }] = useDeleteLabelMutation();

  const labels = labelResponse?.data ?? [];
  const metadata = labelResponse?.metadata;

  const handleOpenCreateDrawer = () => {
    setFormMode("create");
    setSelectedLabel(null);
    setIsDrawerOpen(true);
  };

  const handleOpenEditDrawer = (label: Label) => {
    setFormMode("edit");
    setSelectedLabel(label);
    setIsDrawerOpen(true);
  };

  const handleConfirmDeleteDialog = (label: Label) => {
    setLabelToDelete(label);
    setIsDeleteDialogOpen(true);
  };

  const handleSubmitForm = async (data: LabelFormData) => {
    try {
      if (formMode === "create") {
        await createLabel(data).unwrap();
        message({
          type: MESSAGE_TYPE.SUCCESS,
          description: "Label created successfully.",
        });
      } else if (selectedLabel) {
        await updateLabel({
          id: selectedLabel.id,
          ...data,
        }).unwrap();
        message({
          type: MESSAGE_TYPE.SUCCESS,
          description: "Label updated successfully.",
        });
      }
      setIsDrawerOpen(false);
      setSelectedLabel(null);
    } catch {
      message({
        type: MESSAGE_TYPE.ERROR,
        description:
          formMode === "create"
            ? "Failed to create label. Please try again."
            : "Failed to update label. Please try again.",
      });
    }
  };

  const handleDeleteLabel = async () => {
    if (!labelToDelete) return;

    try {
      await deleteLabel(labelToDelete.id).unwrap();
      message({
        type: MESSAGE_TYPE.SUCCESS,
        description: "Label deleted successfully.",
      });
      setIsDeleteDialogOpen(false);
      setLabelToDelete(null);
    } catch {
      message({
        type: MESSAGE_TYPE.ERROR,
        description: "Failed to delete label. This label may still be in use.",
      });
    }
  };

  return (
    <div className="bg-base-white flex flex-col gap-4 rounded-lg p-4">
      <Header
        search={search}
        onSearch={(value) => {
          setPage(1);
          setSearch(value);
        }}
        onCreate={handleOpenCreateDrawer}
      />

      <LabelTable
        labels={labels}
        metadata={metadata}
        isLoading={isFetching}
        page={page}
        pageSize={pageSize}
        onPageChange={setPage}
        onPageSizeChange={(nextPageSize) => {
          setPageSize(nextPageSize);
          setPage(1);
        }}
        onEdit={handleOpenEditDrawer}
        onDelete={handleConfirmDeleteDialog}
      />

      <LabelDrawer
        open={isDrawerOpen}
        mode={formMode}
        selectedLabel={selectedLabel}
        isLoading={isCreating || isUpdating}
        onOpenChange={setIsDrawerOpen}
        onSubmit={handleSubmitForm}
      />

      <DeleteLabelDialog
        open={isDeleteDialogOpen}
        label={labelToDelete}
        isLoading={isDeleting}
        onOpenChange={setIsDeleteDialogOpen}
        onCancel={() => {
          setIsDeleteDialogOpen(false);
          setLabelToDelete(null);
        }}
        onConfirm={handleDeleteLabel}
      />
    </div>
  );
};

export default LabelManagementPage;
