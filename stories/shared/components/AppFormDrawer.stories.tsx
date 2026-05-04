import { Form } from "@/components/ui/form";
import { BaseFormProps } from "@/lib/form";
import { AppButton } from "@/module/shared/components/AppButton";
import AppFormDrawer from "@/module/shared/components/AppFormDrawer";
import { FormInputFieldV2 } from "@/module/shared/components/AppFormInput";
import { FormTextAreaField } from "@/module/shared/components/AppFormTextArea";
import { standardSchemaResolver } from "@hookform/resolvers/standard-schema";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

// Mock form data type
interface MockFormData {
  name: string;
  email: string;
  description: string;
}

// Mock form schema
const mockFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  description: z.string().min(10, "Description must be at least 10 characters"),
});

const MockForm = ({
  id,
  initialData,
  disabled,
  onSubmit,
  onStateChange,
}: BaseFormProps<MockFormData>) => {
  const form = useForm<MockFormData>({
    resolver: standardSchemaResolver(mockFormSchema),
    defaultValues: initialData || {
      name: "",
      email: "",
      description: "",
    },
    mode: "onChange",
  });

  const { isDirty, isValid, isSubmitting } = form.formState;

  useEffect(() => {
    onStateChange?.({
      isDirty,
      isValid,
      isSubmitting,
    });
  }, [isDirty, isValid, isSubmitting, onStateChange]);

  const handleSubmit = async (data: MockFormData) => {
    await onSubmit?.(data);
  };

  return (
    <Form {...form}>
      <form
        id={id}
        className="flex flex-col gap-4 p-6"
        onSubmit={form.handleSubmit(handleSubmit)}
      >
        <FormInputFieldV2
          control={form.control}
          name="name"
          label="Name"
          placeholder="Enter your name"
          disabled={disabled}
        />
        <FormInputFieldV2
          control={form.control}
          name="email"
          label="Email"
          placeholder="Enter your email"
          disabled={disabled}
        />
        <FormTextAreaField
          control={form.control}
          name="description"
          label="Description"
          placeholder="Enter a description"
          disabled={disabled}
          rows={4}
        />
      </form>
    </Form>
  );
};

const meta = {
  title: "Shared/Components/AppFormDrawer",
  component: AppFormDrawer,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    mode: {
      control: { type: "select" },
      options: ["view", "create", "update"],
      description: "The mode of the form drawer",
    },
    open: {
      control: "boolean",
      description: "Whether the drawer is open",
    },
    title: {
      control: "text",
      description: "Title displayed in the drawer header",
    },
    showDelete: {
      control: "boolean",
      description: "Whether to show delete button in view mode",
    },
    createConfirmTitle: {
      control: "text",
      description: "Confirmation title for create action",
    },
    updateConfirmTitle: {
      control: "text",
      description: "Confirmation title for update action",
    },
    deleteConfirmTitle: {
      control: "text",
      description: "Confirmation title for delete action",
    },
    closeConfirmTitle: {
      control: "text",
      description: "Confirmation title for closing dirty form",
    },
    initialData: {
      control: false,
    },
    children: {
      control: false,
    },
    onOpenChange: {
      control: false,
    },
    onModeChange: {
      control: false,
    },
    onSubmit: {
      control: false,
    },
    onDelete: {
      control: false,
    },
  },
} satisfies Meta<typeof AppFormDrawer>;

export default meta;
type Story = StoryObj<typeof meta>;

// Mock initial data for view/update modes
const mockInitialData: MockFormData = {
  name: "John Doe",
  email: "john.doe@example.com",
  description: "This is a sample description for the form drawer story.",
};

// Closed state (useful for testing)
export const Closed: Story = {
  args: {
    open: false,
    mode: "view",
    title: "View User",
    formId: "mock-form",
    children: <MockForm />,
    onOpenChange: () => {},
    onModeChange: () => {},
    onSubmit: async () => {},
  },
};

// View Mode - Default with delete button
export const ViewMode: Story = {
  args: {
    open: true,
    mode: "view",
    title: "View User",
    formId: "mock-form",
    initialData: mockInitialData,
    deleteConfirmTitle: "Are you sure you want to delete this user?",
    children: <MockForm />,
    onOpenChange: () => {},
    onModeChange: (mode) => {
      console.log("Mode changed to:", mode);
    },
    onSubmit: async (data) => {
      alert(JSON.stringify(data, null, 2));
    },
    onDelete: async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      alert("User deleted successfully!");
    },
  },
};

