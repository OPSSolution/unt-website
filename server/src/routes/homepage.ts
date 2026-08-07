import { Router } from "express";
import { supabase } from "../supabase.js";
import { localizedSection, requestLanguage } from "../i18n.js";

const router = Router();
router.get("/", async (req, res) => {
  res.set("Cache-Control", "private, no-store");
  const { data, error } = await supabase.from("homepage_sections").select("*");
  if (error) return res.status(500).json({ error: error.message });
  const language = requestLanguage(req);
  return res.json((data ?? []).map((row) => ({ ...row, data: localizedSection(row.data, language) })));
});
router.get("/:key", async (req, res) => {
  res.set("Cache-Control", "private, no-store");
  const { data, error } = await supabase.from("homepage_sections").select("*").eq("section_key", req.params.key).maybeSingle();
  if (error) return res.status(500).json({ error: error.message });
  if (!data) return res.json({ section_key: req.params.key, data: null });
  return res.json({ ...data, data: localizedSection(data.data, requestLanguage(req)) });
});
export default router;
