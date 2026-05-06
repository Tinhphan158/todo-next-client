import { z } from "zod";
import { PASSWORD_MIN_LENGTH } from "../constants";

export const loginSchema = z.object({
  email: z
    .string()
    .regex(
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
      "Invalid email address",
    )
    .refine((email) => {
      const domain = email.split("@")[1];
      return domain && domain.includes(".");
    }, "Invalid email address"),
  password: z
    .string()
    .min(PASSWORD_MIN_LENGTH, "Password must be at least 6 characters")
    .regex(
      /(?=.*[0-9])(?=.*[a-zA-Z])/,
      "Password must contain at least one number and one letter",
    ),
});

export type LoginFormData = z.infer<typeof loginSchema>;