// View Mode - Without delete button
export const ViewModeWithoutDelete: Story = {
  args: {
    open: true,
    mode: "view",
    title: "View User (No Delete)",
    formId: "mock-form",
    initialData: mockInitialData,
    showDelete: false,
    children: <MockForm />,
    onOpenChange: () => {},
    onModeChange: (mode) => {
      console.log("Mode changed to:", mode);
    },
    onSubmit: async (data) => {
      alert(JSON.stringify(data, null, 2));
    },
  },
};

// Create Mode
export const CreateMode: Story = {
  args: {
    open: true,
    mode: "create",
    title: "Create New User",
    formId: "mock-form",
    createConfirmTitle: "Are you sure you want to create this user?",
    children: <MockForm />,
    onOpenChange: () => {},
    onModeChange: (mode) => {
      console.log("Mode changed to:", mode);
    },
    onSubmit: async (data) => {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      alert(JSON.stringify(data, null, 2));
    },
  },
};

// Update Mode
export const UpdateMode: Story = {
  args: {
    open: true,
    mode: "update",
    title: "Update User",
    formId: "mock-form",
    initialData: mockInitialData,
    updateConfirmTitle: "Are you sure you want to update this user?",
    children: <MockForm />,
    onOpenChange: () => {},
    onModeChange: (mode) => {
      console.log("Mode changed to:", mode);
    },
    onSubmit: async (data) => {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      alert(JSON.stringify(data, null, 2));
    },
  },
};

// Controlled State Example - Full workflow demonstration
export const ControlledStateWorkflow: Story = {
  render: function ControlledStateWorkflowRender() {
    const [open, setOpen] = useState(false);
    const [mode, setMode] = useState<"view" | "create" | "update">("view");
    const [data, setData] = useState<MockFormData | undefined>(mockInitialData);

    const handleOpenChange = (newOpen: boolean) => {
      setOpen(newOpen);
      if (!newOpen) {
        // Reset to view mode when closing
        setTimeout(() => setMode("view"), 300);
      }
    };

    const handleModeChange = (newMode: "view" | "create" | "update") => {
      setMode(newMode);
    };

    const handleSubmit = async (formData: MockFormData) => {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setData(formData);
      alert(JSON.stringify(formData, null, 2));
    };

    const handleDelete = async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setData(undefined);
      alert("User deleted successfully!");
    };

    return (
      <div className="space-y-4">
        <div className="flex gap-2">
          <AppButton
            onClick={() => {
              setMode("view");
              setOpen(true);
            }}
          >
            View User
          </AppButton>
          <AppButton
            variant="secondary"
            onClick={() => {
              setMode("create");
              setData(undefined);
              setOpen(true);
            }}
          >
            Create User
          </AppButton>
          <AppButton
            variant="secondary"
            onClick={() => {
              setMode("update");
              setOpen(true);
            }}
          >
            Update User
          </AppButton>
        </div>

        <div className="text-sm">
          <p>
            <strong>Current State:</strong>
          </p>
          <p>Open: {open ? "true" : "false"}</p>
          <p>Mode: {mode}</p>
          <p>Has Data: {data ? "true" : "false"}</p>
        </div>

        <AppFormDrawer
          open={open}
          mode={mode}
          title={
            mode === "view"
              ? "View User"
              : mode === "create"
                ? "Create New User"
                : "Update User"
          }
          formId="controlled-form"
          initialData={data}
          createConfirmTitle="Are you sure you want to create this user?"
          updateConfirmTitle="Are you sure you want to update this user?"
          deleteConfirmTitle="Are you sure you want to delete this user?"
          onOpenChange={handleOpenChange}
          onModeChange={handleModeChange}
          onSubmit={handleSubmit}
          onDelete={handleDelete}
        >
          <MockForm />
        </AppFormDrawer>
      </div>
    );
  },
};

