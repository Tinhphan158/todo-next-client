import { z } from "zod";

export const useVerifySchema = () =>
  z.object({
    code: z
      .string()
      .length(6, "Enter the 6-digit code")
      .regex(/^\d{6}$/, "Code must be 6 numbers"),
  });

export type VerifyFormData = z.infer<ReturnType<typeof useVerifySchema>>;
