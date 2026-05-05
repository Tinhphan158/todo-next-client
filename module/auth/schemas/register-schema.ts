import { z } from "zod";
import { PASSWORD_MIN_LENGTH } from "../constants";

export const useRegisterSchema = () =>
  z
    .object({
      name: z
        .string()
        .min(2, "Name must be at least 2 characters"),
      email: z
        .string()
        .regex(
          /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
          "Invalid email address",
        )
        .refine((email: string) => {
          const domain = email.split("@")[1];
          return domain && domain.includes(".");
        }, "Invalid email address"),
      password: z
        .string()
        .min(
          PASSWORD_MIN_LENGTH,
          `Password must be at least ${PASSWORD_MIN_LENGTH} characters`,
        )
        .regex(
          /(?=.*[0-9])(?=.*[a-zA-Z])/,
          "Password must contain at least one number and one letter",
        ),
      confirmPassword: z.string().min(1, "Confirm password is required"),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords do not match",
      path: ["confirmPassword"],
    });

export type RegisterFormData = z.infer<ReturnType<typeof useRegisterSchema>>;
