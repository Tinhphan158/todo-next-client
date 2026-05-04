import * as React from "react";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { FormFileUploadField } from "@/module/shared/components/AppFormFileUpload";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { AppButton } from "@/module/shared/components/AppButton";

const meta = {
  title: "Shared/Components/AppFormFileUpload",
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
        file: undefined as File | undefined,
      },
    });

    return (
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit((data) =>
            alert(
              JSON.stringify(
                {
                  fileName: data.file?.name,
                  fileSize: data.file?.size,
                  fileType: data.file?.type,
                },
                null,
                2,
              ),
            ),
          )}
          className="space-y-4"
        >
          <FormFileUploadField
            control={form.control}
            name="file"
            label="Upload File"
            placeholer="No file selected"
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
        file: undefined as File | undefined,
      },
    });

    return (
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit((data) =>
            alert(
              JSON.stringify(
                {
                  fileName: data.file?.name,
                  fileSize: data.file?.size,
                  fileType: data.file?.type,
                },
                null,
                2,
              ),
            ),
          )}
          className="space-y-4"
        >
          <FormFileUploadField
            control={form.control}
            name="file"
            label="Upload File"
            placeholer="No file selected"
            uploadButtonLabel="Upload"
            changeButtonLabel="Change"
            rules={{
              required: "File is required",
              validate: {
                fileSize: (file) =>
                  !file ||
                  file.size <= 5000000 ||
                  "File size must be less than 5MB",
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
        file: undefined as File | undefined,
      },
    });

    return (
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit((data) =>
            alert(
              JSON.stringify(
                {
                  fileName: data.file?.name,
                  fileSize: data.file?.size,
                  fileType: data.file?.type,
                },
                null,
                2,
              ),
            ),
          )}
          className="space-y-4"
        >
          <FormFileUploadField
            control={form.control}
            name="file"
            label="Upload Document"
            placeholer="No document selected"
            uploadButtonLabel="Upload"
            changeButtonLabel="Change"
            helperText="Accepted file types: PDF, DOC, DOCX (max 5MB)"
            accept=".pdf,.doc,.docx"
          />
          <AppButton type="submit">Submit</AppButton>
        </form>
      </Form>
    );
  },
};

export const ImageUpload: Story = {
  render: function ImageUploadRender() {
    const form = useForm({
      defaultValues: {
        image: undefined as File | undefined,
      },
    });

    return (
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit((data) =>
            alert(
              JSON.stringify(
                {
                  fileName: data.file?.name,
                  fileSize: data.file?.size,
                  fileType: data.file?.type,
                },
                null,
                2,
              ),
            ),
          )}
          className="space-y-4"
        >
          <FormFileUploadField
            control={form.control}
            name="image"
            label="Upload Image"
            placeholer="No image selected"
            uploadButtonLabel="Upload Image"
            changeButtonLabel="Change Image"
            accept=".jpg,.jpeg,.png,.gif"
            rules={{
              required: "Image is required",
              validate: {
                fileType: (file) =>
                  !file ||
                  file.type.startsWith("image/") ||
                  "File must be an image",
              },
            }}
          />
          <AppButton type="submit">Submit</AppButton>
        </form>
      </Form>
    );
  },
};

export const DocumentUpload: Story = {
  render: function DocumentUploadRender() {
    const form = useForm({
      defaultValues: {
        document: undefined as File | undefined,
      },
    });

    return (
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit((data) =>
            alert(
              JSON.stringify(
                {
                  fileName: data.file?.name,
                  fileSize: data.file?.size,
                  fileType: data.file?.type,
                },
                null,
                2,
              ),
            ),
          )}
          className="space-y-4"
        >
          <FormFileUploadField
            control={form.control}
            name="document"
            label="Upload Resume"
            placeholer="No resume selected"
            uploadButtonLabel="Upload Resume"
            changeButtonLabel="Change Resume"
            accept=".pdf,.doc,.docx"
            helperText="Upload your resume in PDF or DOC format"
            rules={{
              required: "Resume is required",
            }}
          />
          <AppButton type="submit">Submit</AppButton>
        </form>
      </Form>
    );
  },
};

export const MultipleFileUploads: Story = {
  render: function MultipleFileUploadsRender() {
    const form = useForm({
      defaultValues: {
        avatar: undefined as File | undefined,
        resume: undefined as File | undefined,
        coverLetter: undefined as File | undefined,
      },
    });

    return (
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit((data) =>
            alert(
              JSON.stringify(
                {
                  avatar: data.avatar?.name,
                  resume: data.resume?.name,
                  coverLetter: data.coverLetter?.name,
                },
                null,
                2,
              ),
            ),
          )}
          className="space-y-4"
        >
          <FormFileUploadField
            control={form.control}
            name="avatar"
            label="Profile Picture"
            placeholer="No image selected"
            uploadButtonLabel="Upload"
            changeButtonLabel="Change"
            accept=".jpg,.jpeg,.png"
            rules={{ required: "Profile picture is required" }}
          />
          <FormFileUploadField
            control={form.control}
            name="resume"
            label="Resume"
            placeholer="No resume selected"
            uploadButtonLabel="Upload"
            changeButtonLabel="Change"
            accept=".pdf,.doc,.docx"
            rules={{ required: "Resume is required" }}
          />
          <FormFileUploadField
            control={form.control}
            name="coverLetter"
            label="Cover Letter (Optional)"
            placeholer="No cover letter selected"
            uploadButtonLabel="Upload"
            changeButtonLabel="Change"
            accept=".pdf,.doc,.docx"
          />
          <AppButton type="submit">Submit Application</AppButton>
        </form>
      </Form>
    );
  },
};

export const WithPreloadedFile: Story = {
  render: function WithPreloadedFileRender() {
    const form = useForm({
      defaultValues: {
        file: new File([""], "existing-document.pdf", {
          type: "application/pdf",
        }),
      },
    });

    return (
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit((data) =>
            alert(
              JSON.stringify(
                {
                  fileName: data.file?.name,
                  fileSize: data.file?.size,
                  fileType: data.file?.type,
                },
                null,
                2,
              ),
            ),
          )}
          className="space-y-4"
        >
          <FormFileUploadField
            control={form.control}
            name="file"
            label="Upload Document"
            placeholer="No document selected"
            uploadButtonLabel="Upload"
            changeButtonLabel="Change"
            helperText="A file is already uploaded. You can change it if needed."
          />
          <AppButton type="submit">Submit</AppButton>
        </form>
      </Form>
    );
  },
};
