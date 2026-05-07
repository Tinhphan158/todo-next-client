"use client";

import DeleteWorkspaceDialog from "@/modules/workspace/components/DeleteWorkspaceDialog";
import WorkspaceDrawer from "@/modules/workspace/components/WorkspaceDrawer";
import WorkspaceHeader from "@/modules/workspace/components/WorkspaceHeader";
import WorkspaceTable from "@/modules/workspace/components/WorkspaceTable";
import { WorkspaceFormData } from "@/modules/workspace/schemas/workspace-form-schema";
import { EMPTY_WORKSPACE_BOARD_FILTERS } from "@/modules/workspace/helpers";
import { MESSAGE_TYPE, message } from "@/modules/shared/components/AppMessage";
import {
  useCreateWorkspaceMutation,
  useDeleteWorkspaceMutation,
  useGetWorkspacesQuery,
  useUpdateWorkspaceMutation,
} from "@/store/apis/workspaceApi";
import { Workspace } from "@/store/types";
import { useMemo, useState } from "react";

type FormMode = "create" | "edit";

const WorkspaceManagementPage = () => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState<10 | 50 | 100>(10);
  const [workspaceSearch, setWorkspaceSearch] = useState("");

  const [formMode, setFormMode] = useState<FormMode>("create");
  const [selectedWorkspace, setSelectedWorkspace] = useState<Workspace | null>(
    null,
  );
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const [workspaceToDelete, setWorkspaceToDelete] = useState<Workspace | null>(
    null,
  );
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const { data: workspaces = [], isFetching } = useGetWorkspacesQuery();

  const [createWorkspace, { isLoading: isCreating }] =
    useCreateWorkspaceMutation();
  const [updateWorkspace, { isLoading: isUpdating }] =
    useUpdateWorkspaceMutation();
  const [deleteWorkspace, { isLoading: isDeleting }] =
    useDeleteWorkspaceMutation();

  const filteredWorkspaces = useMemo(() => {
    const q = workspaceSearch.trim().toLowerCase();
    if (!q) return workspaces;
    return workspaces.filter((w) => w.name.toLowerCase().includes(q));
  }, [workspaces, workspaceSearch]);

  const paginatedWorkspaces = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filteredWorkspaces.slice(start, start + pageSize);
  }, [filteredWorkspaces, page, pageSize]);

  const listMetadata = useMemo(() => {
    const total = filteredWorkspaces.length;
    const totalPage = Math.max(1, Math.ceil(total / pageSize));
    return {
      page,
      pageSize,
      totalPage,
      total,
      hasPreviousPage: page > 1,
      hasNextPage: page < totalPage,
    };
  }, [filteredWorkspaces.length, page, pageSize]);

  const handleOpenCreateDrawer = () => {
    setFormMode("create");
    setSelectedWorkspace(null);
    setIsDrawerOpen(true);
  };

  const handleOpenEditDrawer = (workspace: Workspace) => {
    setFormMode("edit");
    setSelectedWorkspace(workspace);
    setIsDrawerOpen(true);
  };

  const handleConfirmDeleteDialog = (workspace: Workspace) => {
    setWorkspaceToDelete(workspace);
    setIsDeleteDialogOpen(true);
  };

  const handleSubmitForm = async (data: WorkspaceFormData) => {
    try {
      if (formMode === "create") {
        await createWorkspace(data).unwrap();
        message({
          type: MESSAGE_TYPE.SUCCESS,
          description: "Workspace created successfully.",
        });
      } else if (selectedWorkspace) {
        await updateWorkspace({
          id: selectedWorkspace.id,
          ...data,
        }).unwrap();
        message({
          type: MESSAGE_TYPE.SUCCESS,
          description: "Workspace updated successfully.",
        });
      }
      setIsDrawerOpen(false);
      setSelectedWorkspace(null);
    } catch {
      message({
        type: MESSAGE_TYPE.ERROR,
        description:
          formMode === "create"
            ? "Failed to create workspace. Please try again."
            : "Failed to update workspace. Please try again.",
      });
    }
  };

  const handleDeleteWorkspace = async () => {
    if (!workspaceToDelete) return;

    try {
      await deleteWorkspace(workspaceToDelete.id).unwrap();
      message({
        type: MESSAGE_TYPE.SUCCESS,
        description: "Workspace deleted successfully.",
      });
      setIsDeleteDialogOpen(false);
      setWorkspaceToDelete(null);
    } catch {
      message({
        type: MESSAGE_TYPE.ERROR,
        description: "Failed to delete workspace. Please try again.",
      });
    }
  };

  return (
    <div className="bg-base-white flex flex-col gap-4 rounded-lg p-4">
      <WorkspaceHeader
        workspaceSearch={workspaceSearch}
        onWorkspaceSearch={(value) => {
          setPage(1);
          setWorkspaceSearch(value);
        }}
        onCreate={handleOpenCreateDrawer}
      />

      <WorkspaceTable
        workspaces={paginatedWorkspaces}
        metadata={listMetadata}
        isLoading={isFetching}
        page={page}
        pageSize={pageSize}
        boardFilters={EMPTY_WORKSPACE_BOARD_FILTERS}
        onPageChange={setPage}
        onPageSizeChange={(nextPageSize) => {
          setPageSize(nextPageSize);
          setPage(1);
        }}
        onEdit={handleOpenEditDrawer}
        onDelete={handleConfirmDeleteDialog}
      />

      <WorkspaceDrawer
        open={isDrawerOpen}
        mode={formMode}
        selectedWorkspace={selectedWorkspace}
        isLoading={isCreating || isUpdating}
        onOpenChange={setIsDrawerOpen}
        onSubmit={handleSubmitForm}
      />

      <DeleteWorkspaceDialog
        open={isDeleteDialogOpen}
        workspace={workspaceToDelete}
        isLoading={isDeleting}
        onOpenChange={setIsDeleteDialogOpen}
        onCancel={() => {
          setIsDeleteDialogOpen(false);
          setWorkspaceToDelete(null);
        }}
        onConfirm={handleDeleteWorkspace}
      />
    </div>
  );
};

export default WorkspaceManagementPage;
