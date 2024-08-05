import z from "zod";

export const signupInput = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  name: z.string().min(3),
});

export const signinInput = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const updateUserDetailsInput = z.object({
  name: z.string().optional(),
  password: z.string().min(6).optional(),
});

export const createBlogInput = z.object({
  title: z.string(),
  content: z.string(),
  published: z.boolean().optional(),
});

export const updateBlogInput = z.object({
  id: z.string(),
  title: z.string(),
  content: z.string(),
  published: z.boolean().optional(),
});

export type SignupType = z.infer<typeof signupInput>;
export type SigninType = z.infer<typeof signinInput>;
export type UpdateUserDetailsType = z.infer<typeof updateUserDetailsInput>;
export type CreateBlogType = z.infer<typeof createBlogInput>;
export type UpdateBlogType = z.infer<typeof updateBlogInput>;
