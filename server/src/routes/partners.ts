import { Router } from "express";
import { supabase } from "../supabase.js";
import { localizeRows, requestLanguage } from "../i18n.js";

const router = Router();
router.get("/", async (req, res) => {
  const { data, error } = await supabase.from("partners").select("*").order("created_at", { ascending: true });
  if (error) return res.status(500).json({ error: error.message });
  return res.json(localizeRows(data, requestLanguage(req)));
});
export default router;
