import { Router } from "express";
import { supabase } from "../supabase.js";
import { localizeRow, localizeRows, requestLanguage } from "../i18n.js";

const router = Router();
router.get("/content", async (req, res) => {
  const { data, error } = await supabase.from("hero_content").select("*").single();
  if (error) return res.status(500).json({ error: error.message });
  return res.json(localizeRow(data, requestLanguage(req)));
});
router.get("/stats", async (req, res) => {
  const { data, error } = await supabase.from("hero_stats").select("*").order("sort_order", { ascending: true });
  if (error) return res.status(500).json({ error: error.message });
  return res.json(localizeRows(data, requestLanguage(req)));
});
export default router;
