import * as z from "zod/v4";

export const LoginSchema = z.object({
  username: z
    .string()
    .toLowerCase()
    .min(4, {
      message: "Username must be at least 4 characters.",
    })
    .max(12, {
      message: "Username must be less than 12 characters.",
    })
    .regex(/^[a-zA-Z0-9]+$/, {
      message: "Username can only contain letters and numbers.",
    }),
  password: z
    .string()
    .min(8, {
      message: "Password must be at least 8 characters long",
    })
    .max(24, {
      message: "Password must be less than 24 characters.",
    }),
  rememberMe: z.optional(z.boolean()),
});

export const RegistSchema = z.object({
  email: z.email(),
  username: z
    .string()
    .toLowerCase()
    .min(4, {
      message: "Username must be at least 4 characters.",
    })
    .max(12, {
      message: "Username must be less than 12 characters.",
    })
    .regex(/^[a-zA-Z0-9]+$/, {
      message: "Username can only contain letters and numbers.",
    }),
  password: z
    .string()
    .min(8, {
      message: "Password must be at least 8 characters long",
    })
    .max(24, {
      message: "Password must be less than 24 characters.",
    }),
  nickName: z
    .string()
    .min(4, {
      message: "Nickname must be at least 4 characters long",
    })
    .max(20, {
      message: "Nickname must be less than 20 characters.",
    })
    .regex(/^[a-zA-Z0-9]+$/, {
      message: "Nickname can only contain letters and numbers.",
    }),
});

export type LoginSchema = z.infer<typeof LoginSchema>;
export type RegistSchema = z.infer<typeof RegistSchema>;