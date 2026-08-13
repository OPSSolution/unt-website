import { z } from "zod";

export const idParamsSchema = z.object({ id: z.string().uuid() });
export const sectionParamsSchema = z.object({
  key: z.string().min(1).max(100).regex(/^[a-z0-9_-]+$/i),
});

export const nonEmptyString = z.string().trim().min(1);

const ALLOWED_IMAGE_ORIGINS = [
  "ik.imagekit.io",
  "imagekit.io",
  "res.cloudinary.com",
  "images.unsplash.com",
  "upload.wikimedia.org",
  "dcplvklbigmtkyjdioez.supabase.co",
];

export const mediaUrlSchema = z.string().trim().refine(
  (value) => {
    if (value === "") return true; // allow empty (clearable fields)
    try {
      const { hostname } = new URL(value);
      return ALLOWED_IMAGE_ORIGINS.some((origin) => hostname === origin || hostname.endsWith(`.${origin}`));
    } catch {
      return false;
    }
  },
  { message: "Image URL must be from ImageKit, Cloudinary, or another approved host." },
);
