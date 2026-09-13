import * as z from "zod/v4";

export const NickNameSchema = z.object({
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

export type NickNameInput = z.infer<typeof NickNameSchema>;