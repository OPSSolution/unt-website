import { Router } from "express";
import { supabase } from "../supabase.js";

const router = Router();
router.get("/", async (_req, res) => {
  const { data, error } = await supabase.from("homepage_sections").select("*");
  if (error) return res.status(500).json({ error: error.message });
  return res.json(data);
});
router.get("/:key", async (req, res) => {
  const { data, error } = await supabase.from("homepage_sections").select("*").eq("section_key", req.params.key).maybeSingle();
  if (error) return res.status(500).json({ error: error.message });
  return res.json(data ?? { section_key: req.params.key, data: null });
});
export default router;
