import { z } from "zod";

const UserSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  role: z.enum(["admin", "user"]).default("user"),
  isBlocked: z.boolean().default(false),
});

export const userValidation = {
  UserSchema,
};
