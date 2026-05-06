import { z } from "zod";

export const verifySchema = z.object({
  code: z
    .string()
    .length(6, "Enter the 6-digit code")
    .regex(/^\d{6}$/, "Code must be 6 numbers"),
});

export type VerifyFormData = z.infer<typeof verifySchema>;
