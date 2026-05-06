import { z } from "zod";

const hexColorRegex = /^#[0-9A-Fa-f]{6}$/;

export const labelFormSchema = z.object({
  name: z.string().trim().min(1, "Label name is required"),
  color: z.string().regex(hexColorRegex, "Text color must be a valid hex color"),
  background: z
    .string()
    .regex(hexColorRegex, "Background color must be a valid hex color"),
});

export type LabelFormData = z.infer<typeof labelFormSchema>;
