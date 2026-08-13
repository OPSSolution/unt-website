import { Router } from "express";
import { z } from "zod";
import { env } from "../../config/env.js";
import { supabase } from "../../supabase.js";
import { validateBody } from "../../middleware/validate.js";

const router = Router();

export const REMOVE_BG_SETTING_KEY = "remove_bg_api_key";
export const IMAGEKIT_PUBLIC_KEY_SETTING = "imagekit_public_key";
export const IMAGEKIT_PRIVATE_KEY_SETTING = "imagekit_private_key";
export const CLOUDINARY_CLOUD_NAME_SETTING = "cloudinary_cloud_name";
export const CLOUDINARY_API_KEY_SETTING = "cloudinary_api_key";
export const CLOUDINARY_API_SECRET_SETTING = "cloudinary_api_secret";

const apiKeySchema = z.object({
  apiKey: z.string().trim().min(1).max(500),
});

export async function removeBgApiKey() {
  const { data } = await supabase
    .from("admin_settings")
    .select("value")
    .eq("key", REMOVE_BG_SETTING_KEY)
    .maybeSingle();

  return data?.value || env.REMOVE_BG_API_KEY;
}

export async function imagekitKeys() {
  const { data } = await supabase
    .from("admin_settings")
    .select("key, value")
    .in("key", [IMAGEKIT_PUBLIC_KEY_SETTING, IMAGEKIT_PRIVATE_KEY_SETTING]);

  const get = (k: string) => data?.find((r) => r.key === k)?.value;
  return {
    publicKey: get(IMAGEKIT_PUBLIC_KEY_SETTING) || env.IMAGEKIT_PUBLIC_KEY,
    privateKey: get(IMAGEKIT_PRIVATE_KEY_SETTING) || env.IMAGEKIT_PRIVATE_KEY,
  };
}

export async function cloudinaryKeys() {
  const { data } = await supabase
    .from("admin_settings")
    .select("key, value")
    .in("key", [CLOUDINARY_CLOUD_NAME_SETTING, CLOUDINARY_API_KEY_SETTING, CLOUDINARY_API_SECRET_SETTING]);

  const get = (k: string) => data?.find((r) => r.key === k)?.value;
  return {
    cloudName: get(CLOUDINARY_CLOUD_NAME_SETTING) || env.CLOUDINARY_CLOUD_NAME,
    apiKey: get(CLOUDINARY_API_KEY_SETTING) || env.CLOUDINARY_API_KEY,
    apiSecret: get(CLOUDINARY_API_SECRET_SETTING) || env.CLOUDINARY_API_SECRET,
  };
}

router.get("/remove-background", async (_req, res) => {
  const { data } = await supabase
    .from("admin_settings")
    .select("updated_at")
    .eq("key", REMOVE_BG_SETTING_KEY)
    .maybeSingle();

  return res.json({
    configured: Boolean(data?.updated_at || env.REMOVE_BG_API_KEY),
    source: data?.updated_at ? "admin" : env.REMOVE_BG_API_KEY ? "env" : null,
    updated_at: data?.updated_at ?? null,
  });
});

router.put("/remove-background", validateBody(apiKeySchema), async (req, res) => {
  const { data, error } = await supabase
    .from("admin_settings")
    .upsert({
      key: REMOVE_BG_SETTING_KEY,
      value: req.body.apiKey,
      updated_at: new Date().toISOString(),
    })
    .select("updated_at")
    .single();

  if (error) return res.status(400).json({ error: error.message });
  return res.json({ configured: true, source: "admin", updated_at: data.updated_at });
});

router.delete("/remove-background", async (_req, res) => {
  const { error } = await supabase.from("admin_settings").delete().eq("key", REMOVE_BG_SETTING_KEY);
  if (error) return res.status(400).json({ error: error.message });
  return res.json({
    configured: Boolean(env.REMOVE_BG_API_KEY),
    source: env.REMOVE_BG_API_KEY ? "env" : null,
    updated_at: null,
  });
});

const imagekitSchema = z.object({
  publicKey: z.string().trim().min(1).max(500),
  privateKey: z.string().trim().min(1).max(500),
});

