import { z } from "zod";

export const idParamsSchema = z.object({ id: z.string().uuid() });
export const sectionParamsSchema = z.object({
  key: z.string().min(1).max(100).regex(/^[a-z0-9_-]+$/i),
});

export const nonEmptyString = z.string().trim().min(1);
