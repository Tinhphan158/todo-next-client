import { z } from "zod";
import { PASSWORD_MIN_LENGTH } from "../constants";

export const useForgotPasswordVerifyEmailSchema = () =>
  z.object({
    email: z
      .string()
      .min(1, "Email is required")
      .regex(
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
        "Invalid email address",
      )
      .refine((value) => {
        const domain = value.split("@")[1];
        return domain && domain.includes(".");
      }, "Invalid email address"),
  });

export type ForgotPasswordVerifyEmailFormData = z.infer<
  ReturnType<typeof useForgotPasswordVerifyEmailSchema>
>;

export const useForgotPasswordNewPasswordSchema = () =>
  z
    .object({
      password: z
        .string()
        .min(PASSWORD_MIN_LENGTH, "Password must be at least 8 characters")
        .regex(
          /(?=.*[0-9])(?=.*[a-zA-Z])/,
          "Password must contain at least one number and one letter",
        ),
      confirmPassword: z.string().min(1, "Confirm new password is required"),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords do not match",
      path: ["confirmPassword"],
    });

export type ForgotPasswordNewPasswordFormData = z.infer<
  ReturnType<typeof useForgotPasswordNewPasswordSchema>
>;
