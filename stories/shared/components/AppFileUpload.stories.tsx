import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { useState } from "react";
import AppFileUpload from "@/module/shared/components/AppFileUpload";

const meta = {
  title: "Shared/Components/AppFileUpload",
  component: AppFileUpload,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    placeholer: {
      control: "text",
      description: "Placeholder text when no file is selected",
    },
    accept: {
      control: "text",
      description: "File types to accept (e.g., '.jpg,.png,.pdf')",
    },
    uploadButtonLabel: {
      control: "text",
      description: "Label for the upload button",
    },
    changeButtonLabel: {
      control: "text",
      description: "Label for the change button when file is selected",
    },
  },
} satisfies Meta<typeof AppFileUpload>;

export default meta;
type Story = StoryObj<typeof meta>;

// Basic Stories
export const Default: Story = {
  args: {
    placeholer: "No file selected",
    uploadButtonLabel: "Upload",
    changeButtonLabel: "Change",
  },
};

export const WithFile: Story = {
  args: {
    placeholer: "No file selected",
    uploadButtonLabel: "Upload",
    changeButtonLabel: "Change",
    value: new File([""], "document.pdf", { type: "application/pdf" }),
  },
};

// Accept Types
export const ImagesOnly: Story = {
  args: {
    placeholer: "No image selected",
    uploadButtonLabel: "Upload Image",
    changeButtonLabel: "Change Image",
    accept: ".jpg,.jpeg,.png,.gif",
  },
};

export const DocumentsOnly: Story = {
  args: {
    placeholer: "No document selected",
    uploadButtonLabel: "Upload Document",
    changeButtonLabel: "Change Document",
    accept: ".pdf,.doc,.docx,.txt",
  },
};

export const VideosOnly: Story = {
  args: {
    placeholer: "No video selected",
    uploadButtonLabel: "Upload Video",
    changeButtonLabel: "Change Video",
    accept: ".mp4,.mov,.avi,.mkv",
  },
};

// Custom Labels
export const CustomLabels: Story = {
  args: {
    placeholer: "Drag and drop or click to select a file",
    uploadButtonLabel: "Browse Files",
    changeButtonLabel: "Replace File",
  },
};

// Interactive Examples
export const Interactive: Story = {
  render: (args) => {
    const [file, setFile] = useState<File | undefined>();

    return <AppFileUpload {...args} value={file} onChange={setFile} />;
  },
  args: {
    placeholer: "No file selected",
    uploadButtonLabel: "Upload",
    changeButtonLabel: "Change",
  },
};

export const InteractiveWithImagePreview: Story = {
  render: (args) => {
    const [file, setFile] = useState<File | undefined>();
    const [preview, setPreview] = useState<string | null>(null);

    const handleFileChange = (newFile?: File) => {
      setFile(newFile);
      if (newFile && newFile.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = (e) => setPreview(e.target?.result as string);
        reader.readAsDataURL(newFile);
      } else {
        setPreview(null);
      }
    };

    return (
      <div className="space-y-4">
        <AppFileUpload
          {...args}
          value={file}
          onChange={handleFileChange}
          accept=".jpg,.jpeg,.png,.gif"
        />
        {preview && (
          <div className="mt-4">
            <p className="mb-2 text-sm text-gray-600">Preview:</p>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={preview}
              alt="Preview"
              className="max-h-48 max-w-xs rounded border"
            />
          </div>
        )}
      </div>
    );
  },
  args: {
    placeholer: "No image selected",
    uploadButtonLabel: "Upload Image",
    changeButtonLabel: "Change Image",
  },
};

// Multiple File Upload Examples
export const MultipleFileUploads: Story = {
  render: () => {
    const [avatarFile, setAvatarFile] = useState<File | undefined>();
    const [documentFile, setDocumentFile] = useState<File | undefined>();

    return (
      <div className="w-96 space-y-6">
        <div>
          <label className="mb-2 block text-sm font-medium">
            Profile Picture
          </label>
          <AppFileUpload
            value={avatarFile}
            onChange={setAvatarFile}
            placeholer="Upload your profile picture"
            uploadButtonLabel="Upload"
            changeButtonLabel="Change"
            accept=".jpg,.jpeg,.png"
          />
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium">Resume</label>
          <AppFileUpload
            value={documentFile}
            onChange={setDocumentFile}
            placeholer="Upload your resume"
            uploadButtonLabel="Upload"
            changeButtonLabel="Change"
            accept=".pdf,.doc,.docx"
          />
        </div>
      </div>
    );
  },
};

// Different File Types Demo
export const DifferentFileTypes: Story = {
  render: () => {
    return (
      <div className="space-y-4">
        <AppFileUpload
          placeholer="Image file selected"
          uploadButtonLabel="Upload"
          changeButtonLabel="Change"
          value={new File([""], "photo.jpg", { type: "image/jpeg" })}
        />
        <AppFileUpload
          placeholer="Document file selected"
          uploadButtonLabel="Upload"
          changeButtonLabel="Change"
          value={new File([""], "report.pdf", { type: "application/pdf" })}
        />
        <AppFileUpload
          placeholer="Video file selected"
          uploadButtonLabel="Upload"
          changeButtonLabel="Change"
          value={new File([""], "presentation.mp4", { type: "video/mp4" })}
        />
      </div>
    );
  },
};

// Container Width Testing
export const MaxWidthContainer: Story = {
  render: (args) => {
    const [file, setFile] = useState<File | undefined>(
      new File(
        [""],
        "very-long-filename-that-should-be-truncated-with-line-clamp-to-test-overflow-behavior.pdf",
        { type: "application/pdf" },
      ),
    );

    return (
      <div className="max-w-xs rounded border border-gray-300 p-4">
        <p className="mb-2 text-sm text-gray-600">
          Max width container (max-w-xs):
        </p>
        <AppFileUpload {...args} value={file} onChange={setFile} />
      </div>
    );
  },
  args: {
    placeholer: "No file selected",
    uploadButtonLabel: "Upload",
    changeButtonLabel: "Change",
  },
};

// Error States (if you want to add error handling later)
export const LongFileName: Story = {
  args: {
    placeholer: "No file selected",
    uploadButtonLabel: "Upload",
    changeButtonLabel: "Change",
    value: new File(
      [""],
      "very-long-filename-that-might-overflow-the-container-width.pdf",
      { type: "application/pdf" },
    ),
  },
};
