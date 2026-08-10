import "dotenv/config";
import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  HOST: z.string().min(1).default("localhost"),
  PORT: z.coerce.number().int().min(1).max(65535).default(5000),
  SUPABASE_URL: z.string().url(),
  SUPABASE_SERVICE_ROLE_KEY: z.string().min(1),
  IMAGEKIT_PUBLIC_KEY: z.string().min(1).optional(),
  IMAGEKIT_PRIVATE_KEY: z.string().min(1).optional(),
  RESEND_API_KEY: z.string().min(1).optional(),
  QUOTE_EMAIL_TO: z.string().email().optional(),
  EMAIL_FROM: z.string().min(1).optional(),
  PUBLIC_SITE_URL: z.string().url().default("https://unt-website.onrender.com"),
  CORS_ORIGIN: z.string().min(1).default("*"),
}).superRefine((value, context) => {
  const configured = [value.IMAGEKIT_PUBLIC_KEY, value.IMAGEKIT_PRIVATE_KEY].filter(Boolean).length;
  if (configured !== 0 && configured !== 2) {
    context.addIssue({
      code: "custom",
      path: ["IMAGEKIT_PUBLIC_KEY"],
      message: "IMAGEKIT_PUBLIC_KEY and IMAGEKIT_PRIVATE_KEY must be configured together",
    });
  }
});

const result = envSchema.safeParse(process.env);

if (!result.success) {
  const details = result.error.issues
    .map((issue) => `${issue.path.join(".")}: ${issue.message}`)
    .join("; ");
  throw new Error(`Invalid environment configuration: ${details}`);
}

export const env = Object.freeze(result.data);
export type Env = z.infer<typeof envSchema>;
