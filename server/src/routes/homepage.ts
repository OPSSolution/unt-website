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
    .single();
  if (error) return res.status(404).json({ error: "Section not found" });
  return res.json(data);
});

// PUT update section by key (admin only)
router.put("/:key", requireAdmin, async (req, res) => {
  const { data, error } = await supabase
    .from("homepage_sections")
    .update({ data: req.body, updated_at: new Date().toISOString() })
    .eq("section_key", req.params.key)
    .select()
    .single();
  if (error) return res.status(400).json({ error: error.message });
  return res.json(data);
});

export default router;
