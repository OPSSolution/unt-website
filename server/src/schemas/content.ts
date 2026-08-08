import { z } from "zod";
import { nonEmptyString } from "./common.js";

const optionalNonEmptyString = z.preprocess(
  (value) => value === "" ? undefined : value,
  nonEmptyString.optional(),
);

export const productSchema = z.object({
  name: nonEmptyString,
  category: z.enum(["Food & Beverage", "Skincare & Beauty", "Personal Care", "Health Supplements", "Household Goods"]),
  origin: nonEmptyString,
  origin_flag: nonEmptyString,
  moq: nonEmptyString,
  lead_time: nonEmptyString,
  image: nonEmptyString,
  description: nonEmptyString,
  oem_available: z.boolean(),
  specifications: z.array(nonEmptyString),
  certifications: z.array(nonEmptyString),
  shelf_life: optionalNonEmptyString,
});

export const articleSchema = z.object({
  title: nonEmptyString,
  category: z.enum(["Market Trends", "Regulatory Updates", "Supply Chain", "Retail Strategy", "OEM Case Studies"]),
  date: nonEmptyString,
  read_time: nonEmptyString,
  author_name: nonEmptyString,
  author_role: nonEmptyString,
  // Images can be cleared from the article editor. The database columns remain
  // non-null, so an empty string represents an intentionally removed image.
  author_avatar: z.string().trim(),
  image: z.string().trim(),
  excerpt: nonEmptyString,
  content: z.array(nonEmptyString).min(1),
  tags: z.array(nonEmptyString),
  featured: z.boolean().optional(),
});

export const partnerSchema = z.object({
  name: nonEmptyString,
  category: nonEmptyString,
  country: nonEmptyString,
  logo_text: nonEmptyString,
  image: optionalNonEmptyString,
  description: optionalNonEmptyString,
});

export const heroContentSchema = z.object({
  id: z.string().uuid(),
  badge_text: nonEmptyString,
  headline: nonEmptyString,
  subtitle: nonEmptyString,
  cta_primary: nonEmptyString,
  cta_secondary: nonEmptyString,
  feature_image: optionalNonEmptyString,
});

export const heroStatSchema = z.object({
  label: nonEmptyString,
  value: nonEmptyString,
  sort_order: z.number().int().nonnegative(),
});

export const homepageSectionSchema = z.record(z.string(), z.unknown());

export const quoteSubmissionSchema = z.object({
  serviceType: z.string().trim().min(1).max(200),
  productCategory: z.string().trim().min(1).max(300),
  originPreference: z.string().trim().min(1).max(200),
  estimatedVolume: z.string().trim().min(1).max(300),
  companyName: z.string().trim().min(1).max(200),
  contactName: z.string().trim().min(1).max(200),
  email: z.string().trim().email().max(200),
  phone: z.string().trim().min(1).max(100),
  notes: z.string().max(5000).default(""),
  language: z.enum(["en", "km"]).default("en"),
});

export const quoteStatusSchema = z.object({
  status: z.enum(["new", "in_progress", "completed"]),
});
