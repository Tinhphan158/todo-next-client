import { z } from "zod";

export const changePasswordSchema = z
  .object({
    currentPassword: z
      .string()
      .min(1, "Current password is required")
      .min(6, "Password must be at least 6 characters"),
    newPassword: z
      .string()
      .min(6, "Password must be at least 6 characters")
      .regex(
        /(?=.*[0-9])(?=.*[a-zA-Z])/,
        "Password must contain at least one number and one letter",
      ),
    confirmNewPassword: z
      .string()
      .min(1, "Confirm new password is required"),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "Passwords do not match",
    path: ["confirmNewPassword"],
  });

export type ChangePasswordFormData = z.infer<typeof changePasswordSchema>;
