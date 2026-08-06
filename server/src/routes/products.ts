import { Router } from "express";
import { supabase } from "../supabase.js";
import { localizeRow, localizeRows, requestLanguage } from "../i18n.js";

const router = Router();
router.get("/", async (req, res) => {
  const { data, error } = await supabase.from("products").select("*").order("created_at", { ascending: false });
  if (error) return res.status(500).json({ error: error.message });
  return res.json(localizeRows(data, requestLanguage(req)));
});
router.get("/:id", async (req, res) => {
  const { data, error } = await supabase.from("products").select("*").eq("id", req.params.id).single();
  if (error) return res.status(404).json({ error: "Product not found" });
  return res.json(localizeRow(data, requestLanguage(req)));
});
export default router;
