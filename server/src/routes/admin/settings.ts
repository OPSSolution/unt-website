import { Router } from "express";
import { z } from "zod";
import { env } from "../../config/env.js";
import { supabase } from "../../supabase.js";
import { validateBody } from "../../middleware/validate.js";

const router = Router();

export const REMOVE_BG_SETTING_KEY = "remove_bg_api_key";

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

export default router;
