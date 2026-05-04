import * as React from "react";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { FormFrameUploadField } from "@/module/shared/components/AppFormFrameUpload";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { AppButton } from "@/module/shared/components/AppButton";

const meta = {
  title: "Shared/Components/AppFormFrameUpload",
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="w-[500px]">
        <Story />
      </div>
    ),
  ],
} satisfies Meta;

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: function DefaultRender() {
    const form = useForm({
      defaultValues: {
        image: undefined as { file?: File; url?: string } | undefined,
      },
    });

    return (
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit((data) =>
            alert(
              JSON.stringify(
                {
                  fileName: data.image?.file?.name,
                  fileSize: data.image?.file?.size,
                  fileType: data.image?.file?.type,
                },
                null,
                2,
              ),
            ),
          )}
          className="space-y-4"
        >
          <FormFrameUploadField
            control={form.control}
            name="image"
            label="Cover Image"
            uploadLabel="Upload an image"
            uploadButtonLabel="Upload"
            changeButtonLabel="Change"
          />
          <AppButton type="submit">Submit</AppButton>
        </form>
      </Form>
    );
  },
};

export const WithValidation: Story = {
  render: function WithValidationRender() {
    const form = useForm({
      defaultValues: {
        image: undefined as { file?: File; url?: string } | undefined,
      },
    });

    return (
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit((data) =>
            alert(
              JSON.stringify(
                {
                  fileName: data.image?.file?.name,
                  fileSize: data.image?.file?.size,
                  fileType: data.image?.file?.type,
                },
                null,
                2,
              ),
            ),
          )}
          className="space-y-4"
        >
          <FormFrameUploadField
            control={form.control}
            name="image"
            label="Cover Image"
            uploadLabel="Upload an image"
            uploadButtonLabel="Upload"
            changeButtonLabel="Change"
            rules={{
              required: "Image is required",
              validate: {
                fileType: (value) =>
                  !value?.file ||
                  value.file.type.startsWith("image/") ||
                  "File must be an image",
                fileSize: (value) =>
                  !value?.file ||
                  value.file.size <= 5000000 ||
                  "Image size must be less than 5MB",
              },
            }}
          />
          <AppButton type="submit">Submit</AppButton>
        </form>
      </Form>
    );
  },
};

export const WithHelperText: Story = {
  render: function WithHelperTextRender() {
    const form = useForm({
      defaultValues: {
        image: undefined as { file?: File; url?: string } | undefined,
      },
    });

    return (
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit((data) =>
            alert(JSON.stringify(data, null, 2)),
          )}
          className="space-y-4"
        >
          <FormFrameUploadField
            control={form.control}
            name="image"
            label="Profile Banner"
            uploadLabel="Upload your profile banner"
            uploadButtonLabel="Upload"
            changeButtonLabel="Change"
            helperText="Recommended size: 1920x1080px. Max file size: 5MB"
            accept="image/*"
          />
          <AppButton type="submit">Submit</AppButton>
        </form>
      </Form>
    );
  },
};

export const ProfilePicture: Story = {
  render: function ProfilePictureRender() {
    const form = useForm({
      defaultValues: {
        avatar: undefined as { file?: File; url?: string } | undefined,
      },
    });

    return (
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit((data) =>
            alert(JSON.stringify(data, null, 2)),
          )}
          className="space-y-4"
        >
          <FormFrameUploadField
            control={form.control}
            name="avatar"
            label="Profile Picture"
            uploadLabel="Upload your profile picture"
            uploadButtonLabel="Upload Photo"
            changeButtonLabel="Change Photo"
            accept=".jpg,.jpeg,.png"
            rules={{
              required: "Profile picture is required",
            }}
          />
          <AppButton type="submit">Save Profile</AppButton>
        </form>
      </Form>
    );
  },
};

