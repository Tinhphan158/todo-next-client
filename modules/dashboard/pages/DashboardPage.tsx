"use client";

import { MESSAGE_TYPE, message } from "@/modules/shared/components/AppMessage";
import { useDialog } from "@/modules/shared/hooks/useDialog";
import { useUploadImageMutation } from "@/store/api/cloudinaryApi";
import {
  useGetProfileQuery,
  useUpdatePasswordMutation,
  useUpdateProfileMutation,
} from "@/store/api/profileApi";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setUser } from "@/store/slices/authSlice";
import Image from "next/image";
import { useMemo } from "react";
import ChangePasswordDialog from "../components/ChangePasswordDialog";
import EditProfileDialog from "../components/EditProfileDialog";
import { ChangePasswordFormData } from "../schemas/change-password-schema";
import { EditProfileFormData } from "../schemas/edit-profile-schema";

const DashboardPage = () => {
  const { isOpen: isEditProfileOpen, setDialog: setEditProfileDialog } =
    useDialog();
  const { isOpen: isChangePasswordOpen, setDialog: setChangePasswordDialog } =
    useDialog();
  const dispatch = useAppDispatch();
  const authUser = useAppSelector((s) => s.auth.user);
  const { data: profile } = useGetProfileQuery();
  const [updateProfile, { isLoading: isUpdating }] = useUpdateProfileMutation();
  const [updatePassword, { isLoading: isUpdatingPassword }] =
    useUpdatePasswordMutation();
  const [uploadImage, { isLoading: isUploading }] = useUploadImageMutation();

  const currentProfile = useMemo(
    () => ({
      id: profile?.id ?? authUser?.id ?? 0,
      name: profile?.name ?? authUser?.name ?? "",
      email: profile?.email ?? authUser?.email ?? "",
      avatar: profile?.avatar ?? authUser?.avatar ?? null,
    }),
    [profile, authUser],
  );

  const isSubmitting = isUpdating || isUploading;
  const isChangingPassword = isUpdatingPassword;

  const handleUpdateProfile = async (data: EditProfileFormData) => {
    try {
      let avatarUrl: string | undefined = currentProfile.avatar ?? undefined;

      if (data.avatarFile) {
        const formData = new FormData();
        formData.append("file", data.avatarFile);
        const uploadRes = await uploadImage(formData).unwrap();
        avatarUrl = uploadRes.url;
      }

      const updated = await updateProfile({
        name: data.name,
        email: data.email,
        avatar: avatarUrl,
      }).unwrap();

      dispatch(
        setUser({
          id: updated.id,
          name: updated.name,
          email: updated.email,
          avatar: updated.avatar,
        }),
      );

      message({
        type: MESSAGE_TYPE.SUCCESS,
        description: "Profile updated successfully.",
      });
    } catch {
      message({
        type: MESSAGE_TYPE.ERROR,
        description: "Failed to update profile. Please try again.",
      });
    }
  };

  const handleChangePassword = async (data: ChangePasswordFormData) => {
    try {
      const result = await updatePassword({
        currentPassword: data.currentPassword,
        newPassword: data.newPassword,
      }).unwrap();

      message({
        type: MESSAGE_TYPE.SUCCESS,
        description: result.message || "Password updated successfully.",
      });
    } catch {
      message({
        type: MESSAGE_TYPE.ERROR,
        description: "Failed to update password. Please try again.",
      });
    }
  };

  return (
    <div className="bg-base-white flex flex-col gap-4 rounded-lg p-4">
      <div className="flex items-center justify-between rounded-lg border border-neutral-100 p-4">
        <div className="flex items-center gap-3">
          <Image
            src={currentProfile.avatar || "/images/avatar-default.png"}
            alt="profile avatar"
            width={56}
            height={56}
            className="h-14 w-14 rounded-full border border-neutral-100 object-contain"
          />
          <div className="flex flex-col">
            <span className="body-l font-semibold text-neutral-950">
              {currentProfile.name || "Unnamed user"}
            </span>
            <span className="body-s text-neutral-500">
              {currentProfile.email || "No email"}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <EditProfileDialog
            open={isEditProfileOpen}
            onOpenChange={setEditProfileDialog}
            currentProfile={currentProfile}
            isSubmitting={isSubmitting}
            onSubmit={handleUpdateProfile}
          />
          <ChangePasswordDialog
            open={isChangePasswordOpen}
            onOpenChange={setChangePasswordDialog}
            isSubmitting={isChangingPassword}
            onSubmit={handleChangePassword}
          />
        </div>
      </div>
      {/* Thông tin thống kê, chart, stats  */}
    </div>
  );
};

export default DashboardPage;
