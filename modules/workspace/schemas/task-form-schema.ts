import { z } from "zod";

const TASK_STATUS_VALUES = ["TODO", "PENDING", "DONE", "CANCEL"] as const;
const TASK_PRIORITY_VALUES = ["Low", "Medium", "High"] as const;

export const taskFormSchema = z
  .object({
    title: z.string().trim().min(2, "Title must be at least 2 characters."),
    description: z.string().optional(),
    content: z.string().trim().min(1, "Content is required."),
    priority: z.enum(TASK_PRIORITY_VALUES).optional(),
    status: z.enum(TASK_STATUS_VALUES).optional(),
    labelIds: z.array(z.number().int()),
    startTime: z.string().datetime().optional(),
    endTime: z.string().datetime().optional(),
  })
  .refine(
    (data) => {
      if (!data.startTime || !data.endTime) return true;
      return new Date(data.endTime).getTime() >= new Date(data.startTime).getTime();
    },
    {
      message: "End time must be after start time.",
      path: ["endTime"],
    },
  );

export type TaskFormInput = z.input<typeof taskFormSchema>;
export type TaskFormData = z.output<typeof taskFormSchema>;
