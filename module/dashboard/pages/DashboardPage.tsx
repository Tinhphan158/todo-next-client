"use client";

import { message } from "@/module/shared/components/AppMessage";
import { useUploadImageMutation } from "@/store/api/cloudinaryApi";
import {
  useGetProfileQuery,
  useUpdateProfileMutation,
} from "@/store/api/profileApi";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setUser } from "@/store/slices/authSlice";
import Image from "next/image";
import { useMemo } from "react";
import EditProfileDialog from "../components/EditProfileDialog";
import { EditProfileFormData } from "../schemas/edit-profile-schema";

const DashboardPage = () => {
  const dispatch = useAppDispatch();
  const authUser = useAppSelector((s) => s.auth.user);
  const { data: profile } = useGetProfileQuery();
  const [updateProfile, { isLoading: isUpdating }] = useUpdateProfileMutation();
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
        type: "success",
        description: "Profile updated successfully.",
      });
      return true;
    } catch {
      message({
        type: "error",
        description: "Failed to update profile. Please try again.",
      });
      return false;
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

        <EditProfileDialog
          currentProfile={currentProfile}
          isSubmitting={isSubmitting}
          onSubmit={handleUpdateProfile}
        />
      </div>
    </div>
  );
};

export default DashboardPage;
