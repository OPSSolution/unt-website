import { Router } from "express";
import { supabase } from "../supabase.js";

const router = Router();
router.get("/", async (_req, res) => {
  const { data, error } = await supabase.from("products").select("*").order("created_at", { ascending: false });
  if (error) return res.status(500).json({ error: error.message });
  return res.json(data);
});
router.get("/:id", async (req, res) => {
  const { data, error } = await supabase.from("products").select("*").eq("id", req.params.id).single();
  if (error) return res.status(404).json({ error: "Product not found" });
  return res.json(data);
});
export default router;
