import { Router } from "express";
import { supabase } from "../supabase.js";
import { requireAdmin } from "../middleware/auth.js";
import type { Partner } from "../types.js";

const router = Router();

// GET all partners (public)
router.get("/", async (_req, res) => {
  const { data, error } = await supabase
    .from("partners")
    .select("*")
    .order("created_at", { ascending: true });

  if (error) return res.status(500).json({ error: error.message });
  return res.json(data);
});

// POST create partner (admin only)
router.post("/", requireAdmin, async (req, res) => {
  const body = req.body as Partner;
  const { data, error } = await supabase
    .from("partners")
    .insert(body)
    .select()
    .single();

  if (error) return res.status(400).json({ error: error.message });
  return res.status(201).json(data);
});

// PUT update partner (admin only)
router.put("/:id", requireAdmin, async (req, res) => {
  const body = req.body as Partial<Partner>;
  const { data, error } = await supabase
    .from("partners")
    .update(body)
    .eq("id", req.params.id)
    .select()
    .single();

  if (error) return res.status(400).json({ error: error.message });
  return res.json(data);
});

// DELETE partner (admin only)
router.delete("/:id", requireAdmin, async (req, res) => {
  const { error } = await supabase
    .from("partners")
    .delete()
    .eq("id", req.params.id);

  if (error) return res.status(400).json({ error: error.message });
  return res.status(204).send();
});

export default router;
