import { Router } from "express";
import { supabase } from "../supabase.js";
import { requireAdmin } from "../middleware/auth.js";
import type { HeroContent, HeroStat } from "../types.js";

const router = Router();

// GET hero content (public)
router.get("/content", async (_req, res) => {
  const { data, error } = await supabase
    .from("hero_content")
    .select("*")
    .single();

  if (error) return res.status(500).json({ error: error.message });
  return res.json(data);
});

// PUT update hero content (admin only)
router.put("/content", requireAdmin, async (req, res) => {
  const body = req.body as Partial<HeroContent>;
  const { data, error } = await supabase
    .from("hero_content")
    .update({ ...body, updated_at: new Date().toISOString() })
    .eq("id", body.id)
    .select()
    .single();

  if (error) return res.status(400).json({ error: error.message });
  return res.json(data);
});

// GET hero stats (public)
router.get("/stats", async (_req, res) => {
  const { data, error } = await supabase
    .from("hero_stats")
    .select("*")
    .order("sort_order", { ascending: true });

  if (error) return res.status(500).json({ error: error.message });
  return res.json(data);
});

// PUT update a single hero stat (admin only)
router.put("/stats/:id", requireAdmin, async (req, res) => {
  const body = req.body as Partial<HeroStat>;
  const { data, error } = await supabase
    .from("hero_stats")
    .update(body)
    .eq("id", req.params.id)
    .select()
    .single();

  if (error) return res.status(400).json({ error: error.message });
  return res.json(data);
});

export default router;