router.get("/imagekit", async (_req, res) => {
  const { data } = await supabase
    .from("admin_settings")
    .select("key, updated_at")
    .in("key", [IMAGEKIT_PUBLIC_KEY_SETTING, IMAGEKIT_PRIVATE_KEY_SETTING]);

  const hasDb = data?.length === 2;
  const hasEnv = Boolean(env.IMAGEKIT_PUBLIC_KEY && env.IMAGEKIT_PRIVATE_KEY);
  const updatedAt = data?.find((r) => r.key === IMAGEKIT_PUBLIC_KEY_SETTING)?.updated_at ?? null;
  return res.json({
    configured: hasDb || hasEnv,
    source: hasDb ? "admin" : hasEnv ? "env" : null,
    updated_at: updatedAt,
  });
});

router.put("/imagekit", validateBody(imagekitSchema), async (req, res) => {
  const now = new Date().toISOString();
  const { error } = await supabase.from("admin_settings").upsert([
    { key: IMAGEKIT_PUBLIC_KEY_SETTING, value: req.body.publicKey, updated_at: now },
    { key: IMAGEKIT_PRIVATE_KEY_SETTING, value: req.body.privateKey, updated_at: now },
  ]);
  if (error) return res.status(400).json({ error: error.message });
  return res.json({ configured: true, source: "admin", updated_at: now });
});

router.delete("/imagekit", async (_req, res) => {
  const { error } = await supabase
    .from("admin_settings")
    .delete()
    .in("key", [IMAGEKIT_PUBLIC_KEY_SETTING, IMAGEKIT_PRIVATE_KEY_SETTING]);
  if (error) return res.status(400).json({ error: error.message });
  const hasEnv = Boolean(env.IMAGEKIT_PUBLIC_KEY && env.IMAGEKIT_PRIVATE_KEY);
  return res.json({ configured: hasEnv, source: hasEnv ? "env" : null, updated_at: null });
});

const cloudinarySchema = z.object({
  cloudName: z.string().trim().min(1).max(500),
  apiKey: z.string().trim().min(1).max(500),
  apiSecret: z.string().trim().min(1).max(500),
});

router.get("/cloudinary", async (_req, res) => {
  const { data } = await supabase
    .from("admin_settings")
    .select("key, updated_at")
    .in("key", [CLOUDINARY_CLOUD_NAME_SETTING, CLOUDINARY_API_KEY_SETTING, CLOUDINARY_API_SECRET_SETTING]);

  const hasDb = data?.length === 3;
  const hasEnv = Boolean(env.CLOUDINARY_CLOUD_NAME && env.CLOUDINARY_API_KEY && env.CLOUDINARY_API_SECRET);
  const updatedAt = data?.find((r) => r.key === CLOUDINARY_CLOUD_NAME_SETTING)?.updated_at ?? null;
  return res.json({
    configured: hasDb || hasEnv,
    source: hasDb ? "admin" : hasEnv ? "env" : null,
    updated_at: updatedAt,
  });
});

router.put("/cloudinary", validateBody(cloudinarySchema), async (req, res) => {
  const now = new Date().toISOString();
  const { error } = await supabase.from("admin_settings").upsert([
    { key: CLOUDINARY_CLOUD_NAME_SETTING, value: req.body.cloudName, updated_at: now },
    { key: CLOUDINARY_API_KEY_SETTING, value: req.body.apiKey, updated_at: now },
    { key: CLOUDINARY_API_SECRET_SETTING, value: req.body.apiSecret, updated_at: now },
  ]);
  if (error) return res.status(400).json({ error: error.message });
  return res.json({ configured: true, source: "admin", updated_at: now });
});

router.delete("/cloudinary", async (_req, res) => {
  const { error } = await supabase
    .from("admin_settings")
    .delete()
    .in("key", [CLOUDINARY_CLOUD_NAME_SETTING, CLOUDINARY_API_KEY_SETTING, CLOUDINARY_API_SECRET_SETTING]);
  if (error) return res.status(400).json({ error: error.message });
  const hasEnv = Boolean(env.CLOUDINARY_CLOUD_NAME && env.CLOUDINARY_API_KEY && env.CLOUDINARY_API_SECRET);
  return res.json({ configured: hasEnv, source: hasEnv ? "env" : null, updated_at: null });
});

export default router;