export const CoverImage: Story = {
  render: function CoverImageRender() {
    const form = useForm({
      defaultValues: {
        cover: undefined as { file?: File; url?: string } | undefined,
      },
    });

    return (
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit((data) =>
            alert(JSON.stringify(data, null, 2)),
          )}
          className="space-y-4"
        >
          <FormFrameUploadField
            control={form.control}
            name="cover"
            label="Cover Image"
            uploadLabel="Drop your cover image here"
            uploadButtonLabel="Select Image"
            changeButtonLabel="Replace Image"
            accept="image/*"
            helperText="This will be displayed as your channel's banner"
            rules={{
              required: "Cover image is required",
            }}
          />
          <AppButton type="submit">Save Changes</AppButton>
        </form>
      </Form>
    );
  },
};

export const MultipleFrameUploads: Story = {
  render: function MultipleFrameUploadsRender() {
    const form = useForm({
      defaultValues: {
        coverImage: undefined as { file?: File; url?: string } | undefined,
        profileImage: undefined as { file?: File; url?: string } | undefined,
        thumbnail: undefined as { file?: File; url?: string } | undefined,
      },
    });

    return (
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit((data) =>
            alert(
              JSON.stringify(
                {
                  coverImage: data.coverImage?.file?.name,
                  profileImage: data.profileImage?.file?.name,
                  thumbnail: data.thumbnail?.file?.name,
                },
                null,
                2,
              ),
            ),
          )}
          className="space-y-6"
        >
          <FormFrameUploadField
            control={form.control}
            name="coverImage"
            label="Cover Image"
            uploadLabel="Upload cover image"
            uploadButtonLabel="Upload"
            changeButtonLabel="Change"
            rules={{ required: "Cover image is required" }}
          />
          <FormFrameUploadField
            control={form.control}
            name="profileImage"
            label="Profile Picture"
            uploadLabel="Upload profile picture"
            uploadButtonLabel="Upload"
            changeButtonLabel="Change"
            rules={{ required: "Profile picture is required" }}
          />
          <FormFrameUploadField
            control={form.control}
            name="thumbnail"
            label="Thumbnail (Optional)"
            uploadLabel="Upload thumbnail"
            uploadButtonLabel="Upload"
            changeButtonLabel="Change"
          />
          <AppButton type="submit">Save All Images</AppButton>
        </form>
      </Form>
    );
  },
};

export const WithPreloadedImage: Story = {
  render: function WithPreloadedImageRender() {
    const form = useForm({
      defaultValues: {
        image: {
          file: new File([""], "existing-cover.jpg", { type: "image/jpeg" }),
        },
      },
    });

    return (
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit((data) =>
            alert(JSON.stringify(data, null, 2)),
          )}
          className="space-y-4"
        >
          <FormFrameUploadField
            control={form.control}
            name="image"
            label="Cover Image"
            uploadLabel="Upload an image"
            uploadButtonLabel="Upload"
            changeButtonLabel="Change"
            helperText="You have an existing image. Hover to change it."
          />
          <AppButton type="submit">Submit</AppButton>
        </form>
      </Form>
    );
  },
};

export const PNGOnly: Story = {
  render: function PNGOnlyRender() {
    const form = useForm({
      defaultValues: {
        logo: undefined as { file?: File; url?: string } | undefined,
      },
    });

    return (
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit((data) =>
            alert(JSON.stringify(data, null, 2)),
          )}
          className="space-y-4"
        >
          <FormFrameUploadField
            control={form.control}
            name="logo"
            label="Company Logo"
            uploadLabel="Upload your logo (PNG only)"
            uploadButtonLabel="Upload Logo"
            changeButtonLabel="Change Logo"
            accept=".png,image/png"
            helperText="Upload a PNG file with transparent background"
            rules={{
              required: "Logo is required",
              validate: {
                fileType: (value) =>
                  !value?.file ||
                  value.file.type === "image/png" ||
                  "File must be a PNG image",
              },
            }}
          />
          <AppButton type="submit">Save Logo</AppButton>
        </form>
      </Form>
    );
  },
};
