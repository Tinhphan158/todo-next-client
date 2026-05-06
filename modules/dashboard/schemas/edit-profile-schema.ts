import { z } from "zod";

export const editProfileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
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
  avatarFile: z.instanceof(File).optional(),
});

export type EditProfileFormData = z.infer<typeof editProfileSchema>;
