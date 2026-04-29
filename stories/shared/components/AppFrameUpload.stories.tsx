import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { useState } from "react";
import AppFrameUpload from "@/module/shared/components/AppFrameUpload";

const meta = {
  title: "Shared/Components/AppFrameUpload",
  component: AppFrameUpload,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    label: {
      control: "text",
      description: "Placeholder text when no file is selected",
    },
    uploadButtonLabel: {
      control: "text",
      description: "Label for the upload button",
    },
    changeButtonLabel: {
      control: "text",
      description: "Label for the change button when image is selected",
    },
    accept: {
      control: "text",
      description: "File types to accept (e.g., 'image/*', '.jpg,.png')",
    },
    aspect: {
      control: "radio",
      options: ["video", "square"],
      description: "Aspect ratio for the image preview",
    },
    showDeleteButton: {
      control: "boolean",
      description: "Show delete button when image is selected",
    },
  },
} satisfies Meta<typeof AppFrameUpload>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "Upload an image",
    uploadButtonLabel: "Upload",
    changeButtonLabel: "Change",
  },
};

export const WithError: Story = {
  args: {
    label: "Upload an image",
    uploadButtonLabel: "Upload",
    changeButtonLabel: "Change",
    error: true,
  },
};

export const WithImage: Story = {
  args: {
    label: "Upload an image",
    uploadButtonLabel: "Upload",
    changeButtonLabel: "Change",
    value: { file: new File([""], "example.jpg", { type: "image/jpeg" }) },
  },
};

export const WithSquareImage: Story = {
  args: {
    label: "Upload an image",
    uploadButtonLabel: "Upload",
    changeButtonLabel: "Change",
    aspect: "square",
    value: { file: new File([""], "example.jpg", { type: "image/jpeg" }) },
  },
};

export const WithDeleteButton: Story = {
  args: {
    label: "Upload an image",
    uploadButtonLabel: "Upload",
    changeButtonLabel: "Change",
    showDeleteButton: true,
    value: { file: new File([""], "example.jpg", { type: "image/jpeg" }) },
  },
};

export const WithImageError: Story = {
  args: {
    label: "Upload an image",
    uploadButtonLabel: "Upload",
    changeButtonLabel: "Change",
    value: { file: new File([""], "example.jpg", { type: "image/jpeg" }) },
    error: true,
  },
};

export const WithPNGImage: Story = {
  args: {
    label: "Upload a PNG image",
    uploadButtonLabel: "Upload PNG",
    changeButtonLabel: "Change PNG",
    accept: ".png,image/png",
    value: { file: new File([""], "example.png", { type: "image/png" }) },
  },
};

export const CustomLabels: Story = {
  args: {
    label: "Drop your cover image here",
    uploadButtonLabel: "Select Image",
    changeButtonLabel: "Replace Image",
  },
};

export const Interactive: Story = {
  render: (args) => {
    const [value, setValue] = useState<
      { file?: File; url?: string } | undefined
    >();

    return <AppFrameUpload {...args} value={value} onChange={setValue} />;
  },
  args: {
    label: "Upload an image",
    uploadButtonLabel: "Upload",
    changeButtonLabel: "Change",
  },
};

export const MultipleFrames: Story = {
  render: () => {
    const [coverFile, setCoverFile] = useState<
      { file?: File; url?: string } | undefined
    >();
    const [profileFile, setProfileFile] = useState<
      { file?: File; url?: string } | undefined
    >();

    return (
      <div className="space-y-6">
        <div>
          <label className="mb-2 block text-sm font-medium">Cover Image</label>
          <AppFrameUpload
            value={coverFile}
            onChange={setCoverFile}
            label="Upload cover image"
            uploadButtonLabel="Upload"
            changeButtonLabel="Change"
          />
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium">
            Profile Picture
          </label>
          <AppFrameUpload
            value={profileFile}
            onChange={setProfileFile}
            label="Upload profile picture"
            uploadButtonLabel="Upload"
            changeButtonLabel="Change"
          />
        </div>
      </div>
    );
  },
};

export const WithPreloadedImage: Story = {
  render: () => {
    const [file, setFile] = useState<{ file?: File; url?: string } | undefined>(
      {
        file: new File([""], "preloaded-image.jpg", { type: "image/jpeg" }),
      },
    );

    return (
      <AppFrameUpload
        value={file}
        onChange={setFile}
        label="Upload an image"
        uploadButtonLabel="Upload"
        changeButtonLabel="Change"
      />
    );
  },
};
