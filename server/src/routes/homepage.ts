import { Router } from "express";
import { supabase } from "../supabase.js";
import { requireAdmin } from "../middleware/auth.js";

const router = Router();

// GET all sections (public)
router.get("/", async (_req, res) => {
  const { data, error } = await supabase
    .from("homepage_sections")
    .select("*");
  if (error) return res.status(500).json({ error: error.message });
  return res.json(data);
});

// GET single section by key (public)
router.get("/:key", async (req, res) => {
  const { data, error } = await supabase
    .from("homepage_sections")
    .select("*")
    .eq("section_key", req.params.key)
    .maybeSingle();
  if (error) return res.status(500).json({ error: error.message });
  if (!data) return res.json({ section_key: req.params.key, data: null });
  return res.json(data);
});

// PUT upsert section by key (admin only) — creates the row if it doesn't exist,
// so editors (about/services/training/contact pages) work on first save too.
router.put("/:key", requireAdmin, async (req, res) => {
  const { data, error } = await supabase
    .from("homepage_sections")
    .upsert(
      { section_key: req.params.key, data: req.body, updated_at: new Date().toISOString() },
      { onConflict: "section_key" }
    )
    .select()
    .single();
  if (error) return res.status(400).json({ error: error.message });
  return res.json(data);
});

export default router;
