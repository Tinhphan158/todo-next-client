import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { FormTextAreaField } from "@/modules/shared/components/AppFormTextArea";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { AppButton } from "@/modules/shared/components/AppButton";

const meta = {
  title: "Shared/Components/AppFormTextArea",
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
        description: "",
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
          <FormTextAreaField
            control={form.control}
            name="description"
            label="Description"
            placeholder="Enter your description"
            rows={4}
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
        bio: "",
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
          <FormTextAreaField
            control={form.control}
            name="bio"
            label="Bio"
            placeholder="Tell us about yourself"
            helperText="Maximum 500 characters"
            rows={4}
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
        content: "",
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
          <FormTextAreaField
            control={form.control}
            name="content"
            label="Content"
            placeholder="Enter your content"
            rows={4}
            rules={{
              required: "Content is required",
              minLength: {
                value: 10,
                message: "Content must be at least 10 characters",
              },
            }}
          />
          <AppButton type="submit">Submit</AppButton>
        </form>
      </Form>
    );
  },
};

export const SizeLarge: Story = {
  render: function SizeLargeRender() {
    const form = useForm({
      defaultValues: {
        message: "",
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
          <FormTextAreaField
            control={form.control}
            name="message"
            label="Message"
            placeholder="Enter your message"
            size="L"
            rows={6}
          />
          <AppButton type="submit">Submit</AppButton>
        </form>
      </Form>
    );
  },
};

export const SizeMedium: Story = {
  render: function SizeMediumRender() {
    const form = useForm({
      defaultValues: {
        notes: "",
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
          <FormTextAreaField
            control={form.control}
            name="notes"
            label="Notes"
            placeholder="Add your notes"
            size="M"
            rows={4}
          />
          <AppButton type="submit">Submit</AppButton>
        </form>
      </Form>
    );
  },
};

export const SizeSmall: Story = {
  render: function SizeSmallRender() {
    const form = useForm({
      defaultValues: {
        comment: "",
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
          <FormTextAreaField
            control={form.control}
            name="comment"
            label="Comment"
            placeholder="Add a comment"
            size="S"
            rows={3}
          />
          <AppButton type="submit">Submit</AppButton>
        </form>
      </Form>
    );
  },
};

export const Disabled: Story = {
  render: function DisabledRender() {
    const form = useForm({
      defaultValues: {
        disabledField: "This field is disabled",
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
          <FormTextAreaField
            control={form.control}
            name="disabledField"
            label="Disabled Field"
            placeholder="Cannot edit this field"
            disabled
            rows={4}
          />
          <AppButton type="submit">Submit</AppButton>
        </form>
      </Form>
    );
  },
};

export const CompleteForm: Story = {
  render: function CompleteFormRender() {
    const form = useForm({
      defaultValues: {
        title: "",
        summary: "",
        description: "",
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
          <FormTextAreaField
            control={form.control}
            name="title"
            label="Title"
            placeholder="Enter a title"
            size="M"
            rows={2}
            rules={{ required: "Title is required" }}
          />
          <FormTextAreaField
            control={form.control}
            name="summary"
            label="Summary"
            placeholder="Brief summary"
            size="S"
            rows={2}
            helperText="Keep it short"
            rules={{ required: "Summary is required" }}
          />
          <FormTextAreaField
            control={form.control}
            name="description"
            label="Description"
            placeholder="Full description"
            size="L"
            rows={6}
            helperText="Provide detailed information"
            rules={{
              required: "Description is required",
              minLength: {
                value: 50,
                message: "Description must be at least 50 characters",
              },
            }}
          />
          <AppButton type="submit">Submit</AppButton>
        </form>
      </Form>
    );
  },
};
