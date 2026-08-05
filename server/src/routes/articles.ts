import { Router } from "express";
import { supabase } from "../supabase.js";
import { requireAdmin } from "../middleware/auth.js";
import type { Article } from "../types.js";

const router = Router();

// GET all articles (public)
router.get("/", async (_req, res) => {
  const { data, error } = await supabase
    .from("articles")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) return res.status(500).json({ error: error.message });
  return res.json(data);
});

// GET single article (public)
router.get("/:id", async (req, res) => {
  const { data, error } = await supabase
    .from("articles")
    .select("*")
    .eq("id", req.params.id)
    .single();

  if (error) return res.status(404).json({ error: "Article not found" });
  return res.json(data);
});

// POST create article (admin only)
router.post("/", requireAdmin, async (req, res) => {
  const body = req.body as Article;
  const { data, error } = await supabase
    .from("articles")
    .insert(body)
    .select()
    .single();

  if (error) return res.status(400).json({ error: error.message });
  return res.status(201).json(data);
});

// PUT update article (admin only)
router.put("/:id", requireAdmin, async (req, res) => {
  const body = req.body as Partial<Article>;
  const { data, error } = await supabase
    .from("articles")
    .update({ ...body, updated_at: new Date().toISOString() })
    .eq("id", req.params.id)
    .select()
    .single();

  if (error) return res.status(400).json({ error: error.message });
  return res.json(data);
});

// DELETE article (admin only)
router.delete("/:id", requireAdmin, async (req, res) => {
  const { error } = await supabase
    .from("articles")
    .delete()
    .eq("id", req.params.id);

  if (error) return res.status(400).json({ error: error.message });
  return res.status(204).send();
});

export default router;