// Delete Action With Loading State
export const DeleteWithLoading: Story = {
  render: function DeleteWithLoadingRender() {
    const [open, setOpen] = useState(true);

    return (
      <AppFormDrawer
        open={open}
        mode="view"
        title="Delete User Demo"
        formId="delete-form"
        initialData={mockInitialData}
        deleteConfirmTitle="This action cannot be undone. Are you sure?"
        onOpenChange={setOpen}
        onSubmit={async () => {}}
        onDelete={async () => {
          await new Promise((resolve) => setTimeout(resolve, 3000));
          alert("User deleted successfully!");
        }}
      >
        <MockForm />
      </AppFormDrawer>
    );
  },
};

// Custom Confirmation Titles
export const WithCustomConfirmTitles: Story = {
  args: {
    open: true,
    mode: "create",
    title: "Add New Team Member",
    formId: "mock-form",
    createConfirmTitle: "Save team member to the database?",
    updateConfirmTitle: "Update team member information?",
    deleteConfirmTitle: "Remove this team member permanently?",
    children: <MockForm />,
    onOpenChange: () => {},
    onModeChange: () => {},
    onSubmit: async (data) => {
      alert(JSON.stringify(data, null, 2));
    },
    onDelete: async () => {
      alert("Item deleted!");
    },
  },
};

// Empty Form (Create Mode)
export const EmptyForm: Story = {
  args: {
    open: true,
    mode: "create",
    title: "Create New User",
    formId: "mock-form",
    createConfirmTitle: "Create this user?",
    children: <MockForm />,
    onOpenChange: () => {},
    onSubmit: async (data) => {
      alert(JSON.stringify(data, null, 2));
    },
  },
};

// Pre-filled Form (Update Mode)
export const PrefilledForm: Story = {
  args: {
    open: true,
    mode: "update",
    title: "Edit User Profile",
    formId: "mock-form",
    initialData: {
      name: "Jane Smith",
      email: "jane.smith@company.com",
      description:
        "Senior software engineer with 10 years of experience in web development.",
    },
    updateConfirmTitle: "Save changes to user profile?",
    children: <MockForm />,
    onOpenChange: () => {},
    onSubmit: async (data) => {
      alert(JSON.stringify(data, null, 2));
    },
  },
};

// Loading State Demo
export const LoadingState: Story = {
  args: {
    open: true,
    mode: "view",
    title: "Loading User Data",
    formId: "loading-form",
    isLoading: true,
    children: <MockForm />,
    onOpenChange: () => {},
    onModeChange: () => {},
    onSubmit: async () => {},
  },
};

// View to Update Mode Transition
export const ViewToUpdateTransition: Story = {
  render: function ViewToUpdateTransitionRender() {
    const [mode, setMode] = useState<"view" | "create" | "update">("view");

    return (
      <div className="space-y-4">
        <div className="text-sm">
          <p>
            <strong>Demo:</strong> Click &quot;Edit&quot; button in view mode to
            switch to update mode
          </p>
          <p>Current Mode: {mode}</p>
        </div>

        <AppFormDrawer
          open={true}
          mode={mode}
          title={mode === "view" ? "View User" : "Update User"}
          formId="transition-form"
          initialData={mockInitialData}
          updateConfirmTitle="Save changes?"
          deleteConfirmTitle="Delete user?"
          onOpenChange={() => {}}
          onModeChange={setMode}
          onSubmit={async (data) => {
            await new Promise((resolve) => setTimeout(resolve, 1000));
            alert(JSON.stringify(data, null, 2));
            setMode("view");
          }}
          onDelete={async () => {
            await new Promise((resolve) => setTimeout(resolve, 1000));
            alert("User deleted!");
          }}
        >
          <MockForm />
        </AppFormDrawer>
      </div>
    );
  },
};

// Custom Close Confirm Title
export const WithCustomCloseConfirmTitle: Story = {
  args: {
    open: true,
    mode: "update",
    title: "Edit User Profile",
    formId: "close-confirm-form",
    initialData: {
      name: "John Doe",
      email: "john.doe@example.com",
      description: "This is a sample user profile.",
    },
    updateConfirmTitle: "Save changes to profile?",
    closeConfirmTitle:
      "You have unsaved changes. Do you want to save them before leaving?",
    children: <MockForm />,
    onOpenChange: () => {},
    onModeChange: () => {},
    onSubmit: async (data) => {
      alert(JSON.stringify(data, null, 2));
    },
  },
};
