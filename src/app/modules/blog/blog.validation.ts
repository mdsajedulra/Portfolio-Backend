import { z } from "zod";

export const blogPostSchema = z.object({
  id: z.number(),
  title: z.string(),
  excerpt: z.string(),
  content: z.string(),
  date: z.coerce.date(), // Converts string or number to Date object
  author: z.string(),
  category: z.string(),
  image: z.string().optional(),
  readingTime: z.number()
});