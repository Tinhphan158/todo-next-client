import { z } from "zod";

export const workspaceFormSchema = z.object({
  name: z.string().trim().min(1, "Workspace name is required"),
});

export type WorkspaceFormData = z.infer<typeof workspaceFormSchema>;
