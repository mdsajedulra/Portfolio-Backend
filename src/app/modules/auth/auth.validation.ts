import { z } from "zod";

const loginValidationSchema = z.object({
  email: z.string({ error: "Email is Required!!" }).email(),
  password: z.string({ error: "Password Required" }),
});

const changePasswordValidationSchema = z.object({
  oldPassword: z.string({
    error: "Old password is required",
  }),
  newPassword: z.string({ error: "Password is required" }),
});

export const authValidation = {
  loginValidationSchema,
  changePasswordValidationSchema,
};
