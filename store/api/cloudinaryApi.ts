import { baseApi } from "../axios/baseApi";
import type { CloudinaryUploadResponse, MessageResponse } from "../types";

export const cloudinaryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    uploadImage: builder.mutation<CloudinaryUploadResponse, FormData>({
      query: (formData) => ({
        url: "/cloudinary/upload/image",
        method: "POST",
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      }),
    }),

    uploadImages: builder.mutation<CloudinaryUploadResponse[], FormData>({
      query: (formData) => ({
        url: "/cloudinary/upload/images",
        method: "POST",
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      }),
    }),

    deleteImage: builder.mutation<
      MessageResponse & { publicId: string },
      { publicId: string }
    >({
      query: (body) => ({
        url: "/cloudinary/image",
        method: "DELETE",
        data: body,
      }),
    }),
  }),
});

export const {
  useUploadImageMutation,
  useUploadImagesMutation,
  useDeleteImageMutation,
} = cloudinaryApi;
