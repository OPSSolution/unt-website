import { z } from "zod";
import { nonEmptyString } from "./common.js";

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
  shelf_life: nonEmptyString.optional(),
});

export const articleSchema = z.object({
  title: nonEmptyString,
  category: z.enum(["Market Trends", "Regulatory Updates", "Supply Chain", "Retail Strategy", "OEM Case Studies"]),
  date: nonEmptyString,
  read_time: nonEmptyString,
  author_name: nonEmptyString,
  author_role: nonEmptyString,
  author_avatar: nonEmptyString,
  image: nonEmptyString,
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
  image: nonEmptyString.optional(),
  description: nonEmptyString.optional(),
});

export const heroContentSchema = z.object({
  id: z.string().uuid(),
  badge_text: nonEmptyString,
  headline: nonEmptyString,
  subtitle: nonEmptyString,
  cta_primary: nonEmptyString,
  cta_secondary: nonEmptyString,
  feature_image: nonEmptyString.optional(),
});

export const heroStatSchema = z.object({
  label: nonEmptyString,
  value: nonEmptyString,
  sort_order: z.number().int().nonnegative(),
});

export const homepageSectionSchema = z.record(z.string(), z.unknown());
