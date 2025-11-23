import {z} from "zod"

export const emailSchema = z.string().trim().email("Invalid email").min(6).max(128);
export const passwordSchema = z.string().trim().min(6).max(32);

export const registerSchema = z.object({
    name: z.string().trim().min(3).max(128),
    email: emailSchema,
    password: passwordSchema,
    avatar: z.string().trim().optional(),
})

export const loginSchema = z.object({
    email: emailSchema,
    password: passwordSchema,
})

export type RegisterSchemaType = z.infer<typeof registerSchema>;
export type LoginSchemaType = z.infer<typeof loginSchema>;