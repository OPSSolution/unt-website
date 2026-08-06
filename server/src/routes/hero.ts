import { Router } from "express";
import { supabase } from "../supabase.js";

const router = Router();
router.get("/content", async (_req, res) => {
  const { data, error } = await supabase.from("hero_content").select("*").single();
  if (error) return res.status(500).json({ error: error.message });
  return res.json(data);
});
router.get("/stats", async (_req, res) => {
  const { data, error } = await supabase.from("hero_stats").select("*").order("sort_order", { ascending: true });
  if (error) return res.status(500).json({ error: error.message });
  return res.json(data);
});
export default router;
