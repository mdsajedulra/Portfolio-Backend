import { z } from "zod";

export const projectSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string(),
  longDescription: z.string(),
  image: z.string().url(),
  technologies: z.array(z.string()),
  github: z.string().url(),
  demo: z.string().url(),
  featured: z.boolean(),
  category: z.enum(["Frontend", "mobile", "design", "other", "Backend"]),
});
